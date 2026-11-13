import { ArrowUpRight, Compass, HeartHandshake, Waypoints } from 'lucide-react';
import Link from 'next/link';

const perspective = [
  {
    number: '01',
    title: 'The people behind the screen',
    description:
      'A website is used by someone looking for an answer. A business system is used by someone trying to get work done. Their experience is where our thinking begins.',
    Icon: HeartHandshake
  },
  {
    number: '02',
    title: 'The work behind the request',
    description:
      'Before choosing features, we want to understand what is happening today, where friction appears, and what a useful improvement would look like.',
    Icon: Waypoints
  },
  {
    number: '03',
    title: 'The possibilities beyond the first version',
    description:
      'Good engineering leaves room to learn. We think about clarity, maintainability and the decisions that will matter as a product or business grows.',
    Icon: Compass
  }
] as const;

export function CorporatePurposeSection() {
  return (
    <section
      id="our-purpose"
      aria-labelledby="corporate-purpose-heading"
      className="rcentz-section relative isolate scroll-mt-24 overflow-hidden border-b border-border py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:linear-gradient(110deg,transparent_9%,black_100%)]"
      />

      <div className="relative grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="min-w-0 lg:sticky lg:top-28">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-subtle px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-theme-accent" />
            Why we build
          </p>
          <h2
            id="corporate-purpose-heading"
            className="mt-6 max-w-xl text-balance text-3xl font-semibold leading-[1.13] tracking-tight sm:text-4xl lg:text-[2.7rem]">
            There is always a real need behind the technology.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
            The starting point for Rcentz is not a framework, a feature list or a
            trend. It is the distance between what people need to accomplish and
            what their current tools make possible.
          </p>
          <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
            Our purpose is to narrow that distance through thoughtful digital
            experiences, practical systems and products that are worth using.
          </p>
          <Link
            href="/services"
            className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-theme-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            See how that becomes real work <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="grid gap-3">
          {perspective.map(({ number, title, description, Icon }) => (
            <article
              key={number}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-theme-accent-faint blur-2xl"
              />
              <div className="relative flex items-start gap-4 sm:gap-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-subtle text-theme-accent">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] tracking-widest text-theme-accent">{number} / OUR POINT OF VIEW</p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">{title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
