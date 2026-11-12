import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

type Feature = { eyebrow: string; title: string; body: string; href: string; link: string; number: string };
export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="relative isolate overflow-hidden border-b border-[#dbe5ef] bg-[#f8fbff]">
      <div className="mx-auto max-w-[1500px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0058d6]">{eyebrow}</p>
        <h1 className="mt-5 max-w-[1050px] text-balance text-5xl font-semibold leading-[1.07] tracking-[-0.048em] text-[#15243b] sm:text-6xl lg:text-[4.7rem]">{title}</h1>
        <p className="mt-5 max-w-[700px] text-lg leading-9 text-[#566b83]">{description}</p>
      </div>
    </header>
  );
}

export function FeatureRows({ items }: { items: Feature[] }) {
  return (
    <div className="border-t border-[#dbe5ef]">
      {items.map((item, index) => (
        <article key={item.title} className={`border-b border-[#dbe5ef] ${index % 2 === 0 ? 'bg-white' : 'bg-[#f5f8fd]'}`}>
          <div className="mx-auto grid max-w-[1500px] items-center gap-8 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-16 lg:py-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.23em] text-[#0058d6]">{item.number} / {item.eyebrow}</p>
              <h2 className="mt-5 max-w-[560px] text-balance text-4xl font-semibold leading-[1.12] tracking-[-0.04em] text-[#15243b] sm:text-5xl">{item.title}</h2>
              <p className="mt-5 max-w-[510px] text-base leading-8 text-[#566b83]">{item.body}</p>
              <Link href={item.href} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0058d6] hover:text-[#003f9a]">
                {item.link} <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="relative flex min-h-[270px] items-center justify-center overflow-hidden rounded-[32px] border border-[#dae6f2] bg-[#edf5ff] sm:min-h-[340px]">
              <div aria-hidden="true" className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(128,182,254,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,182,254,0.08)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(ellipse,black,transparent_75%)]" />
              <div aria-hidden="true" className="absolute h-64 w-64 rounded-full bg-primary/10 blur-[90px]" />
              <div className="relative grid size-48 place-items-center rotate-[-25deg] rounded-[44px] border border-[#a8c6e7] bg-gradient-to-br from-[#cce5ff] via-[#9ec9fc] to-[#ecf6ff] shadow-[24px_28px_90px_rgba(0,109,253,0.12)] sm:size-56">
                <div className="grid size-28 place-items-center rounded-3xl border border-[#a8c6e7] bg-white text-5xl font-semibold text-[#0058d6] sm:size-32">{item.number}</div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ClosingCTA() {
  return (
    <section className="relative border-t border-[#dbe5ef] bg-[#f5f8fd]">
      <div className="mx-auto flex max-w-[1500px] flex-col items-start gap-6 px-6 py-20 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16 lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.23em] text-[#0058d6]">The next step</p>
          <h2 className="mt-4 max-w-[750px] text-balance text-4xl font-semibold tracking-[-0.04em] text-[#15243b] sm:text-5xl">Let&apos;s build what matters next.</h2>
        </div>
        <Link href="/contact" className="inline-flex min-h-12 items-center gap-3 rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
          Start a conversation <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
