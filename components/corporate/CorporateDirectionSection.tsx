import { ArrowUpRight, Layers3, Puzzle, Telescope } from 'lucide-react';
import Link from 'next/link';

const directions = [
  {
    number: '01',
    title: 'Do meaningful work today',
    description:
      'Help organizations move from an unclear requirement to a considered solution, with honest conversations about scope, constraints and what matters.',
    Icon: Layers3
  },
  {
    number: '02',
    title: 'Build foundations we can improve',
    description:
      'Make room for reusable patterns, understandable systems and the ability to revisit a decision when new information appears.',
    Icon: Puzzle
  },
  {
    number: '03',
    title: 'Explore ideas with broader reach',
    description:
      'Develop independent digital products where a recurring problem deserves a solution that can serve more than one organization.',
    Icon: Telescope
  }
] as const;

export function CorporateDirectionSection() {
  return (
    <section
      id="our-direction"
      aria-labelledby="corporate-direction-heading"
      className="rcentz-section border-b border-border bg-surface-subtle py-16 sm:py-20 lg:py-24">
      <div className="grid items-end gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-theme-accent" />
            Where we are going
          </p>
          <h2
            id="corporate-direction-heading"
            className="mt-6 max-w-3xl text-balance text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.7rem]">
            A company built to keep learning, building and connecting ideas.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          Our ambition is bigger than delivering one project or launching one
          product. We want Rcentz to grow into a connected engineering company
          where practical client work, reusable foundations and independent
          product ideas strengthen one another.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {directions.map(({ number, title, description, Icon }) => (
          <article key={number} className="flex h-full flex-col rounded-2xl border border-border bg-background p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-theme-accent">{number}</span>
              <Icon aria-hidden="true" className="size-5 text-theme-accent" />
            </div>
            <h3 className="mt-9 text-lg font-semibold tracking-tight sm:text-xl">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <h3 className="text-xl font-semibold tracking-tight">Every useful partnership begins with a conversation.</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Explore our work, ask a question or tell us about an idea you want to develop.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Contact Rcentz <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Explore services
          </Link>
        </div>
      </div>
    </section>
  );
}
