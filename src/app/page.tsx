export default function Home() {
  return (
    <main className="relative isolate flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-64 h-[650px] w-[650px] rounded-full bg-blue-600/15 blur-[140px]" />
        <div className="absolute -bottom-80 -left-40 h-[600px] w-[600px] rounded-full bg-blue-900/30 blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(161,176,242,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(161,176,242,0.5)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      {/* Transparent header */}
      <header className="absolute inset-x-0 top-0 z-30 mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-8 sm:px-10 lg:px-16">
        <a href="https://rcentz.cc" aria-label="Rcentz home" className="flex items-center gap-3">
          <img
            src="https://api.rcentz.cc/brands/rcentz/rcentz-mark-dark.svg"
            alt="Rcentz"
            className="h-10 w-auto sm:h-11"
          />
          <span className="font-rcentz text-2xl text-white">rcentz</span>
        </a>

        <div className="flex items-center gap-2 rounded-full border border-blue-100/20 bg-[#030923]/30 px-4 py-2 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
          </span>
          <span className="text-[10px] font-semibold tracking-[0.2em] text-blue-100/90">
            UNDER DEVELOPMENT
          </span>
        </div>
      </header>

      {/* Full-screen corporate hero */}
      <section className="relative isolate flex min-h-screen w-full flex-1 items-center justify-center overflow-hidden">
        {/* Hero background image and overlays */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/brands/official-galleries/rcentz-futuristic-cityscape.png"
            alt="Rcentz futuristic cityscape with reflective R emblem"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#030923]/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030923]/45 via-transparent to-[#030923]/85" />
        </div>

        {/* Centered hero content */}
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-20 pt-36 text-center sm:px-10 sm:pt-40 lg:pt-44"></div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 border-t border-white/10 px-6 py-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
        <p>© 2026 Rcentz · Rich Enterprise. All rights reserved.</p>
      </footer>
    </main>
  );
}
