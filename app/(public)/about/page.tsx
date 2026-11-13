import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { CorporatePurposeSection } from '@/components/corporate/CorporatePurposeSection';
import { CorporatePrinciplesSection } from '@/components/corporate/CorporatePrinciplesSection';
import { CorporateDirectionSection } from '@/components/corporate/CorporateDirectionSection';

export const metadata: Metadata = {
  title: 'About Rcentz',
  description:
    'Meet the thinking behind Rcentz: our purpose, engineering principles and vision for connected software and digital products.'
};

export default function AboutPage() {
  return (
    <>
      <header className="rcentz-section relative isolate overflow-hidden border-b border-border py-14 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-0 size-[420px] rounded-full bg-theme-accent-faint blur-3xl sm:size-[580px]"
        />
        <div className="relative grid items-end gap-9 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-subtle px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-theme-accent" />
              Inside Rcentz
            </p>
            <h1 className="mt-7 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.65rem]">
              We care about what technology makes possible for people.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Rcentz brings software engineering and product thinking into one
              company. We work with businesses through Rcentz Systems and explore
              independent products through Rcentz Products. The common thread is
              simple: understand a real need and build something genuinely useful.
            </p>
            <Link
              href="#our-purpose"
              className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-theme-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              What drives us <ArrowDownRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="min-w-0 rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-theme-accent">Our point of view</p>
            <p className="mt-5 text-balance text-xl font-medium leading-snug tracking-tight sm:text-2xl">
              The best technology is not the most complicated. It is the one
              that makes a meaningful difference to the people using it.
            </p>
            <div className="mt-7 border-t border-border pt-5">
              <p className="text-xs leading-6 text-muted-foreground">
                Clarity in purpose. Care in execution. Room to grow.
              </p>
              <Link
                href="#our-direction"
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-theme-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                See our direction <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <CorporatePurposeSection />
      <CorporatePrinciplesSection />
      <CorporateDirectionSection />
    </>
  );
}
