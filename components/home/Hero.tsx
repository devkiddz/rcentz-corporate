import SiteAtmosphere from '@/components/background/SiteAtmosphere';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[min(790px,calc(100svh-68px))] items-center justify-center overflow-hidden bg-[#f8fbff] text-[#15243b]">
      <SiteAtmosphere />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,255,255,0.84),transparent_65%)]" />
      <div className="relative z-10 mx-auto flex max-w-[1500px] flex-col items-center px-6 py-24 text-center sm:px-10 lg:py-28">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#cfe0f2] bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#245b9c] backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-primary" /> Software · Systems · Solutions
        </p>
        <h1 className="mt-7 max-w-[1050px] text-balance text-[clamp(2.8rem,4.7vw,5.2rem)] font-semibold leading-[1.08] tracking-[-0.052em]">
          Engineering digital solutions for a connected world.
        </h1>
        <p className="mt-5 max-w-[690px] text-pretty text-base leading-8 text-[#546780] sm:text-lg">
          Websites, applications and intelligent systems thoughtfully built for people, businesses and tomorrow.
        </p>
        <div className="mt-7 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link href="/services" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
            Explore our services <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/about" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-[#cbd9e8] bg-white/90 px-7 py-3.5 text-sm font-semibold text-[#1b3554] backdrop-blur-md transition-colors hover:bg-[#edf5ff]">
            Discover Rcentz <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
