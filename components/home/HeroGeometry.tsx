/**
 * Original Rcentz hero artwork: isometric platforms that represent
 * connected software, systems and products. Decorative and CSS-free SVG.
 */
export default function HeroGeometry() {
  return (
    <div aria-hidden="true" className="relative min-w-0 overflow-hidden rounded-[28px] border border-blue-100/10 bg-[#090d16] lg:rounded-[36px]">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/[0.07] to-transparent" />
      <svg viewBox="0 0 660 540" className="relative block h-auto w-full" xmlns="http://www.w3.org/2000/svg" fill="none">
        <defs>
          <linearGradient id="rh-floor" x1="330" y1="90" x2="330" y2="540" gradientUnits="userSpaceOnUse">
            <stop stopColor="#80B6FE" stopOpacity=".16"/>
            <stop offset="1" stopColor="#80B6FE" stopOpacity=".025"/>
          </linearGradient>
          <linearGradient id="rh-edge" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#80B6FE"/><stop offset="1" stopColor="#006DFD"/>
          </linearGradient>
          <linearGradient id="rh-top" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#202D47"/><stop offset="1" stopColor="#111B30"/>
          </linearGradient>
          <filter id="rh-glow" x="-90%" y="-90%" width="280%" height="280%"><feGaussianBlur stdDeviation="11"/></filter>
          <pattern id="rh-grid" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="matrix(1 .43 -1 .43 330 20)">
            <path d="M36 0H0V36" stroke="#80B6FE" strokeOpacity=".25" strokeWidth=".8"/>
          </pattern>
        </defs>
        <path d="M0 135L330 0 660 135V540H0Z" fill="url(#rh-floor)" opacity=".13"/>
        <rect x="0" y="0" width="660" height="540" fill="url(#rh-grid)" opacity=".5"/>
        <path d="M28 346L327 205 632 347 332 490Z" stroke="#80B6FE" strokeOpacity=".17"/>
        <path d="M28 394L327 253 632 395 332 538Z" stroke="#80B6FE" strokeOpacity=".12"/>
        <path d="M330 268 206 334 331 397 455 333Z" fill="#006DFD" opacity=".16" filter="url(#rh-glow)"/>
        <g stroke="#80B6FE" strokeOpacity=".45" strokeWidth="1.4">
          <path d="M331 320 173 240M331 320 494 242M331 320 331 426" strokeDasharray="5 7"/>
          <path d="M173 240 173 198M494 242V199M331 426V389" strokeDasharray="5 7"/>
        </g>
        {/* Main central floating stack */}
        <path d="M224 296 330 240 436 296 330 354Z" fill="#006DFD" opacity=".3" filter="url(#rh-glow)"/>
        <path d="M228 285 330 232 432 285 330 339Z" fill="#132139" stroke="#80B6FE" strokeOpacity=".55"/>
        <path d="M228 285V301L330 355V339Z" fill="#0C1629" stroke="#80B6FE" strokeOpacity=".55"/>
        <path d="M432 285V301L330 355V339Z" fill="#080F20" stroke="#80B6FE" strokeOpacity=".55"/>
        <path d="M245 264 330 219 415 264 330 309Z" fill="#142541" stroke="#80B6FE" strokeOpacity=".7"/>
        <path d="M245 264V280L330 325V309Z" fill="#111C33" stroke="#80B6FE" strokeOpacity=".7"/>
        <path d="M415 264V280L330 325V309Z" fill="#0B152A" stroke="#80B6FE" strokeOpacity=".7"/>
        <path d="M261 241 330 204 399 241 330 278Z" fill="url(#rh-top)" stroke="url(#rh-edge)" strokeWidth="2"/>
        <path d="M261 241V257L330 294V278Z" fill="#10213C" stroke="#80B6FE" strokeOpacity=".8"/>
        <path d="M399 241V257L330 294V278Z" fill="#0B1730" stroke="#80B6FE" strokeOpacity=".8"/>
        <path d="M302 241 330 226 358 241 330 256Z" fill="#006DFD" fillOpacity=".35" stroke="#80B6FE"/>
        <path d="M315 241 330 233 345 241 330 249Z" fill="#80B6FE" fillOpacity=".7"/>
        {/* Left system node */}
        <path d="M104 197 173 160 242 197 173 234Z" fill="#17243B" stroke="#80B6FE" strokeOpacity=".65"/>
        <path d="M104 197V212L173 249V234Z" fill="#0D192C" stroke="#80B6FE" strokeOpacity=".5"/>
        <path d="M242 197V212L173 249V234Z" fill="#0B1425" stroke="#80B6FE" strokeOpacity=".5"/>
        <path d="M137 195 173 176 209 195 173 214Z" fill="#006DFD" fillOpacity=".12" stroke="#80B6FE"/>
        <path d="M156 195 173 186 190 195 173 204Z" fill="#006DFD" fillOpacity=".4" stroke="#80B6FE"/>
        {/* Right product node */}
        <path d="M425 198 494 161 563 198 494 235Z" fill="#17243B" stroke="#80B6FE" strokeOpacity=".65"/>
        <path d="M425 198V213L494 250V235Z" fill="#0D192C" stroke="#80B6FE" strokeOpacity=".5"/>
        <path d="M563 198V213L494 250V235Z" fill="#0B1425" stroke="#80B6FE" strokeOpacity=".5"/>
        <path d="M461 195 494 177 527 195 494 213Z" fill="#006DFD" fillOpacity=".15" stroke="#80B6FE"/>
        <path d="M494 177V213M461 195 494 213 527 195" stroke="#80B6FE" strokeOpacity=".6"/>
        {/* Small lower node */}
        <path d="M278 390 330 362 382 390 330 418Z" fill="#192943" stroke="#80B6FE" strokeOpacity=".55"/>
        <path d="M278 390V403L330 432V418Z" fill="#0C1729" stroke="#80B6FE" strokeOpacity=".4"/>
        <path d="M382 390V403L330 432V418Z" fill="#081324" stroke="#80B6FE" strokeOpacity=".4"/>
        <path d="M310 391H350M330 373V407" stroke="#80B6FE" strokeWidth="1.5"/>
        <g fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" letterSpacing="2" textAnchor="middle" fill="#A9C9F0">
          <text x="173" y="285">SYSTEMS</text>
          <text x="494" y="285">PRODUCTS</text>
          <text x="330" y="468">CONNECTED CORE</text>
        </g>
      </svg>
      <p className="absolute bottom-4 left-0 right-0 text-center text-[10px] uppercase tracking-[0.2em] text-blue-100/45">
        One ecosystem. Connected possibilities.
      </p>
    </div>
  );
}
