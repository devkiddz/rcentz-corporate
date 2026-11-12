'use client';

import { useEffect, useRef } from 'react';
import { atmosphereSettings as settings } from '@/config/particle-atmosphere';
import {
  createParticleField,
  drawCollectiveField,
  type Particle,
  type PointerField
} from './collective-field';
import styles from './SiteAtmosphere.module.css';

/**
 * M44 R2: edge-forming collective waves in Rcentz square/blue language.
 * The Hero remains server rendered; only its transparent canvas animates.
 */
export default function SiteAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reducedMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = reducedMedia.matches;
    let width = 1;
    let height = 1;
    let particles: Particle[] = [];
    let elapsed = 0;
    let lastTimestamp = 0;
    let lastPaint = -Infinity;
    let request = 0;
    let running = false;
    let pageVisible = !document.hidden;
    let heroVisible = true;
    const pointer: PointerField = { x: -10000, y: -10000, strength: 0 };
    let pointerTargetX = -10000;
    let pointerTargetY = -10000;
    let pointerTargetStrength = 0;
    const frameInterval = 1000 / settings.frameRate;

    const computed = getComputedStyle(document.documentElement);
    const palette = {
      primary: computed.getPropertyValue(settings.primaryToken).trim() || computed.color,
      highlight: computed.getPropertyValue(settings.highlightToken).trim() || computed.color
    };
    const paletteObserver = new MutationObserver(() => {
      const next = getComputedStyle(document.documentElement);
      palette.primary = next.getPropertyValue(settings.primaryToken).trim() || next.color;
      palette.highlight = next.getPropertyValue(settings.highlightToken).trim() || next.color;
    });
    paletteObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-palette']
    });

    function paint(staticFrame = false) {
      drawCollectiveField(
        ctx!, particles, width, height,
        staticFrame ? settings.previewTimeSeconds : elapsed,
        palette, pointer, staticFrame
      );
    }

    function resize() {
      const bounds = root!.getBoundingClientRect();
      width = Math.max(1, Math.ceil(bounds.width));
      height = Math.max(1, Math.ceil(bounds.height));
      const ratio = Math.min(window.devicePixelRatio || 1, settings.maxPixelRatio);
      canvas!.width = Math.ceil(width * ratio);
      canvas!.height = Math.ceil(height * ratio);
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = createParticleField(width, height);
      paint(reduced);
    }

    function stop() {
      running = false;
      window.cancelAnimationFrame(request);
      request = 0;
      lastTimestamp = 0;
      lastPaint = -Infinity;
    }

    function tick(timestamp: number) {
      if (!running) return;
      const dt = lastTimestamp === 0 ? 0 : Math.min(
        (timestamp - lastTimestamp) / 1000, 0.08
      );
      lastTimestamp = timestamp;
      elapsed += dt;

      // Cursor movement eases into and out of the field; no harsh snapping.
      const follow = 1 - Math.exp(-dt * settings.pointerFollowRate);
      const release = 1 - Math.exp(-dt * settings.pointerReleaseRate);
      if (pointerTargetStrength > 0) {
        if (pointer.strength < 0.005) {
          pointer.x = pointerTargetX;
          pointer.y = pointerTargetY;
        }
        pointer.x += (pointerTargetX - pointer.x) * follow;
        pointer.y += (pointerTargetY - pointer.y) * follow;
      }
      pointer.strength += (pointerTargetStrength - pointer.strength) *
        (pointerTargetStrength > 0 ? follow : release);

      if (timestamp - lastPaint >= frameInterval) {
        lastPaint = timestamp;
        paint();
      }
      request = window.requestAnimationFrame(tick);
    }

    function start() {
      if (running || reduced || !pageVisible || !heroVisible) return;
      running = true;
      lastTimestamp = 0;
      request = window.requestAnimationFrame(tick);
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      const bounds = root!.getBoundingClientRect();
      pointerTargetX = event.clientX - bounds.left;
      pointerTargetY = event.clientY - bounds.top;
      pointerTargetStrength = pointerTargetX >= 0 && pointerTargetX <= bounds.width &&
        pointerTargetY >= 0 && pointerTargetY <= bounds.height ? 1 : 0;
    }

    function releasePointer() { pointerTargetStrength = 0; }
    function onVisibilityChange() {
      pageVisible = !document.hidden;
      if (pageVisible) start(); else { releasePointer(); stop(); }
    }
    function onReducedMotion(event: MediaQueryListEvent) {
      reduced = event.matches;
      if (reduced) {
        releasePointer();
        pointer.strength = 0;
        stop();
        paint(true);
      } else start();
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);
    const intersectionObserver = new IntersectionObserver(entries => {
      heroVisible = entries[0]?.isIntersecting ?? false;
      if (heroVisible) start(); else { releasePointer(); stop(); }
    }, { threshold: 0 });
    intersectionObserver.observe(root);

    start();
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', releasePointer);
    window.addEventListener('scroll', releasePointer, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMedia.addEventListener('change', onReducedMotion);

    return () => {
      stop();
      paletteObserver.disconnect();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', releasePointer);
      window.removeEventListener('scroll', releasePointer);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMedia.removeEventListener('change', onReducedMotion);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.atmosphere} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.centerShade} />
    </div>
  );
}
