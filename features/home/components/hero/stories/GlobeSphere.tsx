'use client';

import { useEffect, useRef } from 'react';

const POINTS = Array.from({ length: 560 }, (_, index) => {
  const y = 1 - (index / 559) * 2;
  const radius = Math.sqrt(1 - y * y);
  const angle = index * Math.PI * (3 - Math.sqrt(5));
  return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius };
});

export function GlobeSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let size = 0;
    let rotation = 0;
    let previousTime = 0;
    let accent = '#006DFD';
    let darkMode = false;

    function updateColors() {
      const root = document.documentElement;
      const styles = getComputedStyle(root);
      accent = styles.getPropertyValue('--theme-accent').trim() || '#006DFD';
      darkMode = root.classList.contains('dark');
    }

    function draw() {
      if (!context || size <= 0) return;
      context.clearRect(0, 0, size, size);

      const center = size / 2;
      const radius = size * 0.43;
      // Light: clean pearl-blue haze; dark: controlled sapphire depth.
      const atmosphere = context.createRadialGradient(
        center - radius * 0.17,
        center - radius * 0.2,
        radius * 0.04,
        center,
        center,
        radius * 1.08,
      );
      if (darkMode) {
        atmosphere.addColorStop(0, 'rgba(0,109,253,0.24)');
        atmosphere.addColorStop(0.52, 'rgba(0,109,253,0.095)');
        atmosphere.addColorStop(1, 'rgba(0,109,253,0)');
      } else {
        atmosphere.addColorStop(0, 'rgba(0,109,253,0.12)');
        atmosphere.addColorStop(0.57, 'rgba(0,109,253,0.045)');
        atmosphere.addColorStop(1, 'rgba(0,109,253,0)');
      }
      context.fillStyle = atmosphere;
      context.beginPath();
      context.arc(center, center, radius, 0, Math.PI * 2);
      context.fill();

      const cosine = Math.cos(rotation);
      const sine = Math.sin(rotation);

      const projected = POINTS.map(point => {
        const x = point.x * cosine + point.z * sine;
        const z = point.z * cosine - point.x * sine;
        const perspective = 1 / (1 - z * 0.16);
        return {
          x: center + x * radius * perspective,
          y: center + point.y * radius * perspective,
          z,
          depth: (z + 1) / 2,
        };
      }).sort((a, b) => a.z - b.z);

      context.fillStyle = accent;
      for (const point of projected) {
        context.globalAlpha = darkMode
          ? 0.13 + point.depth * point.depth * 0.80
          : 0.08 + point.depth * point.depth * 0.72;
        context.beginPath();
        context.arc(
          point.x, point.y,
          (0.55 + point.depth * 1.15) * size / 450,
          0, Math.PI * 2,
        );
        context.fill();
      }

      context.globalAlpha = 1;

      // Theme-aware Core: pearl surface by day, ink-blue glass at night.
      const coreRadius = size * 0.17;
      const nucleus = context.createRadialGradient(
        center - coreRadius * 0.36,
        center - coreRadius * 0.4,
        coreRadius * 0.02,
        center + coreRadius * 0.16,
        center + coreRadius * 0.2,
        coreRadius * 1.15,
      );
      if (darkMode) {
        nucleus.addColorStop(0, '#234D84');
        nucleus.addColorStop(0.26, '#173965');
        nucleus.addColorStop(0.58, '#0D284B');
        nucleus.addColorStop(0.84, '#081A34');
        nucleus.addColorStop(1, '#051226');
      } else {
        nucleus.addColorStop(0, '#FFFFFF');
        nucleus.addColorStop(0.26, '#F6FAFF');
        nucleus.addColorStop(0.57, '#E5F0FF');
        nucleus.addColorStop(0.84, '#CDDEFA');
        nucleus.addColorStop(1, '#AFCDF8');
      }

      context.save();
      context.shadowColor = darkMode
        ? 'rgba(0,109,253,0.52)'
        : 'rgba(0,109,253,0.20)';
      context.shadowBlur = size * (darkMode ? 0.054 : 0.026);
      context.fillStyle = nucleus;
      context.beginPath();
      context.arc(center, center, coreRadius, 0, Math.PI * 2);
      context.fill();
      context.restore();

      // A continuous, subtle edge; avoid the harsh partial-ring spotlight.
      const rim = context.createLinearGradient(
        center - coreRadius,
        center - coreRadius,
        center + coreRadius,
        center + coreRadius,
      );
      rim.addColorStop(0, darkMode ? '#80B6FE' : '#3D89F5');
      rim.addColorStop(0.5, darkMode ? '#2C69C0' : '#83B5F6');
      rim.addColorStop(1, darkMode ? '#0F315C' : '#D6E7FF');
      context.strokeStyle = rim;
      context.lineWidth = Math.max(1, size / 420);
      context.globalAlpha = darkMode ? 0.87 : 0.70;
      context.beginPath();
      context.arc(center, center, coreRadius, 0, Math.PI * 2);
      context.stroke();

      // Tilted ring around the nucleus.
      context.globalAlpha = darkMode ? 0.36 : 0.25;
      context.beginPath();
      context.ellipse(
        center, center,
        size * 0.29, size * 0.095,
        -0.45, 0, Math.PI * 2,
      );
      context.stroke();

      // Current travelling along that ring.
      const angle = rotation * 3;
      const ringX = Math.cos(angle) * size * 0.29;
      const ringY = Math.sin(angle) * size * 0.095;
      const tilt = -0.45;

      context.globalAlpha = 1;
      context.fillStyle = accent;
      context.beginPath();
      context.arc(
        center + ringX * Math.cos(tilt) - ringY * Math.sin(tilt),
        center + ringX * Math.sin(tilt) + ringY * Math.cos(tilt),
        Math.max(2, size * 0.006),
        0, Math.PI * 2,
      );
      context.fill();
      context.globalAlpha = 1;
    }

    function tick(time: number) {
      const elapsed = previousTime ? Math.min(time - previousTime, 50) : 0;
      previousTime = time;
      rotation += elapsed * 0.00012;
      draw();
      frame = requestAnimationFrame(tick);
    }

    function restart() {
      cancelAnimationFrame(frame);
      previousTime = 0;
      draw();
      if (!motionQuery.matches && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    }

    function resize() {
      if (!canvas || !context) return;
      size = canvas.getBoundingClientRect().width;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(size * ratio);
      canvas.height = Math.round(size * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    }

    updateColors();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      updateColors();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    motionQuery.addEventListener('change', restart);
    document.addEventListener('visibilitychange', restart);
    resize();
    restart();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      motionQuery.removeEventListener('change', restart);
      document.removeEventListener('visibilitychange', restart);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 size-full"
    />
  );
}
