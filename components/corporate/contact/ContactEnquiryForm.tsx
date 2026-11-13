'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle, Send, ShieldCheck } from 'lucide-react';
import type { ContactPurpose, ProjectTimeline, ProjectType } from '@/features/contact/lib/enquiry';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_RCENTZ_TURNSTILE_SITE_KEY || '';

const purposeOptions: { value: ContactPurpose; label: string }[] = [
  { value: 'QUOTE', label: 'Request a project quotation' },
  { value: 'GENERAL', label: 'General company enquiry' },
  { value: 'PRODUCT', label: 'Rcentz Products enquiry' },
  { value: 'PARTNERSHIP', label: 'Partnership or collaboration' },
  { value: 'MEDIA', label: 'Media or business correspondence' },
  { value: 'OTHER', label: 'Something else' },
];
const projectTypes: { value: ProjectType; label: string }[] = [
  { value: 'WEBSITE', label: 'Website development' },
  { value: 'WEB_APP', label: 'Web application / SaaS' },
  { value: 'MOBILE_APP', label: 'Mobile application' },
  { value: 'ECOMMERCE', label: 'E-commerce platform' },
  { value: 'BUSINESS_SYSTEM', label: 'Business management system' },
  { value: 'CONSULTING', label: 'Consulting / modernization' },
  { value: 'OTHER', label: 'Other / not sure yet' },
];
const timelineOptions: { value: ProjectTimeline; label: string }[] = [
  { value: 'ASAP', label: 'As soon as practical' },
  { value: 'ONE_TO_THREE_MONTHS', label: 'Within 1–3 months' },
  { value: 'THREE_TO_SIX_MONTHS', label: 'Within 3–6 months' },
  { value: 'FLEXIBLE', label: 'Flexible / to be discussed' },
];

type TurnstileAPI = {
  render: (target: HTMLElement, options: {
    sitekey: string;
    action: string;
    theme: 'auto';
    callback: (token: string) => void;
    'expired-callback': () => void;
    'error-callback': () => void;
  }) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
};

declare global { interface Window { turnstile?: TurnstileAPI } }

function TurnstileVerification({ onToken, resetSignal }: { onToken: (token: string) => void; resetSignal: number }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !mountRef.current) return;
    const target = mountRef.current;
    let cancelled = false;
    let script = document.querySelector<HTMLScriptElement>('script[data-rcentz-turnstile]');
    const render = () => {
      if (cancelled || !window.turnstile || widgetIdRef.current) return;
      try {
        widgetIdRef.current = window.turnstile.render(target, {
          sitekey: TURNSTILE_SITE_KEY,
          action: 'rcentz_contact',
          theme: 'auto',
          callback: token => onTokenRef.current(token),
          'expired-callback': () => onTokenRef.current(''),
          'error-callback': () => onTokenRef.current(''),
        });
      } catch { onTokenRef.current(''); }
    };
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.dataset.rcentzTurnstile = 'true';
      document.head.appendChild(script);
    }
    script.addEventListener('load', render);
    render();
    return () => {
      cancelled = true;
      script?.removeEventListener('load', render);
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch { /* already removed */ }
      }
      widgetIdRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!resetSignal || !widgetIdRef.current || !window.turnstile) return;
    onTokenRef.current('');
    window.turnstile.reset(widgetIdRef.current);
  }, [resetSignal]);

  if (!TURNSTILE_SITE_KEY) {
    return <p className="text-xs text-muted-foreground">Security verification has not been configured yet.</p>;
  }
  return <div ref={mountRef} className="min-h-[66px] max-w-full" aria-label="Security verification" />;
}

type FormFields = {
  purpose: ContactPurpose;
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: '' | ProjectType;
  budgetNote: string;
  timeline: '' | ProjectTimeline;
  message: string;
  consent: boolean;
  contact_fax: string;
};

const initial: FormFields = {
  purpose: 'QUOTE', name: '', email: '', company: '', phone: '', projectType: '',
  budgetNote: '', timeline: '', message: '', consent: false, contact_fax: '',
};

const fieldStyle = 'mt-2 min-h-12 w-full rounded-lg border border-border-strong bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring';
const labelStyle = 'block text-xs font-semibold text-foreground';

export function ContactEnquiryForm() {
  const [values, setValues] = useState<FormFields>(initial);
  const [token, setToken] = useState('');
  const [resetSignal, setResetSignal] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const submissionIdRef = useRef<string | null>(null);

  function change<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    setValues(prev => ({ ...prev, [key]: value }));
    submissionIdRef.current = null;
    setError('');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || reference) return;
    if (!token) { setError('Complete the security verification before submitting.'); return; }
    if (values.message.trim().length < 40) { setError('Please tell us a little more (at least 40 characters).'); return; }
    if (!values.consent) { setError('Please confirm we may contact you about this enquiry.'); return; }
    const id = submissionIdRef.current ?? crypto.randomUUID();
    submissionIdRef.current = id;
    setPending(true);
    setError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          submissionId: id,
          projectType: values.purpose === 'QUOTE' ? values.projectType || null : null,
          timeline: values.purpose === 'QUOTE' ? values.timeline || null : null,
          budgetNote: values.purpose === 'QUOTE' ? values.budgetNote : null,
          turnstileToken: token,
        }),
      });
      const result: unknown = await response.json();
      if (!response.ok) {
        const msg = result && typeof result === 'object' && 'error' in result && typeof (result as { error: unknown }).error === 'string'
          ? (result as { error: string }).error : 'We could not submit your enquiry. Please try again.';
        throw new Error(msg);
      }
      if (!result || typeof result !== 'object' || !('reference' in result) || typeof (result as { reference: unknown }).reference !== 'string') {
        throw new Error('Submission could not be confirmed. Please try again.');
      }
      setReference((result as { reference: string }).reference);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Connection interrupted. Please try again.');
      // A new Turnstile token is required; keep the submission ID for safe retries.
      setToken('');
      setResetSignal(n => n + 1);
    } finally { setPending(false); }
  }

  if (reference) {
    return (
      <div className="rounded-2xl border border-border bg-surface-raised px-6 py-12 text-center sm:px-10" role="status">
        <CheckCircle2 className="mx-auto size-12 text-theme-accent" aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-semibold">Your enquiry has been received.</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
          Your message is recorded with Rcentz. Keep this reference for any follow-up.
          A quote request is an enquiry for review, not an issued price quotation.
        </p>
        <p className="mt-6 rounded-lg border border-border bg-background px-4 py-3 font-mono text-base font-semibold tracking-wider">{reference}</p>
        <button type="button" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-theme-accent underline underline-offset-4" onClick={() => { setReference(''); setValues(initial); submissionIdRef.current = null; setToken(''); setResetSignal(n => n + 1); }}>
          Send another enquiry <ArrowUpRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate={false} className="rounded-2xl border border-border-strong bg-surface-raised p-5 shadow-xl sm:p-7 lg:p-8" aria-labelledby="contact-form-title">
      <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-theme-accent">Start here / Rcentz</p>
          <h2 id="contact-form-title" className="mt-2 text-2xl font-semibold tracking-tight">Quote & enquiry form</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">One secure channel for enquiries, opportunities and quotations.</p>
        </div>
        <ShieldCheck className="mt-1 size-6 shrink-0 text-theme-accent" aria-hidden="true" />
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label className={labelStyle} htmlFor="contact-purpose">Reason for contacting us <span className="text-theme-accent">*</span></label>
          <select id="contact-purpose" name="purpose" required className={fieldStyle} value={values.purpose} onChange={e => change('purpose', e.target.value as ContactPurpose)}>
            {purposeOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelStyle} htmlFor="contact-name">Full name *</label>
            <input id="contact-name" name="name" required minLength={2} maxLength={120} autoComplete="name" className={fieldStyle} placeholder="Your full name" value={values.name} onChange={e => change('name', e.target.value)} />
          </div>
          <div>
            <label className={labelStyle} htmlFor="contact-email">Email address *</label>
            <input id="contact-email" name="email" type="email" required maxLength={254} autoComplete="email" className={fieldStyle} placeholder="you@company.com" value={values.email} onChange={e => change('email', e.target.value)} />
          </div>
          <div>
            <label className={labelStyle} htmlFor="contact-company">Company / organisation</label>
            <input id="contact-company" name="company" maxLength={120} autoComplete="organization" className={fieldStyle} placeholder="Optional" value={values.company} onChange={e => change('company', e.target.value)} />
          </div>
          <div>
            <label className={labelStyle} htmlFor="contact-phone">Phone / WhatsApp</label>
            <input id="contact-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className={fieldStyle} placeholder="Optional, include country code" value={values.phone} onChange={e => change('phone', e.target.value)} />
          </div>
        </div>
        {values.purpose === 'QUOTE' ? (
          <fieldset className="rounded-xl border border-border bg-surface-subtle p-4 sm:p-5">
            <legend className="px-2 text-xs font-semibold text-theme-accent">Project quotation details</legend>
            <p className="mb-4 text-xs leading-5 text-muted-foreground">These details help with the initial review; they are not a final price agreement.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelStyle} htmlFor="contact-project-type">What are you building?</label>
                <select id="contact-project-type" name="projectType" className={fieldStyle} value={values.projectType} onChange={e => change('projectType', e.target.value as FormFields['projectType'])}>
                  <option value="">Not sure yet</option>
                  {projectTypes.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelStyle} htmlFor="contact-timeline">Preferred timeline</label>
                <select id="contact-timeline" name="timeline" className={fieldStyle} value={values.timeline} onChange={e => change('timeline', e.target.value as FormFields['timeline'])}>
                  <option value="">To be discussed</option>
                  {timelineOptions.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className={labelStyle} htmlFor="contact-budget">Budget guidance (optional)</label>
              <input id="contact-budget" name="budgetNote" maxLength={100} className={fieldStyle} placeholder="e.g. ₦1m–₦3m, USD 5k, or undecided" value={values.budgetNote} onChange={e => change('budgetNote', e.target.value)} />
            </div>
          </fieldset>
        ) : null}
        <div>
          <label className={labelStyle} htmlFor="contact-message">Describe your enquiry <span className="text-theme-accent">*</span></label>
          <textarea id="contact-message" name="message" required minLength={40} maxLength={4000} rows={5} className={fieldStyle + ' resize-y py-3'} placeholder="Tell us about the problem, idea, goal or collaboration you have in mind…" value={values.message} onChange={e => change('message', e.target.value)} />
          <p className="mt-1 text-right font-mono text-[10px] text-muted-foreground">{values.message.length} / 4,000</p>
        </div>
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="contact-fax">Fax number</label>
          <input id="contact-fax" name="contact_fax" autoComplete="off" tabIndex={-1} value={values.contact_fax} onChange={e => change('contact_fax', e.target.value)} />
        </div>
        <label className="flex cursor-pointer items-start gap-3 text-xs leading-6 text-muted-foreground">
          <input type="checkbox" required className="mt-1.5 size-4 shrink-0 accent-[var(--theme-accent)]" checked={values.consent} onChange={e => change('consent', e.target.checked)} />
          <span>I agree to be contacted about this enquiry and understand that my details will be used to respond to it. *</span>
        </label>
        <div className="rounded-xl border border-border bg-background/60 p-3">
          <TurnstileVerification onToken={setToken} resetSignal={resetSignal} />
        </div>
        {error ? <p role="alert" className="rounded-lg border border-border-strong bg-background px-4 py-3 text-sm text-foreground">{error}</p> : null}
        <button type="submit" disabled={pending || !TURNSTILE_SITE_KEY || !token} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-foreground px-6 text-sm font-semibold text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          {pending ? <><LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Saving enquiry…</> : <>{values.purpose === 'QUOTE' ? 'Submit quote request' : 'Send enquiry'} <Send className="size-4" aria-hidden="true" /></>}
        </button>
        <p className="text-center text-[11px] leading-5 text-muted-foreground">Encrypted submission · No attachments · No payment required</p>
      </div>
    </form>
  );
}
