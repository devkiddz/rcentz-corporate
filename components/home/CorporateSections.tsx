import Link from 'next/link';
import EcosystemIllustration from './EcosystemIllustration';
import AboutIllustration from './AboutIllustration';
import {
  ArrowUpRight,
  Braces,
  Globe2,
  Layers3,
  MessageSquareText,
  ShieldCheck,
  Workflow
} from 'lucide-react';

const services = [
  {
    title: 'Websites & Digital Experiences',
    description: 'Distinctive, responsive websites that communicate clearly and help businesses earn trust.',
    icon: Globe2
  },
  {
    title: 'Custom Software Development',
    description: 'Purpose-built web applications, portals and internal tools shaped around real workflows.',
    icon: Braces
  },
  {
    title: 'Business Systems & Automation',
    description: 'Connected processes, dashboards and practical automation that reduce manual work.',
    icon: Workflow
  }
];

const principles = [
  { title: 'Understand first', description: 'We begin with the problem, not a list of technologies.', icon: MessageSquareText },
  { title: 'Build deliberately', description: 'Maintainable foundations and purposeful interfaces come before feature overload.', icon: Layers3 },
  { title: 'Deliver responsibly', description: 'Clear scope, honest progress and room to improve after launch.', icon: ShieldCheck }
];

export default function CorporateSections() {
  return (
    <>
      <section id="about" aria-labelledby="about-heading" className="relative isolate scroll-mt-24 overflow-hidden border-t border-border py-20 sm:py-28">
        {/* A solid editorial canvas lets the site-wide atmosphere remain at the edges,
            without running a busy particle pattern behind paragraphs. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-background/85" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-primary" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">01 / Who we are</p>
              </div>
              <h2 id="about-heading" className="mt-7 max-w-[13ch] text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-foreground sm:text-5xl">
                Technology is useful when it moves people forward.
              </h2>
              <p className="mt-7 max-w-md text-base leading-8 text-muted-foreground">
                We are Rcentz: one technology company bringing software, systems and digital products together around real needs.
              </p>
              <div className="mt-9 flex flex-wrap gap-2" aria-label="Rcentz capabilities">
                {['Software', 'Systems', 'Digital products'].map(capability => (
                  <span key={capability} className="rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-2 text-xs font-medium text-blue-100">
                    {capability}
                  </span>
                ))}
              </div>
              <Link href="https://systems.rcentz.cc" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-blue-100 transition-colors hover:text-foreground">
                Discover what we do <ArrowUpRight aria-hidden="true" size={16} />
              </Link>
            </div>
            <div>
              <AboutIllustration />
              <div className="mt-7 grid gap-6 border-t border-border/80 pt-7 sm:grid-cols-2 sm:gap-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.17em] text-primary">What drives us</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    We turn complex requirements into clear, practical experiences that businesses and people can actually use.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.17em] text-primary">How we work</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Good design and thoughtful engineering belong together, from the first conversation to every improvement after launch.
                  </p>
                </div>
              </div>
              <p className="mt-7 border-l-2 border-primary pl-5 text-sm font-medium leading-7 text-foreground/90">
                One company. Connected capabilities. Purposeful technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 border-y border-border bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Rcentz Systems</p>
            <h2 id="services-heading" className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Services built around your goals.</h2>
            <p className="mt-5 leading-8 text-muted-foreground">From a first website to a custom business platform, our engineering work starts with understanding what success means for you.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {services.map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/50">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon aria-hidden="true" size={22} /></div>
                <h3 className="mt-7 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
          <Link href="https://systems.rcentz.cc" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Explore Rcentz Systems <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      <section id="products" aria-labelledby="products-heading" className="scroll-mt-24 py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Rcentz Products</p>
            <h2 id="products-heading" className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Ideas engineered into useful products.</h2>
            <p className="mt-5 leading-8 text-muted-foreground">Alongside client projects, we develop our own digital applications. Each product has its own purpose, but belongs to the wider Rcentz ecosystem.</p>
            <Link href="https://products.rcentz.cc" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">
              Discover Our Products <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <EcosystemIllustration />
        </div>
      </section>

      <section aria-labelledby="approach-heading" className="border-y border-border bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Our approach</p>
          <h2 id="approach-heading" className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Thoughtful by design. Practical by default.</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {principles.map(({ title, description, icon: Icon }, index) => (
              <div key={title} className="border-t border-border pt-6">
                <div className="flex items-center justify-between"><span className="text-xs font-mono text-primary">0{index + 1}</span><Icon aria-hidden="true" className="text-primary" size={22} /></div>
                <h3 className="mt-8 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Let&apos;s work together</p>
          <h2 id="contact-heading" className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Have a problem worth solving?</h2>
          <p className="mx-auto mt-6 max-w-xl leading-8 text-muted-foreground">Tell us what you&apos;re building or what needs to work better. Our service team is the right place to begin.</p>
          <Link href="https://systems.rcentz.cc" className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">
            Start a Conversation <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p><span className="font-rcentz text-xl text-foreground">rcentz</span> <span className="ml-3">Software · Systems · Solutions</span></p>
          <p>© 2026 Rcentz. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
