import { useEffect, useRef } from "react";

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  color: string;
  sparkType: "star" | "dot" | "ray";
  rotation: number;
  vRot: number;
}

const SPARK_COLORS = [
  "#38bdf8", // Sky Electric Blue
  "#60a5fa", // Bright Sapphire
  "#818cf8", // Indigo Blue
  "#a855f7", // Vibrant Purple
  "#38f8d4", // Glowing Cyan
  "#ffffff", // Diamond White Sparkle
];

export function SparklerCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Disable on mobile/touchscreen devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let isMouseDown = false;

    const particles: SparkleParticle[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const createParticle = (x: number, y: number, isBurst = false) => {
      const angle = isBurst ? Math.random() * Math.PI * 2 : Math.random() * Math.PI * 2;
      const speed = isBurst ? Math.random() * 4 + 2 : Math.random() * 2 + 0.5;
      const life = isBurst ? Math.random() * 35 + 25 : Math.random() * 25 + 15;
      const color = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];
      const sparkType = Math.random() > 0.4 ? "star" : Math.random() > 0.5 ? "ray" : "dot";

      particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.8,
        vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3.5 + 1.2,
        alpha: 1,
        maxAlpha: Math.random() * 0.4 + 0.6,
        life: 0,
        maxLife: life,
        color,
        sparkType,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dist = Math.hypot(mouseX - prevMouseX, mouseY - prevMouseY);
      const count = Math.min(Math.floor(dist / 4) + 1, 6);

      for (let i = 0; i < count; i++) {
        const interpX = prevMouseX + (mouseX - prevMouseX) * (i / count);
        const interpY = prevMouseY + (mouseY - prevMouseY) * (i / count);
        createParticle(interpX, interpY, false);
      }

      prevMouseX = mouseX;
      prevMouseY = mouseY;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      // Burst explosion on click
      for (let i = 0; i < 28; i++) {
        createParticle(e.clientX, e.clientY, true);
      }
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    // Draw 4-point star for sparkler effect
    const drawStar = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
      rotation: number
    ) => {
      let rot = (Math.PI / 2) * 3 + rotation;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      c.beginPath();
      c.moveTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        c.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        c.lineTo(x, y);
        rot += step;
      }
      c.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
      c.closePath();
      c.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Ambient sparkler glow around mouse
      if (mouseX && mouseY) {
        const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 35);
        glow.addColorStop(0, "rgba(56, 189, 248, 0.25)");
        glow.addColorStop(0.5, "rgba(96, 165, 250, 0.1)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 35, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render & update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95; // Drag friction
        p.vy *= 0.95;
        p.vy += 0.08; // Subtle sparkler gravity
        p.rotation += p.vRot;

        const progress = p.life / p.maxLife;
        p.alpha = p.maxAlpha * (1 - progress);

        if (p.life >= p.maxLife || p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;

        if (p.sparkType === "star") {
          drawStar(ctx, p.x, p.y, 4, p.size * 2, p.size * 0.4, p.rotation);
        } else if (p.sparkType === "ray") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();

          // Ray streak
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x - p.vx * 3, p.y - p.vy * 3);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[99999]"
      aria-hidden="true"
    />
  );
}
