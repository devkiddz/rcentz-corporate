/**
 * M44 R3 — progressive population within Schematic-style collective motion, expressed as Rcentz squares.
 * This config affects ONLY the existing Hero SiteAtmosphere canvas.
 */
export const atmosphereSettings = {
  primaryToken: '--theme-accent',
  highlightToken: '--theme-accent-strong',
  navyParticleFraction: 0.20,

  // Schematic-like fine lattice rather than an opaque field of large squares.
  gridSpacing: 10.2,
  maxGridPoints: 10400,
  squareSize: 2.85,
  opacity: 0.74,
  rotatingFraction: 0.22,

  // Longer, overlapping spatial waves; no repeated rectangular filling.
  initialDelaySeconds: 1.5,
  formationSeconds: 10.0,
  // New squares gradually join the cloud over this longer interval.
  populationBuildSeconds: 34.0,
  populationRevealWidth: 0.065,
  cycleSeconds: 74,
  collectiveFlowPixels: 3.0,
  previewTimeSeconds: 27,

  // Cursor creates a soft path in the cloud, then slowly releases it.
  pointerRadius: 145,
  pointerDisplacement: 22,
  pointerFade: 0.91,
  pointerFollowRate: 12,
  pointerReleaseRate: 3.3,

  frameRate: 20,
  maxPixelRatio: 1.35
} as const;
