/**
 * Rcentz site-wide atmospheric formation — M19.
 * Tuned for a larger, denser flood of independently rotating squares.
 * Nothing in the hero's markup, navigation, or layout changes.
 */
export const atmosphereSettings = {
  primaryToken: '--blue-500',
  highlightToken: '--blue-900',
  navyParticleFraction: 0.24,

  // Expanded but bounded silhouette, measured relative to the viewport.
  clusterAnchorX: 0.43,
  clusterAnchorY: 0.63,
  mobileAnchorX: 0.50,
  mobileAnchorY: 0.67,
  clusterRadiusX: 575,
  clusterRadiusY: 345,
  clusterWidthFraction: 0.40,
  clusterHeightFraction: 0.39,
  mobileWidthFraction: 0.48,
  mobileHeightFraction: 0.41,

  // Denser visual field without drawing on the entire screen.
  gridSpacing: 13,
  squareSize: 4.5,
  density: 0.97,
  overallOpacity: 0.82,
  maxGridPoints: 3150,
  clusterSoftEdge: 0.25,

  // Random, slow individual rotation plus subtle whole-cluster sway.
  rotatingFraction: 0.66,
  randomRotationDegrees: 44,
  squareRotationSpeed: 0.18, // radians/second
  clusterSwayDegrees: 1.1,
  clusterSwaySpeed: 0.17,

  // Keep M18's progressive population growth + overlapping four batches.
  initialDelaySeconds: 2.0,
  batchIntervalSeconds: 10.0,
  growthSeconds: 7.8,
  fullClusterHoldSeconds: 2.6,
  fadeSeconds: 5.2,
  individualRevealSeconds: 0.62,

  // Performance & cursor-clearing effect.
  frameRate: 18,
  maxPixelRatio: 1.25,
  pointerRadius: 150,
  pointerDisplacement: 9,
  pointerFade: 0.93
} as const;
