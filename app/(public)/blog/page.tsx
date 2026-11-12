import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Rcentz Blog' };
export default function BlogPage() {
  return (
    <section className="rcentz-section min-h-[45vh] py-12 sm:py-20">
      <p className="text-xs font-medium uppercase tracking-widest text-theme-accent">Rcentz Journal</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Ideas, engineering and updates.</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">The Rcentz blog is being prepared. We won&apos;t present sample articles as published stories.</p>
    </section>
  );
}
