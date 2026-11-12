'use client';

import { useEffect, useRef } from 'react';
import { atmosphereSettings as settings } from '@/config/particle-atmosphere';
import styles from './SiteAtmosphere.module.css';

type BatchSquare = {
  enabled: boolean;
  birth: number;
  fadeDelay: number;
};

type Dot = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  highlight: boolean;
  rotates: boolean;
  baseAngle: number;
  spinRate: number;
  batches: BatchSquare[];
};

type BatchClock = { age: number; active: boolean };

const BATCHES = 4;
const TOTAL_PERIOD = BATCHES * settings.batchIntervalSeconds;
const LIFETIME = settings.growthSeconds +
  settings.fullClusterHoldSeconds + settings.fadeSeconds;

function clamp(value: number, low: number, high: number) {
  return Math.min(high, Math.max(low, value));
}

function smoothstep(a: number, b: number, value: number) {
  const x = clamp((value - a) / (b - a), 0, 1);
  return x * x * (3 - 2 * x);
}

function hash(x: number, y: number, seed: number) {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return n - Math.floor(n);
}

/**
 * Fixed-location silhouette: a soft, slightly angular organic patch.
 * Four phases populate the same grid instead of expanding the bounds.
 * All noise is deterministic to avoid re-randomising on every frame.
 */
function createDots(width: number, height: number): Dot[] {
  const mobile = width < 700;
  const centerX = width * (mobile ? settings.mobileAnchorX : settings.clusterAnchorX);
  const centerY = height * (mobile ? settings.mobileAnchorY : settings.clusterAnchorY);
  const rx = Math.min(settings.clusterRadiusX, width *
    (mobile ? settings.mobileWidthFraction : settings.clusterWidthFraction));
  const ry = Math.min(settings.clusterRadiusY, height *
    (mobile ? settings.mobileHeightFraction : settings.clusterHeightFraction));

  // Work only within the formation's bounding box (never full viewport).
  const boundsX1 = Math.max(0, centerX - rx * 1.12);
  const boundsX2 = Math.min(width, centerX + rx * 1.12);
  const boundsY1 = Math.max(0, centerY - ry * 1.12);
  const boundsY2 = Math.min(height, centerY + ry * 1.12);
  const area = Math.max(1, (boundsX2 - boundsX1) * (boundsY2 - boundsY1));
  const gap = Math.max(settings.gridSpacing, Math.sqrt(area / settings.maxGridPoints));
  const cols = Math.ceil((boundsX2 - boundsX1) / gap);
  const rows = Math.ceil((boundsY2 - boundsY1) / gap);
  const dots: Dot[] = [];

  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      const x = boundsX1 + (col + 0.5) * gap;
      const y = boundsY1 + (row + 0.5) * gap;
      if (x >= boundsX2 || y >= boundsY2) continue;

      const nx = (x - centerX) / rx;
      const ny = (y - centerY) / ry;
      const angle = Math.atan2(ny, nx);
      const radial = Math.hypot(nx, ny);

      // The border has a few lobes, but never travels across the canvas.
      const contour = 0.88 + 0.09 * Math.sin(angle * 3 + 0.4) +
        0.07 * Math.sin(angle * 5 - 0.7);
      const position = radial / contour;
      if (position > 1.05) continue;

      // Dense, nearly solid central mass; feathered square outline.
      const edge = 1 - smoothstep(1 - settings.clusterSoftEdge, 1.04, position);
      const centrality = 1 - smoothstep(0.32, 1.0, position);
      const population = settings.density * (0.24 + 0.76 * edge);
      if (hash(col, row, 41) > population) continue;

      const batches: BatchSquare[] = Array.from({ length: BATCHES }, (_, index) => {
        // More births toward the centre, then gradual edge filling.
        // Per-batch seed means the same area fills in different patterns.
        const jitter = hash(col, row, 90 + index * 17);
        const localDistance = clamp(position / 1.05, 0, 1);
        const fraction = clamp(0.06 + 0.46 * Math.pow(localDistance, 0.88) +
          0.46 * jitter, 0.02, 1);
        const densityGate = 0.84 + 0.15 * centrality +
          0.01 * hash(col, row, 112 + index * 17);
        return {
          enabled: hash(col, row, 120 + index * 29) <= densityGate,
          birth: settings.growthSeconds * fraction,
          fadeDelay: hash(col, row, 222 + index * 9) * settings.fadeSeconds * 0.30
        };
      });

      dots.push({
        x,
        y,
        size: settings.squareSize * (0.82 + 0.28 * hash(col, row, 55)),
        opacity: settings.overallOpacity * (0.57 + 0.43 * edge) *
          (0.80 + 0.20 * hash(col, row, 56)),
        highlight: hash(col, row, 57) > 0.94,
        rotates: hash(col, row, 59) < settings.rotatingFraction,
        baseAngle: (hash(col, row, 61) * 2 - 1) *
          settings.randomRotationDegrees * Math.PI / 180,
        spinRate: (hash(col, row, 63) * 2 - 1) * settings.squareRotationSpeed,
        batches
      });
    }
  }
  return dots;
}

function getClocks(seconds: number): BatchClock[] {
  const adjusted = seconds - settings.initialDelaySeconds;
  return Array.from({ length: BATCHES }, (_, index) => {
    const started = adjusted - index * settings.batchIntervalSeconds;
    if (started < 0) return { age: 0, active: false };
    const age = started % TOTAL_PERIOD;
    return { age, active: age <= LIFETIME };
  });
}

export default function SiteAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    // Capture a non-null element for nested animation callbacks.
    const rootElement = root;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = media.matches;
    let width = 1;
    let height = 1;
    let dots: Dot[] = [];
    let elapsed = 0;
    let previousTimestamp = 0;
    let previousDraw = -Infinity;
    let frame = 0;
    let active = false;
    let visible = !document.hidden;
    let inView = true;
    let pointerActive = false;
    let pointerX = -10000;
    let pointerY = -10000;
    const interval = 1000 / settings.frameRate;

    function draw(seconds: number) {
      const ctx = context!;
      ctx.globalAlpha = 1;
      ctx.fillStyle = settings.backgroundColor;
      ctx.fillRect(0, 0, width, height);
      const clocks = getClocks(seconds);
      // One subtle whole-shape sway; squares each have independent rotation.
      const sway = Math.sin(seconds * settings.clusterSwaySpeed) *
        settings.clusterSwayDegrees * Math.PI / 180;
      const cosSway = Math.cos(sway);
      const sinSway = Math.sin(sway);
      const mobile = width < 700;
      const centerX = width * (mobile ? settings.mobileAnchorX : settings.clusterAnchorX);
      const centerY = height * (mobile ? settings.mobileAnchorY : settings.clusterAnchorY);

      for (const dot of dots) {
        // Merge overlapping populations on the same square rather than
        // repeatedly overdrawing duplicate rectangles in one location.
        let hidden = 1;
        let maturity = 0;
        for (let i = 0; i < BATCHES; i++) {
          if (!clocks[i].active) continue;
          const wave = dot.batches[i];
          if (!wave.enabled || clocks[i].age < wave.birth) continue;
          const age = clocks[i].age;
          const reveal = smoothstep(wave.birth, wave.birth +
            settings.individualRevealSeconds, age);
          const fadeStart = settings.growthSeconds +
            settings.fullClusterHoldSeconds + wave.fadeDelay;
          const fade = 1 - smoothstep(fadeStart,
            fadeStart + settings.fadeSeconds * 0.7, age);
          const contribution = reveal * fade;
          hidden *= 1 - contribution * 0.89;
          maturity = Math.max(maturity, reveal);
        }

        let alpha = dot.opacity * (1 - hidden);
        if (alpha < 0.012) continue;

        // Small, anchored shape sway: gives a sense of turning without
        // sweeping pixels across the page or relocating the formation.
        const localX = dot.x - centerX;
        const localY = dot.y - centerY;
        let x = centerX + localX * cosSway - localY * sinSway;
        let y = centerY + localX * sinSway + localY * cosSway;
        if (pointerActive) {
          const dx = x - pointerX;
          const dy = y - pointerY;
          const distance = Math.hypot(dx, dy);
          if (distance < settings.pointerRadius) {
            const influence = 1 - distance / settings.pointerRadius;
            const push = settings.pointerDisplacement * influence * influence;
            if (distance > 0.01) {
              x += (dx / distance) * push;
              y += (dy / distance) * push;
            }
            alpha *= 1 - settings.pointerFade * influence * influence;
          }
        }
        if (alpha < 0.012) continue;

        const size = dot.size * (0.80 + 0.20 * maturity);
        ctx.globalAlpha = clamp(alpha, 0, 1);
        ctx.fillStyle = dot.highlight ? settings.highlightColor : settings.primaryColor;
        if (dot.rotates) {
          // Only a configurable fraction need transform work each frame.
          // This stays cheap compared with the old glow/physics animation.
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(dot.baseAngle + seconds * dot.spinRate);
          ctx.fillRect(-size * 0.5, -size * 0.5, size, size);
          ctx.restore();
        } else {
          ctx.fillRect(x - size * 0.5, y - size * 0.5, size, size);
        }
      }
      ctx.globalAlpha = 1;
    }

    function resize() {
      const bounds = rootElement.getBoundingClientRect();
      width = Math.max(1, Math.ceil(bounds.width));
      height = Math.max(1, Math.ceil(bounds.height));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, settings.maxPixelRatio);
      canvas!.width = Math.round(width * pixelRatio);
      canvas!.height = Math.round(height * pixelRatio);
      context!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      dots = createDots(width, height);
      draw(reducedMotion ? settings.initialDelaySeconds +
        settings.growthSeconds + settings.fullClusterHoldSeconds * 0.5 : elapsed);
    }

    function stop() {
      active = false;
      window.cancelAnimationFrame(frame);
      frame = 0;
      previousTimestamp = 0;
      previousDraw = -Infinity;
    }

    function render(timestamp: number) {
      if (!active) return;
      const dt = previousTimestamp === 0 ? 0 :
        Math.min((timestamp - previousTimestamp) / 1000, 0.08);
      previousTimestamp = timestamp;
      elapsed += dt;
      if (timestamp - previousDraw >= interval) {
        previousDraw = timestamp;
        draw(elapsed);
      }
      frame = window.requestAnimationFrame(render);
    }

    function start() {
      if (active || reducedMotion || !visible || !inView) return;
      active = true;
      previousTimestamp = 0;
      previousDraw = -Infinity;
      frame = window.requestAnimationFrame(render);
    }

    function handlePointer(event: PointerEvent) {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      // Mouse coordinates must be relative to the hero, not the viewport.
      const bounds = rootElement.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
      pointerActive = pointerX >= 0 && pointerY >= 0 &&
        pointerX <= bounds.width && pointerY <= bounds.height;
    }

    function clearPointer() { pointerActive = false; }
    function handleMouseOut(event: MouseEvent) {
      if (!event.relatedTarget) clearPointer();
    }
    function handleVisibility() {
      visible = !document.hidden;
      if (visible && inView) start(); else stop();
    }
    function handleReducedMotion(event: MediaQueryListEvent) {
      reducedMotion = event.matches;
      if (reducedMotion) {
        stop();
        clearPointer();
        draw(settings.initialDelaySeconds + settings.growthSeconds +
          settings.fullClusterHoldSeconds * 0.5);
      } else start();
    }

    resize();
    // Keep the canvas crisp when hero geometry changes independently of the window.
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);

    // No background render loop after the hero has scrolled out of view.
    const intersectionObserver = new IntersectionObserver(entries => {
      inView = entries[0]?.isIntersecting ?? false;
      if (visible && inView) start(); else stop();
    }, { threshold: 0 });
    intersectionObserver.observe(root);

    start();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('blur', clearPointer);
    document.addEventListener('visibilitychange', handleVisibility);
    media.addEventListener('change', handleReducedMotion);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('blur', clearPointer);
      document.removeEventListener('visibilitychange', handleVisibility);
      media.removeEventListener('change', handleReducedMotion);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.atmosphere} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.centerShade} />
    </div>
  );
}
