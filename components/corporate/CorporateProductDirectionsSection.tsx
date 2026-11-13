import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CommerceJourneyStory } from '@/features/home/components/hero/stories/CommerceJourneyStory';

const productDirections = [
  {
    name: 'Waffi',
    purpose: 'Making it easier to discover businesses, products and local opportunities.'
  },
  {
    name: 'Business Suite',
    purpose: 'Bringing tasks, relationships and daily operations into a simpler workspace.'
  },
  {
    name: 'JobRcentz',
    purpose: 'Helping people explore career opportunities through a focused experience.'
  }
] as const;

/** Original Rcentz commerce storyboard, paired with the company's product vision. */
export function CorporateProductDirectionsSection() {
  return (
    <section
      id="rcentz-products"
      aria-labelledby="corporate-products-title"
      className="rcentz-section scroll-mt-24 border-b border-border py-12 sm:py-20">
      <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-subtle px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="size-1.5 rounded-full bg-theme-accent" aria-hidden="true" />
            Our products
          </p>
          <h2
            id="corporate-products-title"
            className="mt-5 max-w-xl text-balance text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl">
            Beyond client projects.
            <span className="mt-2 block text-muted-foreground">Ideas we are building for wider use.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Some needs call for a dedicated product, not a custom project.
            Rcentz Products is where we explore those opportunities and develop
            practical tools for businesses and individuals.
          </p>
          <div className="mt-7 divide-y divide-border border-y border-border">
            {productDirections.map((product, index) => (
              <div key={product.name} className="flex gap-4 py-4">
                <span className="shrink-0 font-mono text-xs text-theme-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{product.name}</h3>
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">{product.purpose}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="https://products.rcentz.cc"
            className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-theme-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Explore Rcentz Products <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>Digital experiences in action</span>
            <span className="font-mono text-[10px] uppercase tracking-widest">Illustrative flow</span>
          </div>
          <CommerceJourneyStory />
        </div>
      </div>
    </section>
  );
}
