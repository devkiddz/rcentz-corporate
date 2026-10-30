export default function Home() {
  return (
    <main className="relative isolate flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-64 h-[650px] w-[650px] rounded-full bg-blue-600/15 blur-[140px]" />
        <div className="absolute -bottom-80 -left-40 h-[600px] w-[600px] rounded-full bg-blue-900/30 blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(161,176,242,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(161,176,242,0.5)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      {/* Header */}
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-7 sm:px-10 lg:px-16">
        <a href="https://rcentz.cc" aria-label="Rcentz home" className="flex items-center gap-2">
          <img
            src="https://api.rcentz.cc/brands/rcentz/rcentz-mark-dark.svg"
            alt="Rcentz"
            className="h-8 w-auto sm:h-6"
          />
          <span className="font-rcentz text-2xl sm:text-xl">rcentz</span>
        </a>

        <div className="flex items-center gap-2 rounded-full border border-blue-100/15 bg-white/[0.035] px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
          </span>
          <span className="text-[10px] font-semibold tracking-[0.2em] text-blue-100/80">
            UNDER DEVELOPMENT
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid w-full max-w-[1440px] flex-1 items-center gap-12 px-6 pb-20 pt-12 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 lg:px-16 lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-blue-500" />
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-blue-100/65">
              Rich Enterprise
            </span>
          </div>

          <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl lg:text-[76px]">
            Technology for a{' '}
            <span className="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
              Better Tomorrow.
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-base leading-8 text-slate-300/75 sm:text-lg">
            We are building software, products and digital solutions that empower businesses, connect
            opportunities and move ideas forward.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <a
              href="https://systems.rcentz.cc"
              className="group inline-flex items-center gap-3 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_35px_rgba(66,96,230,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_12px_40px_rgba(66,96,230,0.35)]">
              Explore Rcentz Systems
              <span className="transition-transform group-hover:translate-x-1">?</span>
            </a>

            <a
              href="https://products.rcentz.cc"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white">
              Our products
              <span aria-hidden="true">?</span>
            </a>
          </div>

          <div className="mt-16 flex items-center gap-4 border-t border-white/10 pt-6">
            <div className="flex -space-x-2">
              <span className="h-2.5 w-2.5 rounded-full border border-background bg-blue-300" />
              <span className="h-2.5 w-2.5 rounded-full border border-background bg-blue-500" />
              <span className="h-2.5 w-2.5 rounded-full border border-background bg-blue-800" />
            </div>
            <p className="text-xs tracking-wide text-slate-400">A new digital experience is taking shape.</p>
          </div>
        </div>

        {/* Abstract technology artwork */}
        <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[650px]">
          <div className="absolute inset-[8%] rounded-full bg-blue-600/10 blur-[85px]" />

          <div className="absolute inset-[7%] rounded-full border border-blue-200/[0.09] [transform:rotateX(62deg)_rotateZ(-25deg)]" />
          <div className="absolute inset-[15%] rounded-full border border-blue-300/[0.12] [transform:rotateX(62deg)_rotateZ(35deg)]" />
          <div className="absolute inset-[23%] rounded-full border border-blue-400/[0.12] [transform:rotateX(62deg)_rotateZ(-55deg)]" />

          <div className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[34%] border border-blue-300/20 bg-gradient-to-br from-blue-500/20 via-blue-900/15 to-transparent shadow-[inset_0_0_80px_rgba(66,96,230,0.12),0_0_100px_rgba(66,96,230,0.12)] [transform:rotate(-35deg)]">
            <div className="absolute inset-[12%] rounded-[30%] border border-blue-200/20 bg-gradient-to-br from-blue-400/15 to-transparent" />
            <div className="absolute inset-[27%] rounded-[25%] border border-blue-200/20 bg-gradient-to-br from-blue-300/15 to-blue-950/30" />
          </div>

          <div className="absolute left-[19%] top-[24%] h-3 w-3 rounded-full bg-blue-200 shadow-[0_0_25px_8px_rgba(96,165,250,0.45)]" />
          <div className="absolute right-[16%] top-[36%] h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_22px_7px_rgba(66,96,230,0.65)]" />
          <div className="absolute bottom-[19%] left-[34%] h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_20px_6px_rgba(161,176,242,0.5)]" />

          <div className="absolute right-[4%] top-[17%] h-px w-[25%] rotate-[35deg] bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />
          <div className="absolute bottom-[20%] left-[3%] h-px w-[30%] -rotate-[25deg] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

          <div className="absolute bottom-[8%] right-[8%] rounded-xl border border-blue-200/10 bg-[#080F24]/80 px-4 py-3 shadow-2xl backdrop-blur-xl">
            <p className="text-[9px] uppercase tracking-[0.22em] text-blue-200/55">Building forward</p>
            <p className="mt-1 text-sm font-medium text-white">Ideas into possibilities.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 border-t border-white/10 px-6 py-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
        <p>© {new Date().getFullYear()} Rcentz · Rich Enterprise</p>
        <p className="tracking-wide">Everything Happens For Me.</p>
      </footer>
    </main>
  );
}
