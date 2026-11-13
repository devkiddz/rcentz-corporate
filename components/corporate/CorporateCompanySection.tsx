import Link from 'next/link';
import { ArrowUpRight, Layers3, Boxes } from 'lucide-react';
import { RcentzGlobeStory } from '@/features/home/components/hero/stories/RcentzGlobeStory';

/** Company introduction, using the original Rcentz ecosystem illustration. */
export function CorporateCompanySection() {
  return (
    <section
      id="rcentz-ecosystem"
      aria-labelledby="corporate-company-title"
      className="rcentz-section scroll-mt-24 border-b border-border py-12 sm:py-20">
      <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-subtle px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="size-1.5 rounded-full bg-theme-accent" aria-hidden="true" />
            Our ecosystem
          </p>
          <h2
            id="corporate-company-title"
            className="mt-5 max-w-xl text-balance text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl">
            Different solutions.
            <span className="mt-2 block text-muted-foreground">A connected engineering foundation.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Rcentz Systems works directly with organizations to turn individual
            requirements into websites, applications and operational tools.
            Rcentz Products develops reusable platforms for needs shared by
            many people and businesses. The two directions inform each other
            through design, engineering and lessons from real work.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-4">
              <Layers3 aria-hidden="true" className="size-5 text-theme-accent" />
              <h3 className="mt-3 text-sm font-semibold">Rcentz Systems</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Custom projects, technical discovery, delivery and ongoing support.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <Boxes aria-hidden="true" className="size-5 text-theme-accent" />
              <h3 className="mt-3 text-sm font-semibold">Rcentz Products</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Reusable products, experiments and platforms developed for wider use.
              </p>
            </div>
          </div>
          <Link
            href="/about"
            className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-theme-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Learn about Rcentz <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="relative min-w-0" aria-label="Illustration of the Rcentz ecosystem">
          <RcentzGlobeStory />
        </div>
      </div>
    </section>
  );
}
