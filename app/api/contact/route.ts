import { createHash } from 'node:crypto';
import { validatePublicEnquiry } from '@/features/contact/lib/enquiry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const headers = { 'Cache-Control': 'no-store' };

function failure(error: string, status: number) {
  return Response.json({ error }, { status, headers });
}

async function readLimitedJson(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('body');
  const decoder = new TextDecoder();
  let bytes = 0;
  let body = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > 16_000) { await reader.cancel(); throw new Error('size'); }
    body += decoder.decode(value, { stream: true });
  }
  body += decoder.decode();
  return JSON.parse(body);
}

async function useRateLimit(key: string, max: number): Promise<boolean> {
  const base = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!base || !token) throw new Error('rate limiter not configured');
  // Atomic increment and initial expiry. All stores/requests share this limit.
  const script = "local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], tonumber(ARGV[1])); end; return n";
  const response = await fetch(base.replace(/\/+$/, ''), {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(['EVAL', script, '1', key, '3600']),
    signal: AbortSignal.timeout(6000),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('rate limiter unavailable');
  const result: unknown = await response.json();
  if (!result || typeof result !== 'object' || !('result' in result)) throw new Error('invalid rate limiter response');
  const count = Number((result as { result: unknown }).result);
  if (!Number.isSafeInteger(count) || count < 1) throw new Error('invalid rate limiter count');
  return count <= max;
}

async function verifyTurnstile(token: string, expectedHostname: string): Promise<boolean> {
  const secret = process.env.RCENTZ_TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error('turnstile not configured');
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token }),
    cache: 'no-store',
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error('turnstile unavailable');
  const result: unknown = await response.json();
  if (!result || typeof result !== 'object') return false;
  const v = result as { success?: boolean; hostname?: string; action?: string };
  return v.success === true && v.hostname === expectedHostname && v.action === 'rcentz_contact';
}

export async function POST(request: Request) {
  const expectedOrigin = process.env.RCENTZ_CORPORATE_ORIGIN || new URL(request.url).origin;
  const origin = request.headers.get('origin');
  let host: string;
  try { host = new URL(expectedOrigin).hostname; } catch { return failure('Contact service is not configured.', 503); }
  if (!origin || origin !== expectedOrigin) return failure('Request origin could not be verified.', 403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return failure('JSON required.', 415);
  const intakeURL = process.env.RCENTZ_API_INTAKE_URL;
  const secret = process.env.RCENTZ_CORPORATE_API_INTAKE_SECRET;
  if (!intakeURL || !secret || secret.length < 32 || !process.env.RCENTZ_TURNSTILE_SECRET_KEY || !process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return failure('Contact submissions are temporarily unavailable.', 503);
  }
  try {
    const url = new URL(intakeURL);
    const localApi = process.env.NODE_ENV !== 'production' && url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname);
    const productionApi = url.protocol === 'https:' && url.hostname === 'api.rcentz.cc' && !url.port;
    if ((!localApi && !productionApi) || url.pathname !== '/api/v1/internal/corporate/enquiries' || url.search || url.hash || url.username || url.password) {
      return failure('Contact service configuration is invalid.', 503);
    }
  } catch { return failure('Contact service configuration is invalid.', 503); }

  let raw: unknown;
  try { raw = await readLimitedJson(request); }
  catch { return failure('Please check the form fields and try again.', 400); }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return failure('Invalid form submission.', 400);
  const body = raw as Record<string, unknown>;
  // Honeypot: silent success without creating a record.
  if (typeof body.contact_fax === 'string' && body.contact_fax.trim()) {
    return Response.json({ accepted: true, reference: 'Submitted' }, { status: 200, headers });
  }
  const enquiry = validatePublicEnquiry(body);
  if (!enquiry) return failure('Please complete the required fields. Your message must contain at least 40 characters.', 400);
  const captcha = body.turnstileToken;
  if (typeof captcha !== 'string' || captcha.length < 5 || captcha.length > 2048) return failure('Complete the security verification.', 400);

  try {
    const verified = await verifyTurnstile(captcha, host);
    if (!verified) return failure('Security verification expired or failed. Please try again.', 403);

    const source = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    const ipKey = createHash('sha256').update(source).digest('hex');
    const emailKey = createHash('sha256').update(enquiry.email).digest('hex');
    if (!await useRateLimit(`rcentz:contact:ip:${ipKey}`, 5) || !await useRateLimit(`rcentz:contact:email:${emailKey}`, 3)) {
      return failure('Too many submissions. Please try again later.', 429);
    }

    const response = await fetch(intakeURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` },
      body: JSON.stringify(enquiry),
      cache: 'no-store',
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) return failure('We could not save the enquiry. Please try again.', 503);
    const result: unknown = await response.json();
    if (!result || typeof result !== 'object' || !('reference' in result) || typeof (result as { reference: unknown }).reference !== 'string') {
      return failure('We could not confirm the enquiry. Please try again.', 503);
    }
    return Response.json({ accepted: true, reference: (result as { reference: string }).reference }, { status: 201, headers });
  } catch {
    // No false success if storage or anti-abuse dependencies fail.
    return failure('The contact service is temporarily unavailable. Your details remain on this page.', 503);
  }
}
