import SiteAtmosphere from '@/components/background/SiteAtmosphere';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

/** The only retained Corporate design component. All styling reads Systems tokens. */
export default function CorporateHero() {
  return (
    <section className="relative isolate flex min-h-[min(760px,calc(100svh-68px))] items-center justify-center overflow-hidden bg-background text-foreground">
      <SiteAtmosphere />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,var(--background),transparent_65%)] opacity-80" />
      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col items-center px-6 py-14 text-center sm:px-10 sm:py-16 lg:py-20">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-foreground backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-primary" /> Software · Systems · Solutions
        </p>
        <h1 className="mt-7 max-w-[1050px] text-balance text-[clamp(2.8rem,4.7vw,5.2rem)] font-semibold leading-[1.08] tracking-[-0.052em]">
          Engineering digital solutions for a connected world.
        </h1>
        <p className="mt-6 max-w-[770px] text-pretty text-base font-medium leading-8 text-foreground/75 sm:text-lg">
          We design and build websites, applications, and business systems that simplify operations and create better customer experiences.
        </p>
        <div className="mt-7 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link href="/services" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90">
            Explore our services <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/about" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:bg-secondary">
            Discover Rcentz <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
