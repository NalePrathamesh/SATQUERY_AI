import { useEffect, useRef } from 'react';

/**
 * Animated wireframe Earth with orbiting satellites.
 * Pure SVG/CSS — no external dependencies.
 */
export function GlobeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Starfield on canvas for performance
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars: { x: number; y: number; r: number; o: number; s: number }[] = [];
    const starCount = 150;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,
        o: Math.random() * 0.5 + 0.2,
        s: Math.random() * 0.02 + 0.005,
      });
    }

    let raf = 0;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.016;

      for (const star of stars) {
        const twinkle = Math.sin(t * star.s * 60 + star.x) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.o * twinkle})`;
        ctx.fill();
      }

      // Occasional shooting star
      if (Math.random() < 0.003) {
        const sx = Math.random() * w;
        const sy = Math.random() * h * 0.5;
        const len = 80 + Math.random() * 60;
        const grad = ctx.createLinearGradient(sx, sy, sx + len, sy + len * 0.4);
        grad.addColorStop(0, 'rgba(255,255,255,0.8)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + len, sy + len * 0.4);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Starfield canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Wireframe Earth — centered, large */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative" style={{ width: '600px', height: '600px' }}>
          {/* Outer glow */}
          <div
            className="absolute inset-0 rounded-full animate-glow-pulse"
            style={{
              boxShadow: '0 0 120px 40px rgba(255,255,255,0.06)',
            }}
          />

          {/* Globe SVG */}
          <svg
            viewBox="0 0 600 600"
            className="absolute inset-0 animate-spin-slow"
            style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.15))' }}
          >
            {/* Latitude lines */}
            {[-60, -40, -20, 0, 20, 40, 60].map((lat) => {
              const y = 300 + lat * 2.5;
              const rx = 290 * Math.cos((lat * Math.PI) / 180);
              return (
                <ellipse
                  key={`lat-${lat}`}
                  cx="300"
                  cy={y}
                  rx={Math.max(rx, 10)}
                  ry={rx * 0.18 + 4}
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Longitude lines */}
            {[-80, -60, -40, -20, 0, 20, 40, 60, 80].map((lng) => {
              const rx = 290 * Math.abs(Math.cos((lng * Math.PI) / 180));
              return (
                <ellipse
                  key={`lng-${lng}`}
                  cx="300"
                  cy="300"
                  rx={Math.max(rx, 10)}
                  ry="290"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Outer circle */}
            <circle cx="300" cy="300" r="290" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

            {/* Continent dots — abstract landmasses */}
            {[
              { cx: 220, cy: 250 }, { cx: 250, cy: 240 }, { cx: 200, cy: 270 },
              { cx: 280, cy: 260 }, { cx: 230, cy: 280 }, { cx: 310, cy: 250 },
              { cx: 340, cy: 270 }, { cx: 370, cy: 240 }, { cx: 390, cy: 270 },
              { cx: 180, cy: 320 }, { cx: 210, cy: 340 }, { cx: 250, cy: 330 },
              { cx: 300, cy: 350 }, { cx: 350, cy: 340 }, { cx: 380, cy: 320 },
              { cx: 400, cy: 350 }, { cx: 270, cy: 380 }, { cx: 320, cy: 390 },
              { cx: 230, cy: 200 }, { cx: 350, cy: 200 },
            ].map((p, i) => (
              <circle
                key={`land-${i}`}
                cx={p.cx}
                cy={p.cy}
                r={Math.random() * 3 + 1.5}
                fill="rgba(255,255,255,0.25)"
              />
            ))}
          </svg>

          {/* Orbit rings with satellites */}
          {/* Orbit 1 — horizontal */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative rounded-full"
              style={{ width: '700px', height: '700px', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  width: '8px',
                  height: '8px',
                  marginLeft: '-4px',
                  marginTop: '-4px',
                  ['--orbit-radius' as string]: '350px',
                  animation: 'orbit 25s linear infinite',
                }}
              >
                <Satellite />
              </div>
            </div>
          </div>

          {/* Orbit 2 — tilted */}
          <div className="absolute inset-0 flex items-center justify-center animate-spin-reverse" style={{ transform: 'rotate(35deg)' }}>
            <div
              className="relative rounded-full"
              style={{ width: '800px', height: '800px', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  width: '6px',
                  height: '6px',
                  marginLeft: '-3px',
                  marginTop: '-3px',
                  ['--orbit-radius' as string]: '400px',
                  animation: 'orbit 40s linear infinite',
                }}
              >
                <Satellite small />
              </div>
            </div>
          </div>

          {/* Orbit 3 — steeper tilt */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'rotate(-20deg)' }}>
            <div
              className="relative rounded-full"
              style={{ width: '900px', height: '900px', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  width: '7px',
                  height: '7px',
                  marginLeft: '-3.5px',
                  marginTop: '-3.5px',
                  ['--orbit-radius' as string]: '450px',
                  animation: 'orbit 55s linear infinite',
                }}
              >
                <Satellite />
              </div>
            </div>
          </div>

          {/* Pulse rings emanating from globe */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full border border-white/20"
              style={{
                width: '600px',
                height: '600px',
                animation: 'pulse-ring 4s ease-out infinite',
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full border border-white/15"
              style={{
                width: '600px',
                height: '600px',
                animation: 'pulse-ring 4s ease-out infinite',
                animationDelay: '2s',
              }}
            />
          </div>
        </div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.7) 80%, #050505 100%)',
        }}
      />
    </div>
  );
}

function Satellite({ small = false }: { small?: boolean }) {
  const size = small ? 6 : 8;
  return (
    <svg width={size * 2.5} height={size * 2.5} viewBox="0 0 20 20" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.6))' }}>
      {/* Solar panels */}
      <rect x="0" y="8" width="6" height="4" fill="none" stroke="white" strokeWidth="0.8" />
      <rect x="14" y="8" width="6" height="4" fill="none" stroke="white" strokeWidth="0.8" />
      {/* Body */}
      <rect x="6" y="7" width="8" height="6" fill="white" />
      {/* Antenna */}
      <line x1="10" y1="7" x2="10" y2="3" stroke="white" strokeWidth="0.8" />
      <circle cx="10" cy="2.5" r="1" fill="white" />
    </svg>
  );
}
