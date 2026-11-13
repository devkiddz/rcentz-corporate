import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { RcentzWebsiteStory } from '@/features/home/components/hero/stories/RcentzWebsiteStory';

const principles = [
  {
    number: '01',
    name: 'Understand before defining',
    detail: 'We ask what success would mean before deciding which features belong in the solution.'
  },
  {
    number: '02',
    name: 'Make complexity easier to use',
    detail: 'A thoughtful interface and sound architecture should make difficult work feel more manageable.'
  },
  {
    number: '03',
    name: 'Leave room for change',
    detail: 'Choices made today should not prevent useful refinements tomorrow.'
  }
] as const;

/** An About-only principles section; avoids replaying the Services page sections. */
export function CorporatePrinciplesSection() {
  return (
    <section
      id="our-approach"
      aria-labelledby="corporate-principles-title"
      className="rcentz-section scroll-mt-24 border-b border-border py-12 sm:py-20">
      <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-subtle px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="size-1.5 rounded-full bg-theme-accent" aria-hidden="true" />
            Our principles
          </p>
          <h2
            id="corporate-principles-title"
            className="mt-5 max-w-xl text-balance text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl">
            Clarity in the thinking. Care in the building.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Engineering is a series of decisions, not just lines of code. We try to
            make those decisions understandable: what the software should do,
            who it should serve, and how it can continue to improve.
          </p>
          <div className="mt-7 divide-y divide-border border-y border-border">
            {principles.map((principle) => (
              <div className="flex gap-4 py-4" key={principle.number}>
                <span className="shrink-0 font-mono text-xs text-theme-accent">{principle.number}</span>
                <div>
                  <h3 className="text-sm font-semibold">{principle.name}</h3>
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">{principle.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/services"
            className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-theme-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Explore the services behind our work <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="min-w-0">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Illustrative engineering experience
          </p>
          <RcentzWebsiteStory />
        </div>
      </div>
    </section>
  );
}
