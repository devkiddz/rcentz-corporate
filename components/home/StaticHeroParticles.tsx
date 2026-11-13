import { memo } from 'react';
import styles from './AboutIllustration.module.css';

type Square = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  navy: boolean;
};

/**
 * Integer-only hash: reproducible across server and browser engines.
 * Math.sin()-based pseudo-random values can differ by tiny amounts across
 * platforms, which causes React hydration warnings on generated SVG props.
 */
function noise(x: number, y: number, seed: number): number {
  let value =
    Math.imul(x + 1, 0x1e35a7bd) ^
    Math.imul(y + 1, 0x94d049bb) ^
    Math.imul(seed + 1, 0x85ebca6b);
  value ^= value >>> 16;
  value = Math.imul(value, 0x7feb352d);
  value ^= value >>> 15;
  value = Math.imul(value, 0x846ca68b);
  value ^= value >>> 16;
  return (value >>> 0) / 0x100000000;
}

/** Keep SVG numeric attributes stable across rendering environments. */
function precision(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function createStaticSquares(): Square[] {
  const squares: Square[] = [];
  const centerX = 380;
  const centerY = 278;

  for (let row = 0; row < 35; row++) {
    for (let column = 0; column < 47; column++) {
      const x = 8 + column * 16;
      const y = 8 + row * 16;
      const dx = (x - centerX) / 355;
      const dy = (y - centerY) / 235;
      const angle = Math.atan2(dy, dx);
      const contour = .91 + .08 * Math.sin(angle * 3 + .4) +
        .07 * Math.sin(angle * 5 - .7);
      const radial = precision(Math.hypot(dx, dy) / contour);
      if (radial > 1.04 || noise(column, row, 13) > .63) continue;

      // The middle is mostly covered by the product cards; the surrounding
      // points give the illustration the same square-dust silhouette as Hero.
      const softness = Math.max(0, Math.min(1, (1.05 - radial) / .30));
      const size = precision(3.3 + 1.4 * noise(column, row, 18));
      squares.push({
        x,
        y,
        size,
        opacity: precision((0.25 + 0.6 * softness) * (.6 + .4 * noise(column, row, 22))),
        rotation: precision((noise(column, row, 20) - .5) * 78),
        navy: noise(column, row, 31) > .77
      });
    }
  }
  return squares;
}

const squares = createStaticSquares();

/** Static SVG; no timers, requestAnimationFrame, or CSS animation. */
function StaticHeroParticles() {
  return (
    <svg
      viewBox="0 0 760 560"
      preserveAspectRatio="xMidYMid slice"
      className={styles.staticParticles}
      aria-hidden="true"
      focusable="false">
      {squares.map((square, index) => (
        <rect
          key={index}
          x={square.x}
          y={square.y}
          width={square.size}
          height={square.size}
          opacity={square.opacity}
          fill={square.navy ? 'var(--foreground)' : 'var(--theme-accent)'}
          transform={`rotate(${square.rotation} ${square.x + square.size / 2} ${square.y + square.size / 2})`}
        />
      ))}
    </svg>
  );
}

export default memo(StaticHeroParticles);
