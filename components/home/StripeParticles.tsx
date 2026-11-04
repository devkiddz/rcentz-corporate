'use client';

import { useEffect, useRef } from 'react';

type ParticleProps = {
  particleCount?: number;
  primaryColor?: string;
  glowColor?: string;
  speed?: number;
  interactive?: boolean;
};

export default function StripeParticles({
  particleCount = 180,
  primaryColor = '#3b82f6',
  glowColor = '#60a5fa',
  speed = 1,
  interactive = true
}: ParticleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 150
    };

    // Canvas dimensions and high DPI handling
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      // Reset the transformation instead of accumulating scale.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    class Particle {
      x = 0;
      y = 0;
      angle = 0;
      length = 0;
      maxLength = 0;
      speed = 0;
      size = 0;
      alpha = 0;
      maxAlpha = 0;

      constructor() {
        this.reset();
      }

      reset() {
        // Emit across the complete upper semicircle.
        this.angle = Math.PI + Math.random() * Math.PI;

        this.length = 0;
        this.maxLength = Math.random() * (height * 0.55) + 100;
        this.speed = (Math.random() * 1.5 + 0.5) * speed;
        this.size = Math.random() * 2.5 + 1;

        this.alpha = 0;
        this.maxAlpha = Math.random() * 0.7 + 0.3;
      }

      update() {
        this.length += this.speed;

        const fadeInPoint = this.maxLength * 0.3;
        const fadeOutPoint = this.maxLength * 0.8;

        if (this.length < fadeInPoint) {
          this.alpha = (this.length / fadeInPoint) * this.maxAlpha;
        } else if (this.length > fadeOutPoint) {
          this.alpha = (1 - (this.length - fadeOutPoint) / (this.maxLength * 0.2)) * this.maxAlpha;
        } else {
          this.alpha = this.maxAlpha;
        }

        if (this.length >= this.maxLength || this.alpha <= 0) {
          this.reset();
        }
      }

      draw(originX: number, originY: number) {
        let endX = originX + Math.cos(this.angle) * this.length;

        let endY = originY + Math.sin(this.angle) * this.length;

        // Mouse interaction
        if (interactive) {
          const dx = mouse.x - endX;
          const dy = mouse.y - endY;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (1 - distance / mouse.radius) * 15;
            const angleToMouse = Math.atan2(dy, dx);

            endX -= Math.cos(angleToMouse) * force;
            endY -= Math.sin(angleToMouse) * force;
          }
        }

        // Particle ray
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(endX, endY);

        ctx.strokeStyle = primaryColor;
        ctx.globalAlpha = this.alpha * 0.35;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Glowing particle tip
        ctx.beginPath();
        ctx.arc(endX, endY, this.size, 0, Math.PI * 2);

        ctx.fillStyle = glowColor;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: particleCount }, () => new Particle());

    // Mouse tracking
    const handlePointerMove = (event: PointerEvent) => {
      if (!interactive) return;

      const rect = canvas.getBoundingClientRect();

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    if (interactive) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerleave', handlePointerLeave);
    }

    // Observe parent dimensions
    const resizeObserver = new ResizeObserver(resizeCanvas);

    resizeObserver.observe(canvas.parentElement ?? canvas);

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const originX = width / 2;
      const originY = height + 20;

      particles.forEach(particle => {
        particle.update();
        particle.draw(originX, originY);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);

      resizeObserver.disconnect();

      if (interactive) {
        window.removeEventListener('pointermove', handlePointerMove);

        window.removeEventListener('pointerleave', handlePointerLeave);
      }
    };
  }, [particleCount, primaryColor, glowColor, speed, interactive]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />;
}
