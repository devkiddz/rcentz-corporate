import styles from './HeroParticles.module.css';

type Particle = {
  x: number;
  y: number;
  opacity: number;
  size: number;
};

// Stable, deterministic particles: no Math.random(), Date(), or client hydration.
// Dense bands approximate the sweeping dotted formations in the design reference.
function makeParticles(layer: number): Particle[] {
  const points: Particle[] = [];
  const step = 16;

  for (let y = 0; y <= 720; y += step) {
    for (let x = 0; x <= 1440; x += step) {
      const noise = ((x * 127 + y * 311 + layer * 631) % 997) / 997;
      const bend = 265 + 125 * Math.sin(x / 195 + layer * 0.4);
      const lowerBend = 520 + 75 * Math.sin(x / 155 + 1.6);
      const inUpperBand = Math.abs(y - bend) < (115 + 45 * Math.sin(x / 290));
      const inLowerBand = Math.abs(y - lowerBend) < 165;
      const nearTop = y < 145 && (x < 310 || x > 1100);
      const dense = inUpperBand || inLowerBand || nearTop;
      const threshold = layer === 0 ? 0.42 : 0.64;
      if (!dense || noise < threshold) continue;

      // Open a clear central field so the heading stays easy to read.
      const centerX = Math.abs(x - 720) / 720;
      const centerY = Math.abs(y - 325) / 360;
      const fadeCenter = Math.min(1, 0.12 + centerX * 0.63 + centerY * 0.45);
      const opacity = (0.10 + noise * 0.38) * fadeCenter;

      points.push({
        x: x + ((y * 17 + layer * 13) % 5) - 2,
        y: y + ((x * 11 + layer * 7) % 5) - 2,
        opacity,
        size: layer === 0 ? 4 : 2.5
      });
    }
  }
  return points;
}

const nearParticles = makeParticles(0);
const farParticles = makeParticles(1);

export default function HeroParticles() {
  return (
    <div aria-hidden="true" className={`${styles.field} pointer-events-none absolute inset-0 overflow-hidden`}>
      <svg
        className={`${styles.layer} ${styles.layerBack}`}
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        fill="#80B6FE"
      >
        {farParticles.map((point, i) => (
          <rect key={i} x={point.x} y={point.y} width={point.size} height={point.size} opacity={point.opacity} />
        ))}
      </svg>
      <svg
        className={`${styles.layer} ${styles.layerFront}`}
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        fill="#006DFD"
      >
        {nearParticles.map((point, i) => (
          <rect key={i} x={point.x} y={point.y} width={point.size} height={point.size} opacity={point.opacity} />
        ))}
      </svg>
      <div className={styles.vignette} />
    </div>
  );
}
