import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import { systemsLinks } from '@/config/rcentz-apps';

export const metadata: Metadata = { title: 'Contact Rcentz' };

export default function ContactPage() {
  return (
    <section className="rcentz-section min-h-[55vh] border-b border-border py-12 sm:py-20">
      <p className="text-xs font-medium uppercase tracking-widest text-theme-accent">Contact Rcentz</p>
      <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Let&apos;s start a conversation.</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">For general enquiries, contact the Rcentz team. To request software development or a project quote, use the secure Rcentz Systems workspace.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="mailto:contact@rcentz.cc" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-semibold hover:bg-surface-muted"><Mail size={16} /> Email the team</a>
        <Link href={systemsLinks.startProject} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90">Start a project <ArrowUpRight size={16} /></Link>
      </div>
    </section>
  );
}
