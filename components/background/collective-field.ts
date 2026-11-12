import { atmosphereSettings as settings } from '../../config/particle-atmosphere';

export type Particle = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  reveal: number;
  // Stable stagger threshold: controls when this square joins the cloud.
  admission: number;
  rotation: number;
  dark: boolean;
  rotates: boolean;
};
export type PointerField = { x: number; y: number; strength: number };
export type FieldPalette = { primary: string; highlight: string };

type Wave = {
  x: number;
  y: number;
  rx: number;
  ry: number;
  power: number;
};

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n));
}
function smoothstep(a: number, b: number, n: number) {
  const p = clamp((n - a) / (b - a));
  return p * p * (3 - 2 * p);
}
function hash(x: number, y: number, seed: number) {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return n - Math.floor(n);
}

/** A fixed, evenly spaced set of small squares. Motion belongs to the cloud,
 * not to individual random trajectories. */
export function createParticleField(width: number, height: number): Particle[] {
  const area = width * height;
  const step = Math.max(settings.gridSpacing, Math.sqrt(area / settings.maxGridPoints));
  const points: Particle[] = [];
  const cols = Math.ceil(width / step);
  const rows = Math.ceil(height / step);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Keep a clean regular lattice; only the wavefront is organic.
      const x = (col + 0.5) * step;
      const y = (row + 0.5) * step;
      if (x > width || y > height || hash(col, row, 31) > 0.90) continue;
      points.push({
        x, y,
        size: settings.squareSize * (0.74 + 0.5 * hash(col, row, 33)),
        alpha: settings.opacity * (0.64 + 0.36 * hash(col, row, 35)),
        reveal: hash(col, row, 37),
        admission: hash(col, row, 53),
        rotation: (hash(col, row, 39) - 0.5) * 0.45,
        dark: hash(col, row, 41) < settings.navyParticleFraction,
        rotates: hash(col, row, 43) < settings.rotatingFraction
      });
    }
  }
  return points;
}

/**
 * Four large, slowly changing waves enter from around the *edges* of Hero.
 * Their positions and growth cycle as a unified atmosphere. Unlike M44 R1,
 * the middle is deliberately NOT covered by three overlapping ellipses.
 */
function wavesAt(seconds: number, width: number, height: number, frozen: boolean): Wave[] {
  const time = frozen ? settings.previewTimeSeconds : seconds;
  const cycle = time * 2 * Math.PI / settings.cycleSeconds;
  const entrance = frozen ? 1 : smoothstep(
    settings.initialDelaySeconds,
    settings.initialDelaySeconds + settings.formationSeconds,
    seconds
  );
  const locations = [
    // Left upper wave: the first region to build and slowly move downward.
    { x: -0.02 + 0.10 * Math.sin(cycle * 0.85 + 0.6), y: 0.38 + 0.16 * Math.cos(cycle * 0.76), rx: 0.38, ry: 0.52, phase: 0.1, floor: 0.17 },
    // A partially connected front along the top edge.
    { x: 0.31 + 0.11 * Math.sin(cycle * 0.87 + 0.9), y: -0.06 + 0.10 * Math.sin(cycle * 0.72), rx: 0.32, ry: 0.35, phase: 1.4, floor: 0.08 },
    // Right edge drifts towards the middle before receding.
    { x: 1.05 - 0.11 * Math.sin(cycle * 0.89 + 1.1), y: 0.54 + 0.15 * Math.sin(cycle * 0.67 + 0.3), rx: 0.37, ry: 0.49, phase: 3.9, floor: 0.10 },
    // A bottom wave rises as the left/top cloud thins.
    { x: 0.50 + 0.16 * Math.sin(cycle * 0.76 + 2.2), y: 1.08 - 0.13 * Math.cos(cycle * 0.82), rx: 0.39, ry: 0.37, phase: 4.95, floor: 0.05 }
  ] as const;
  return locations.map((wave, i) => {
    // Slow breathing, separate phases. Patches can almost disappear before
    // a different region emerges, rather than filling the entire surface.
    const breath = (1 + Math.cos(cycle - wave.phase)) * 0.5;
    const power = (wave.floor + (1 - wave.floor) * smoothstep(0.18, 0.90, breath)) * entrance;
    const wobble = 1 + 0.10 * Math.sin(cycle * 1.13 + i * 1.8);
    return { x: wave.x * width, y: wave.y * height, rx: wave.rx * width * wobble,
      ry: wave.ry * height / wobble, power };
  });
}

/** Sample only a spatially coherent density function at each square's location.
 * The deformed wave boundaries and gradual cross-fades create collective motion.
 */
export function drawCollectiveField(
  ctx: CanvasRenderingContext2D,
  particles: readonly Particle[],
  width: number,
  height: number,
  seconds: number,
  palette: FieldPalette,
  pointer: PointerField,
  frozen = false
) {
  ctx.globalAlpha = 1;
  ctx.clearRect(0, 0, width, height);
  const waves = wavesAt(seconds, width, height, frozen);
  const time = frozen ? settings.previewTimeSeconds : seconds;
  // The R2 cloud used to reach nearly full population within ~9 seconds.
  // Here the active population expands gradually over 34 seconds. Cloud
  // boundaries still determine WHERE squares can appear; this gate decides
  // WHEN each eligible square joins, without spawning/randomizing each frame.
  const population = frozen ? 1 : smoothstep(
    settings.initialDelaySeconds,
    settings.initialDelaySeconds + settings.populationBuildSeconds,
    seconds
  );
  for (const p of particles) {
    const admitted = smoothstep(
      p.admission - settings.populationRevealWidth,
      p.admission + settings.populationRevealWidth,
      population
    );
    if (admitted < 0.02) continue;
    // A broad, common fluid distortion creates uneven edges and bands.
    const warpX = p.x + width * 0.025 * Math.sin(p.y * 0.014 + time * 0.035) +
      width * 0.009 * Math.sin(p.y * 0.025 - time * 0.052);
    const warpY = p.y + height * 0.046 * Math.sin(p.x * 0.009 - time * 0.031);

    let clear = 1;
    for (const wave of waves) {
      const dx = (warpX - wave.x) / wave.rx;
      const dy = (warpY - wave.y) / wave.ry;
      const distance = Math.hypot(dx, dy);
      const local = 1 - smoothstep(0.25, 1.13, distance);
      clear *= 1 - local * wave.power;
    }
    const field = 1 - clear;
    // Particles in the same region change together; tiny deterministic
    // threshold differences keep the boundary granular, not solid.
    const visibility = smoothstep(0.09 + p.reveal * 0.16, 0.51 + p.reveal * 0.18, field);
    if (visibility < 0.02) continue;

    // Text remains the focus: softly protect the central headline zone,
    // while still permitting a little cloud through at the margins.
    const cx = (p.x - width * 0.50) / (width * 0.36);
    const cy = (p.y - height * 0.47) / (height * 0.37);
    const central = 1 - smoothstep(0.33, 1.05, Math.hypot(cx, cy));
    let alpha = p.alpha * visibility * admitted * (0.47 + 0.53 * field) *
      (1 - central * 0.89);
    if (alpha < 0.014) continue;

    // Collective flow is small and shared, not independent drifting.
    const dx = frozen ? 0 : settings.collectiveFlowPixels * Math.sin(time * 0.07 + p.y * 0.006);
    const dy = frozen ? 0 : settings.collectiveFlowPixels * 0.58 * Math.sin(time * 0.083 - p.x * 0.005);
    let x = p.x + dx;
    let y = p.y + dy;

    // Cursor interaction is *additive*: repel/fade locally and recover.
    if (!frozen && pointer.strength > 0.005) {
      const deltaX = x - pointer.x;
      const deltaY = y - pointer.y;
      const distance = Math.hypot(deltaX, deltaY);
      if (distance < settings.pointerRadius) {
        const influence = pointer.strength * (1 - smoothstep(0, settings.pointerRadius, distance));
        if (distance > 0.01) {
          x += deltaX / distance * influence * settings.pointerDisplacement;
          y += deltaY / distance * influence * settings.pointerDisplacement;
        }
        alpha *= 1 - influence * settings.pointerFade;
      }
    }
    if (alpha < 0.014) continue;
    const size = p.size * (0.86 + visibility * 0.14);
    ctx.globalAlpha = clamp(alpha);
    ctx.fillStyle = p.dark ? palette.highlight : palette.primary;
    if (!frozen && p.rotates) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(p.rotation + Math.sin(time * 0.082 + p.rotation) * 0.11);
      ctx.fillRect(-size / 2, -size / 2, size, size);
      ctx.restore();
    } else {
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    }
  }
  ctx.globalAlpha = 1;
}
