import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, BriefcaseBusiness, Mail, MessageCircleMore, ShieldCheck } from 'lucide-react';
import { ContactEnquiryForm } from '@/components/corporate/contact/ContactEnquiryForm';
import { systemsLinks } from '@/config/rcentz-apps';
import { rcentzTypography } from '@/ui-shell/brand/rcentz-typography';

export const metadata: Metadata = {
  title: 'Contact & Request a Quote',
  description: 'Request a project quotation or contact Rcentz about software, digital products, partnerships and general business enquiries.',
};

const guidance = [
  { number: '01', title: 'Choose a purpose', detail: 'Request a quote, discuss a collaboration, or ask a question.' },
  { number: '02', title: 'Share the context', detail: 'Tell us what matters. A short, clear description is enough to begin.' },
  { number: '03', title: 'Keep the reference', detail: 'Your submission is recorded in our enquiry system for follow-up.' },
] as const;

export default function ContactPage() {
  return (
    <main>
      <section className="rcentz-section relative isolate overflow-hidden border-b border-border py-12 sm:py-16 lg:py-20" aria-labelledby="contact-title">
        <div aria-hidden="true" className="pointer-events-none absolute -left-36 -top-48 size-[520px] rounded-full bg-theme-accent-faint blur-[110px]" />
        <div className="relative grid items-start gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12 xl:gap-20">
          <div className="lg:sticky lg:top-24">
            <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-theme-accent">
              <span className="size-1.5 rounded-full bg-theme-accent" aria-hidden="true" />
              Contact & enquiries
            </p>
            <h1 id="contact-title" className={rcentzTypography.className + ' mt-6 max-w-2xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.6rem]'}>
              Let&apos;s talk about what&apos;s next.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Have a project in mind, an opportunity to explore or a question for Rcentz? Tell us what matters and we&apos;ll have a clear starting point for the conversation.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-xl border border-border bg-background/70 p-4">
                <BriefcaseBusiness className="size-5 text-theme-accent" aria-hidden="true" />
                <h2 className="mt-4 text-sm font-semibold">Quotations</h2>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">Describe a website, application, business system or technical requirement. Our team can review the scope before providing pricing.</p>
              </div>
              <div className="rounded-xl border border-border bg-background/70 p-4">
                <MessageCircleMore className="size-5 text-theme-accent" aria-hidden="true" />
                <h2 className="mt-4 text-sm font-semibold">Other enquiries</h2>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">Discuss products, partnerships, media, company questions or ideas worth exploring.</p>
              </div>
            </div>
            <div className="mt-8 border-t border-border pt-5">
              <p className="text-xs leading-6 text-muted-foreground">Prefer email? Reach us directly:</p>
              <a href="mailto:contact@rcentz.cc" className="mt-2 inline-flex min-h-11 max-w-full items-center gap-2 break-all text-sm font-semibold text-theme-accent underline underline-offset-4 hover:opacity-85">
                <Mail className="size-4 shrink-0" aria-hidden="true" /> contact@rcentz.cc
              </a>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                Already working with us? <Link href={systemsLinks.dashboard} className="font-semibold text-foreground underline underline-offset-4 hover:text-theme-accent">Return to your Systems workspace</Link>.
              </p>
            </div>
          </div>
          <ContactEnquiryForm />
        </div>
      </section>

      <section className="rcentz-section border-b border-border bg-surface-subtle py-14 sm:py-20" aria-labelledby="enquiry-process-title">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-theme-accent">A clear first step</p>
            <h2 id="enquiry-process-title" className={rcentzTypography.className + ' mt-4 text-3xl font-extrabold leading-tight sm:text-4xl'}>
              A simple way to begin.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">You don&apos;t need a finished brief to get in touch. A little context helps us understand where to begin.</p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {guidance.map(item => (
              <li key={item.number} className="rounded-2xl border border-border bg-background p-5">
                <span className="font-mono text-[11px] text-theme-accent">{item.number}</span>
                <h3 className="mt-5 text-base font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rcentz-section border-b border-border py-12 sm:py-16">
        <div className="flex flex-col gap-6 rounded-2xl border border-border-strong bg-background p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-theme-accent"><ShieldCheck className="size-5" aria-hidden="true" /><span className="font-mono text-[10px] uppercase tracking-[0.16em]">Project onboarding</span></div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">Need a detailed project brief instead?</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">For feature selections, milestones and structured project onboarding, use the dedicated Rcentz Systems workspace.</p>
          </div>
          <Link href={systemsLinks.startProject} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-surface-subtle px-5 text-sm font-semibold hover:bg-surface-muted">
            Open Rcentz Systems <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
