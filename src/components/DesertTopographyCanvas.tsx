import React, { useEffect, useRef } from 'react';

interface DesertTopographyCanvasProps {
  theme: 'dark' | 'light';
}

interface DustParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  oscillationSpeed: number;
  phase: number;
}

export const DesertTopographyCanvas: React.FC<DesertTopographyCanvasProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create desert wind dust particles
    const particleCount = Math.min(85, Math.floor((width * height) / 16000));
    const particles: DustParticle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 1 + Math.random() * 2.2,
      vx: 0.35 + Math.random() * 0.9,
      vy: -0.15 + Math.random() * 0.3,
      alpha: 0.25 + Math.random() * 0.55,
      oscillationSpeed: 0.008 + Math.random() * 0.015,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Particle color based on desert theme
      const baseRgb = theme === 'dark' ? '245, 158, 11' : '140, 59, 12';
      const secondaryRgb = theme === 'dark' ? '223, 211, 195' : '82, 71, 61';

      particles.forEach((p, idx) => {
        p.phase += p.oscillationSpeed;
        p.x += p.vx;
        p.y += p.vy + Math.sin(p.phase) * 0.22;

        if (p.x > width + 10) {
          p.x = -10;
          p.y = Math.random() * height;
        }
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const color = idx % 3 === 0 ? baseRgb : secondaryRgb;
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.fill();

        // Subtle wind streak tail on larger grains
        if (p.radius > 2.1) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 11, p.y - p.vy * 4);
          ctx.strokeStyle = `rgba(${color}, ${p.alpha * 0.35})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Topographic Cartographic SVG Layer */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="tactical-desert-grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="var(--topo-grid)"
              strokeWidth="1"
            />
            <circle cx="80" cy="80" r="1.2" fill="var(--topo-line)" />
          </pattern>
        </defs>

        {/* Cartographic Coordinate Grid */}
        <rect width="1600" height="1000" fill="url(#tactical-desert-grid)" />

        {/* Desert Elevation Contour Lines — West Ridge */}
        <g fill="none" stroke="var(--topo-line)" strokeWidth="1.25">
          <path d="M -80 180 C 140 120, 320 260, 480 190 C 640 120, 740 40, 920 -40" />
          <path d="M -80 240 C 160 175, 350 320, 530 245 C 710 170, 810 85, 1020 -40" strokeDasharray="8 6" />
          <path d="M -80 310 C 190 235, 390 390, 590 305 C 790 220, 890 140, 1140 -40" />
          <path d="M -80 390 C 210 305, 430 460, 660 370 C 890 280, 1000 195, 1280 -40" />

          {/* East Basin & Mesa Contours */}
          <path d="M 380 1040 C 560 880, 760 920, 960 810 C 1160 700, 1360 750, 1680 580" />
          <path d="M 480 1040 C 650 910, 830 945, 1020 845 C 1210 745, 1400 790, 1680 640" strokeDasharray="5 5" />
          <path d="M 600 1040 C 750 940, 910 970, 1090 885 C 1270 800, 1450 830, 1680 710" />
          <path d="M 740 1040 C 870 965, 1010 990, 1170 925 C 1330 860, 1490 880, 1680 785" />

          {/* Concentric Mesa Elevation Rings (Top Right & Bottom Left) */}
          <ellipse cx="1390" cy="210" rx="230" ry="125" transform="rotate(-14 1390 210)" />
          <ellipse cx="1390" cy="210" rx="165" ry="86" transform="rotate(-14 1390 210)" strokeDasharray="4 6" />
          <ellipse cx="1390" cy="210" rx="95" ry="48" transform="rotate(-14 1390 210)" />

          <ellipse cx="210" cy="810" rx="250" ry="135" transform="rotate(18 210 810)" />
          <ellipse cx="210" cy="810" rx="175" ry="92" transform="rotate(18 210 810)" strokeDasharray="6 6" />
          <ellipse cx="210" cy="810" rx="105" ry="54" transform="rotate(18 210 810)" />
        </g>

        {/* Cartographic Elevation Markers */}
        <g
          fill="var(--text-dimmer)"
          fontFamily="var(--font-mono)"
          fontSize="10"
          letterSpacing="0.12em"
          opacity="0.7"
        >
          <text x="36" y="136">ELEV 1420M · 31°45&apos;N 106°29&apos;W</text>
          <text x="1340" y="128">MESA SECTOR 04 · +1840M</text>
          <text x="36" y="968">SONORAN GRID // DATUM WGS-84</text>
          <text x="1320" y="968">WIND VECTOR 078° · 14 KT</text>
        </g>
      </svg>

      {/* HTML5 Canvas for Desert Wind Dust Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
