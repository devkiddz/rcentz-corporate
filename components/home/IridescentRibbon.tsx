import { heroVisual } from '@/config/hero-visual';
import styles from './IridescentRibbon.module.css';

type RibbonSegment = {
  front: string;
  edge: string;
  highlight: string;
  opacity: number;
  shade: number;
};

function buildSegments(): RibbonSegment[] {
  const output: RibbonSegment[] = [];
  const n = heroVisual.tileCount;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const x = -125 + t * 1500;
    const y = 24 + t * 650 + Math.sin(t * Math.PI * 3.1) * 66;
    const dx = 1500;
    const dy = 650 + Math.cos(t * Math.PI * 3.1) * 66 * Math.PI * 3.1;
    const length = Math.hypot(dx, dy);
    const nx = -dy / length;
    const ny = dx / length;
    const twist = Math.cos(t * Math.PI * 7.5 + .3);
    const extent = 44 + Math.abs(twist) * 74;
    const shear = Math.sin(t * Math.PI * 7.5 + .3) * 44;
    const a = [x + nx * extent + shear, y + ny * extent - 25];
    const b = [x - nx * extent + shear, y - ny * extent - 25];
    const c = [x - nx * extent - 26, y - ny * extent + 33];
    const d = [x + nx * extent - 26, y + ny * extent + 33];
    const p = (...xy: number[]) => xy.map(v => v.toFixed(1)).join(' ');
    const front = `M${p(...a)} L${p(...b)} L${p(...c)} L${p(...d)} Z`;
    const edge = `M${p(...d)} L${p(...c)} L${p(c[0]-5,c[1]+8)} L${p(d[0]-5,d[1]+8)} Z`;
    const highlight = `M${p(a[0]+3,a[1]+3)} L${p(b[0]+3,b[1]+3)}`;
    output.push({ front, edge, highlight, opacity: .66 + .24 * Math.abs(twist), shade: i % 5 });
  }
  return output;
}
const segments = buildSegments();

export default function IridescentRibbon() {
  return (
    <svg viewBox="0 0 1200 670" preserveAspectRatio="xMidYMid slice" role="img"
      aria-label="Abstract iridescent ribbon made of twisting translucent glass panels">
      <defs>
        <linearGradient id="ribbon-prism" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d1e7ff" />
          <stop offset=".28" stopColor="#a7b8ff" />
          <stop offset=".51" stopColor="#e6d6ff" />
          <stop offset=".75" stopColor="#a8f8fc" />
          <stop offset="1" stopColor="#7cbffb" />
        </linearGradient>
        <linearGradient id="ribbon-edge" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffffff" /><stop offset=".5" stopColor="#81a4ff" /><stop offset="1" stopColor="#c0f8ff"/>
        </linearGradient>
        <filter id="ribbon-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>
      <path d="M-100 40 Q500 185 1230 640" stroke="#b2c8ff" strokeWidth="100" strokeOpacity=".16"
        filter="url(#ribbon-soft-shadow)" fill="none" />
      <g className={styles.ribbonFlow} opacity={heroVisual.ribbonOpacity}>
        {segments.map((segment, index) => (
          <g key={index} opacity={segment.opacity}>
            <path d={segment.edge} fill="#80a2d0" fillOpacity=".50" />
            <path d={segment.front} fill="url(#ribbon-prism)" stroke="url(#ribbon-edge)" strokeWidth="1.8" />
            <path d={segment.highlight} stroke="#ffffff" strokeWidth="2.4" strokeOpacity=".8" />
            <path d={segment.front} fill={segment.shade % 2 === 0 ? '#d0f9ff' : '#cbb6ff'}
              fillOpacity={segment.shade % 2 === 0 ? '.10' : '.08'} />
          </g>
        ))}
      </g>
    </svg>
  );
}
