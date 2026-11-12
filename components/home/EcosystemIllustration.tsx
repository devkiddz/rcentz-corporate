/**
 * Original Rcentz illustration.
 * A scalable, decorative architectural diagram: Systems and Products
 * connect through a shared core. No raster assets or canvas required.
 */
export default function EcosystemIllustration() {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-primary/20 bg-[#080b12] min-h-[370px] sm:min-h-[430px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(128 182 254 / 8%) 1px, transparent 1px), linear-gradient(to bottom, rgb(128 182 254 / 8%) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
          transform: 'perspective(520px) rotateX(57deg) scale(1.8) translateY(22%)',
          transformOrigin: 'center center',
          maskImage: 'linear-gradient(to bottom,transparent 4%,black 42%,transparent 96%)'
        }}
      />
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[90px]" />
      <svg
        aria-hidden="true"
        viewBox="0 0 640 460"
        className="relative z-10 h-full w-full min-h-[370px] sm:min-h-[430px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="rcentz-core-face" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#213A63"/>
            <stop offset="1" stopColor="#0B162A"/>
          </linearGradient>
          <linearGradient id="rcentz-core-edge" x1="0" x2="1">
            <stop stopColor="#006DFD"/>
            <stop offset="1" stopColor="#80B6FE"/>
          </linearGradient>
          <filter id="rcentz-core-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="9"/>
          </filter>
          <pattern id="rcentz-grid" width="18" height="18" patternUnits="userSpaceOnUse">
            <path d="M18 0H0V18" stroke="#80B6FE" strokeOpacity=".10"/>
          </pattern>
        </defs>

        {/* Isometric pathways and product/system endpoints */}
        <g stroke="#80B6FE" strokeOpacity=".38" strokeWidth="1.3" strokeLinejoin="round">
          <path d="M320 207 440 138 554 205 435 273Z" fill="#0E1623"/>
          <path d="M320 207 201 138 87 205 205 273Z" fill="#0E1623"/>
          <path d="M205 273 320 339 435 273" strokeDasharray="4 6"/>
          <path d="M320 207V339" strokeDasharray="4 6"/>
          <path d="M320 207 435 273M320 207 205 273"/>
        </g>

        {/* Systems node */}
        <g transform="translate(138 167)">
          <path d="M-48 0 0-28 48 0 0 28Z" fill="#162440" stroke="#80B6FE" strokeOpacity=".7"/>
          <path d="M-48 0V18L0 46V28Z" fill="#0B1527" stroke="#80B6FE" strokeOpacity=".45"/>
          <path d="M48 0V18L0 46V28Z" fill="#07101F" stroke="#80B6FE" strokeOpacity=".45"/>
          <path d="M-24-12 0-26 24-12 0 2Z" fill="#006DFD" fillOpacity=".5" stroke="#80B6FE"/>
          <path d="M-24-12V12L0 26V2ZM24-12V12L0 26V2Z" stroke="#80B6FE" strokeOpacity=".7"/>
          <path d="M0 2V26" stroke="#80B6FE"/>
        </g>

        {/* Products node */}
        <g transform="translate(502 167)">
          <path d="M-48 0 0-28 48 0 0 28Z" fill="#162440" stroke="#80B6FE" strokeOpacity=".7"/>
          <path d="M-48 0V18L0 46V28Z" fill="#0B1527" stroke="#80B6FE" strokeOpacity=".45"/>
          <path d="M48 0V18L0 46V28Z" fill="#07101F" stroke="#80B6FE" strokeOpacity=".45"/>
          <path d="M-23-12 0-25 23-12 0 1Z" stroke="#80B6FE"/>
          <path d="M-23-12V12L0 25V1ZM23-12V12L0 25V1Z" stroke="#80B6FE" strokeOpacity=".65"/>
          <path d="M0-25V1M-23 0 0 13 23 0" stroke="#80B6FE" strokeOpacity=".6"/>
          <path d="M0-25 23-12 0 1-23-12Z" fill="#006DFD" fillOpacity=".5"/>
        </g>

        {/* Shared Core — central floating wafer */}
        <ellipse cx="320" cy="284" rx="77" ry="28" fill="#006DFD" opacity=".25" filter="url(#rcentz-core-glow)"/>
        <path d="M245 225 320 182 395 225 320 269Z" fill="url(#rcentz-core-face)" stroke="#80B6FE"/>
        <path d="M245 225V243L320 287V269Z" fill="#0F1C33" stroke="#80B6FE" strokeOpacity=".6"/>
        <path d="M395 225V243L320 287V269Z" fill="#071323" stroke="#80B6FE" strokeOpacity=".6"/>
        <path d="M245 243 320 287 395 243" stroke="url(#rcentz-core-edge)" strokeWidth="3"/>
        <path d="M279 225 320 201 361 225 320 249Z" fill="#006DFD" fillOpacity=".15" stroke="#80B6FE"/>
        <path d="M299 225 320 213 341 225 320 237Z" fill="#006DFD" fillOpacity=".35" stroke="#80B6FE"/>
        <circle cx="320" cy="225" r="5" fill="#D9EAFF"/>
        <circle cx="320" cy="225" r="13" stroke="#80B6FE" strokeOpacity=".4"/>
        <circle cx="320" cy="225" r="22" stroke="#80B6FE" strokeOpacity=".18"/>

        {/* Small connection pins */}
        <g fill="#80B6FE">
          <circle cx="205" cy="273" r="3"/>
          <circle cx="435" cy="273" r="3"/>
          <circle cx="320" cy="339" r="3"/>
        </g>
        <g fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
          <text x="138" y="283" fill="#B4C8E6" fontSize="13" letterSpacing="2">SYSTEMS</text>
          <text x="502" y="283" fill="#B4C8E6" fontSize="13" letterSpacing="2">PRODUCTS</text>
          <text x="320" y="319" fill="#80B6FE" fontSize="12" letterSpacing="2.5">RCENTZ CORE</text>
        </g>
        <rect x="1" y="1" width="638" height="458" rx="20" fill="url(#rcentz-grid)" opacity=".22" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080b12] to-transparent pointer-events-none" />
      <p className="absolute bottom-5 left-0 right-0 text-center text-[10px] uppercase tracking-[0.22em] text-blue-100/60">One company · Connected capabilities</p>
    </div>
  );
}
