/**
 * Original, decorative Rcentz network illustration. Static SVG for instant
 * rendering; contrast and labeling are independent of the sitewide particles.
 */
export default function AboutIllustration() {
  return (
    <div className="relative isolate overflow-hidden rounded-[28px] border border-primary/20 bg-[#090e19] shadow-[0_26px_90px_rgb(0_0_0/0.22)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40" style={{
        backgroundImage: 'linear-gradient(to right, rgb(128 182 254 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(128 182 254 / 0.08) 1px, transparent 1px)',
        backgroundSize: '42px 42px',
        maskImage: 'linear-gradient(to bottom, black, transparent 90%)'
      }} />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[75px]" />
      <svg aria-hidden="true" viewBox="0 0 620 425" className="relative block h-auto w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="about-node" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#263C60" /><stop offset="1" stopColor="#0D1A31" /></linearGradient>
          <linearGradient id="about-blue" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#80B6FE"/><stop offset="1" stopColor="#006DFD"/></linearGradient>
          <filter id="about-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="13"/></filter>
        </defs>
        {/* Isometric connective lattice */}
        <g stroke="#80B6FE" strokeOpacity=".25" strokeWidth="1.2">
          <path d="M65 249 307 117 548 251 310 383Z"/>
          <path d="M124 216 310 320 492 220" strokeDasharray="5 7"/>
          <path d="M188 181 310 250 431 184" strokeDasharray="5 7"/>
          <path d="M310 117V383" strokeDasharray="5 8" />
          <path d="M124 216 124 266M492 220 492 269" />
        </g>
        {/* Stacked center platform */}
        <ellipse cx="310" cy="266" rx="118" ry="38" fill="#006DFD" fillOpacity=".25" filter="url(#about-glow)" />
        <path d="M212 215 310 162 408 215 310 270Z" fill="#0C182A" stroke="#80B6FE" strokeOpacity=".60"/>
        <path d="M212 215V233L310 288V270Z" fill="#0D1D36" stroke="#80B6FE" strokeOpacity=".55"/>
        <path d="M408 215V233L310 288V270Z" fill="#081326" stroke="#80B6FE" strokeOpacity=".55"/>
        <path d="M230 194 310 151 390 194 310 239Z" fill="url(#about-node)" stroke="#80B6FE" />
        <path d="M230 194V210L310 255V239Z" fill="#142747" stroke="#80B6FE" strokeOpacity=".8"/>
        <path d="M390 194V210L310 255V239Z" fill="#0A1931" stroke="#80B6FE" strokeOpacity=".8"/>
        <path d="M270 194 310 172 350 194 310 216Z" fill="#006DFD" fillOpacity=".18" stroke="url(#about-blue)" strokeWidth="1.5"/>
        <path d="M291 194 310 183 329 194 310 205Z" fill="#80B6FE" fillOpacity=".65" />
        {/* Independent systems, shown as three compact nodes */}
        <g stroke="#80B6FE" strokeOpacity=".67">
          <path d="M87 230 134 205 181 230 134 256Z" fill="url(#about-node)"/>
          <path d="M87 230V243L134 269V256Z" fill="#0D1E36"/>
          <path d="M181 230V243L134 269V256Z" fill="#091528" />
          <path d="M108 230 134 216 160 230 134 245Z" fill="#006DFD" fillOpacity=".18"/>
          <path d="M442 231 489 206 536 231 489 257Z" fill="url(#about-node)"/>
          <path d="M442 231V244L489 270V257Z" fill="#0D1E36"/>
          <path d="M536 231V244L489 270V257Z" fill="#091528" />
          <path d="M467 231 489 219 511 231 489 243Z" fill="#006DFD" fillOpacity=".22"/>
          <path d="M262 332 310 306 358 332 310 359Z" fill="url(#about-node)"/>
          <path d="M262 332V345L310 372V359Z" fill="#0D1E36"/>
          <path d="M358 332V345L310 372V359Z" fill="#091528" />
          <path d="M291 332H329M310 316V347" />
        </g>
        <g fill="#80B6FE"><circle cx="194" cy="225" r="3"/><circle cx="426" cy="225" r="3"/><circle cx="310" cy="294" r="3"/></g>
        <g fontFamily="Arial, Helvetica, sans-serif" fill="#AEC8EF" fontSize="11" fontWeight="600" textAnchor="middle" letterSpacing="1.6">
          <text x="134" y="298">SYSTEMS</text><text x="489" y="298">PRODUCTS</text><text x="310" y="401">SOLUTIONS</text>
          <text x="310" y="117" fill="#80B6FE">RCENTZ</text>
        </g>
      </svg>
      <div className="relative flex items-center justify-between gap-3 border-t border-white/10 bg-white/[0.025] px-5 py-4 sm:px-6">
        <span className="text-xs font-medium text-blue-100/90">Software · Systems · Solutions</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Built to connect</span>
      </div>
    </div>
  );
}
