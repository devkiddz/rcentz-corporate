import { Shuffle, Activity } from 'lucide-react';

import StripeParticles from './StripeParticles';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <StripeParticles particleCount={200} primaryColor="#4260e6" glowColor="#a1b0f2" speed={1.2} />

        {/* Central atmospheric glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-[140px]" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Hero Content */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24 text-center">
        <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100/20 bg-blue-900/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-100 shadow-[0_0_10px_var(--blue-100)]" />
          Software. Systems. Solutions.
        </span>

        <h1 className="mx-auto max-w-4xl bg-gradient-to-b from-foreground via-blue-100 to-blue-500 bg-clip-text text-4xl font-extrabold leading-[1.1] tracking-tight text-transparent sm:text-5xl lg:text-6xl">
          Engineering Digital Solutions for a Connected World.
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          We design and build websites, web applications, mobile apps, and intelligent software systems that
          help businesses operate, grow, and move forward.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="https://products.rcentz.cc"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_rgb(0_109_253/25%)] transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-[0_0_45px_rgb(0_109_253/40%)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:w-64">
            <Shuffle
              size={17}
              strokeWidth={2}
              className="transition-all duration-300 group-hover:-rotate-360"
            />
            Explore Our Solutions
          </Link>

          <Link
            href="https://systems.rcentz.cc"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-blue-100/20 bg-blue-900/20 px-8 py-3.5 text-sm font-semibold text-blue-100 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-100/50 hover:bg-blue-900/40 hover:shadow-[0_0_30px_rgb(0_109_253/15%)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:w-64">
            <Activity
              size={17}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
            Work With Us
          </Link>
        </div>
      </section>
    </main>
  );
}
