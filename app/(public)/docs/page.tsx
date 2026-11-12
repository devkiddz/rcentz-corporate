import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = { title: 'Documentation' };
export default function DocsPage() {
  return (
    <section className="rcentz-section min-h-[45vh] py-12 sm:py-20">
      <p className="text-xs font-medium uppercase tracking-widest text-theme-accent">Documentation</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Guides and documentation.</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">Public documentation is being organized. In the meantime, explore how Rcentz plans and delivers digital work.</p>
      <Link className="mt-6 inline-flex text-sm font-semibold text-theme-accent hover:underline" href="/how-we-work">Explore how we work</Link>
    </section>
  );
}
