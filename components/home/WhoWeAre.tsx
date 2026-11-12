import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const capabilities = [
  { index: '01', name: 'Software', detail: 'Designed with people in mind' },
  { index: '02', name: 'Systems', detail: 'Engineered for real operations' },
  { index: '03', name: 'Products', detail: 'Built to create possibilities' }
] as const;

/**
 * M29: The Who We Are capability list now sits immediately below the headline.
 * All three capabilities appear in one compact, horizontal row.
 * The right column is deliberately blank for a later approved illustration.
 */
export default function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-title"
      className="relative isolate overflow-hidden bg-white text-[#15243b]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#a5c2e2_1px,transparent_1px),linear-gradient(to_bottom,#a5c2e2_1px,transparent_1px)] [background-size:90px_90px] [mask-image:linear-gradient(90deg,transparent_4%,black_70%,transparent)]"
      />

      <div className="relative mx-auto grid max-w-[1536px] grid-cols-1 gap-8 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-2 lg:items-start lg:gap-20 lg:px-16 lg:py-16">
        {/* LEFT: Both existing blocks now share one column. */}
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#075cba]">
            01 / Who we are
          </p>
          <h2
            id="who-we-are-title"
            className="mt-5 max-w-[670px] text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.045em] sm:text-5xl lg:text-[3.5rem]">
            Technology should make the difficult feel possible.
          </h2>
          {/* Capabilities immediately follow the headline, in one concise row. */}
          <div className="mt-7 border-t border-[#d9e5f1] pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-[#075cba]">
              One company. Connected capabilities.
            </p>
            <div className="mt-4 grid grid-cols-3 border-y border-[#d9e5f1]">
              {capabilities.map(capability => (
                <div
                  key={capability.index}
                  className="min-w-0 border-r border-[#d9e5f1] px-2 py-3 first:pl-0 last:border-r-0 last:pr-0 sm:px-4 sm:py-4">
                  <span className="font-mono text-[10px] text-[#2a6bad]">{capability.index}</span>
                  <h3 className="mt-1.5 text-[clamp(0.94rem,1.8vw,1.25rem)] font-semibold tracking-[-0.035em] text-[#15243b]">
                    {capability.name}
                  </h3>
                  <p className="mt-1 text-[10px] leading-[1.45] text-[#566b82] sm:text-[11px]">
                    {capability.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 max-w-[560px] text-base leading-7 text-[#4a5e76] sm:text-lg sm:leading-8">
            Rcentz brings design and engineering together to create websites, software systems and digital products
            with a purpose.
          </p>
          <Link
            href="/about"
            className="mt-5 inline-flex min-h-11 items-center gap-2 border-b border-[#006dfd]/55 pb-1 text-sm font-semibold text-[#0058d6] transition-colors hover:border-[#006dfd] hover:text-[#003f9a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006dfd]">
            Meet Rcentz <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
        </div>

        {/* RIGHT: Intentionally empty. No artwork, placeholder, or mockup yet. */}
        <div aria-hidden="true" className="hidden lg:block" />
      </div>
    </section>
  );
}
