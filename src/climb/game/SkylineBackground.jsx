import { useMemo } from "react";
import { motion, useTransform } from "framer-motion";

// A detailed, parallax mountain backdrop. As the climber ascends, the scene
// shifts from a misty glacier valley at dawn, up through layered, 3D-shaded
// mountain ranges and clouds, into golden hour and a starry alpine summit.

function bell(x, center, width) {
  const d = (x - center) / width;
  return Math.max(0, 1 - d * d);
}

const ZONES = [
  [0.05, "linear-gradient(180deg,#bfe6e2 0%,#ffe0b3 60%,#ffc28a 100%)"], // misty dawn valley
  [0.34, "linear-gradient(180deg,#7ec8f2 0%,#c6ebf9 100%)"], // clear morning
  [0.58, "linear-gradient(180deg,#4f9fe6 0%,#a7d8f6 100%)"], // high day
  [0.8, "linear-gradient(180deg,#3b3f86 0%,#f2a45c 100%)"], // golden hour
  [1.0, "linear-gradient(180deg,#070b22 0%,#1d2b5e 55%,#37265f 100%)"], // alpine night
];

export default function SkylineBackground({ climbMV, reducedMotion }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 55,
        size: 1 + Math.random() * 2.2,
        delay: Math.random() * 3,
      })),
    []
  );
  const birds = useMemo(
    () => Array.from({ length: 5 }, (_, i) => ({ id: i, top: 16 + Math.random() * 30, delay: i * 1.7, dur: 18 + Math.random() * 10 })),
    []
  );
  const clouds = useMemo(
    () => Array.from({ length: 5 }, (_, i) => ({ id: i, top: 20 + i * 11, left: (i * 26) % 90, scale: 0.7 + Math.random() * 0.8, dur: 26 + Math.random() * 18 })),
    []
  );

  const sunY = useTransform(climbMV, [0, 0.85, 1], ["82%", "16%", "10%"]);
  const sunColor = useTransform(climbMV, [0, 0.4, 0.8, 1], ["#fff2cc", "#fff7e0", "#ffd9a0", "#dfe7ff"]);
  const sunGlow = useTransform(climbMV, [0.1, 0.55, 0.85, 1], [0.35, 0.85, 0.6, 0.4]);
  const sunBg = useTransform(sunColor, (c) => `radial-gradient(circle, ${c} 0%, ${c}cc 38%, transparent 72%)`);

  // Parallax (deeper layers move less).
  const hazeY = useTransform(climbMV, [0, 1], [0, -30]);
  const farY = useTransform(climbMV, [0, 1], [10, -60]);
  const midY = useTransform(climbMV, [0, 1], [40, -130]);
  const nearY = useTransform(climbMV, [0, 1], [80, -230]);
  const lakeY = useTransform(climbMV, [0, 1], [40, -300]);

  const farOpacity = useTransform(climbMV, [0, 0.85], [1, 0.35]);
  const valleyOpacity = useTransform(climbMV, [0, 0.34], [1, 0]);
  const starsOpacity = useTransform(climbMV, [0.66, 0.95], [0, 1]);
  const auroraOpacity = useTransform(climbMV, [0.74, 0.96], [0, 0.6]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {ZONES.map(([center, gradient], i) => (
        <Zone key={i} climbMV={climbMV} center={center} width={i === 0 ? 0.22 : 0.3} gradient={gradient} />
      ))}

      {/* Sun / moon */}
      <motion.div
        className="absolute left-[62%] h-32 w-32 -translate-x-1/2 rounded-full"
        style={{ top: sunY, background: sunBg, opacity: sunGlow, filter: "blur(2px)" }}
      />

      {/* Aurora near the summit */}
      <motion.div className="absolute inset-x-0 top-0 h-1/2" style={{ opacity: auroraOpacity }}>
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 38% at 30% 18%, rgba(90,255,205,0.4), transparent 70%)," +
              "radial-gradient(55% 40% at 72% 26%, rgba(150,130,255,0.4), transparent 70%)",
            filter: "blur(22px)",
          }}
          animate={reducedMotion ? {} : { x: [-24, 24, -24], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Stars */}
      <motion.div className="absolute inset-0" style={{ opacity: starsOpacity }}>
        {stars.map((s) => (
          <span
            key={s.id}
            className={reducedMotion ? "absolute rounded-full bg-white" : "absolute rounded-full bg-white animate-pulse"}
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
          />
        ))}
      </motion.div>

      {/* Volumetric clouds */}
      {clouds.map((c) => (
        <motion.div
          key={c.id}
          className="absolute h-16 w-48 rounded-full bg-white/45 blur-2xl"
          style={{ top: `${c.top}%`, left: `${c.left}%`, scale: c.scale }}
          initial={{ x: "-20vw" }}
          animate={reducedMotion ? {} : { x: ["-20vw", "120vw"] }}
          transition={{ duration: c.dur, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Drifting birds */}
      {!reducedMotion &&
        birds.map((b) => (
          <motion.div
            key={b.id}
            className="absolute text-white/40"
            style={{ top: `${b.top}%`, fontSize: 13 }}
            initial={{ x: "-10vw" }}
            animate={{ x: "110vw" }}
            transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "linear" }}
          >
            <span style={{ letterSpacing: 2 }}>⌃ ⌃</span>
          </motion.div>
        ))}

      {/* Hazy far peaks */}
      <motion.div className="absolute inset-x-0 bottom-[36%] h-40" style={{ y: hazeY, opacity: farOpacity }}>
        <svg viewBox="0 0 1200 240" preserveAspectRatio="none" className="h-full w-full">
          <path d="M0 240 L150 100 L300 160 L470 70 L640 170 L820 80 L1010 160 L1200 90 L1200 240 Z" fill="#aebfdc" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Far range (two-tone for 3D) */}
      <motion.div className="absolute inset-x-0 bottom-[30%] h-52" style={{ y: farY }}>
        <Range
          peaks={[
            { x: 180, w: 230, h: 150 },
            { x: 520, w: 300, h: 200 },
            { x: 900, w: 280, h: 170 },
          ]}
          lit="#7e93c2"
          shadow="#5a6ea0"
          snow={false}
        />
      </motion.div>

      {/* Mid range with snow caps + 3D shading */}
      <motion.div className="absolute inset-x-0 bottom-[20%] h-72" style={{ y: midY }}>
        <Range
          peaks={[
            { x: 120, w: 300, h: 250 },
            { x: 470, w: 360, h: 300 },
            { x: 860, w: 340, h: 260 },
          ]}
          lit="#8ea2cf"
          shadow="#4d5f93"
          snow
        />
      </motion.div>

      {/* Near forested ridge */}
      <motion.div className="absolute inset-x-0 bottom-[8%] h-72" style={{ y: nearY }}>
        <svg viewBox="0 0 1200 320" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="ridgeLit" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#46603f" />
              <stop offset="1" stopColor="#2f4530" />
            </linearGradient>
          </defs>
          <path d="M0 320 L260 130 L520 300 L760 150 L1010 300 L1200 180 L1200 320 Z" fill="url(#ridgeLit)" />
          {/* pine speckle */}
          {Array.from({ length: 40 }).map((_, i) => (
            <path key={i} d={`M${20 + i * 30} 300 L${28 + i * 30} 270 L${36 + i * 30} 300 Z`} fill="#21331e" opacity="0.6" />
          ))}
        </svg>
      </motion.div>

      {/* Glacier lake + reflection in the valley */}
      <motion.div className="absolute inset-x-0 bottom-0 h-44" style={{ y: lakeY, opacity: valleyOpacity }}>
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#bfe3ef" />
              <stop offset="1" stopColor="#7fb4cf" />
            </linearGradient>
          </defs>
          {/* shoreline */}
          <path d="M0 60 L300 50 L600 70 L900 52 L1200 66 L1200 0 L0 0 Z" fill="#3f5540" />
          <rect x="0" y="58" width="1200" height="142" fill="url(#lake)" />
          {/* shimmer lines */}
          {[80, 100, 120, 140].map((yy, i) => (
            <rect key={yy} x={120 + i * 40} y={yy} width={220 - i * 30} height="3" rx="1.5" fill="#ffffff" opacity="0.35" />
          ))}
        </svg>
      </motion.div>

      {/* Foreground pine trees */}
      <motion.div className="absolute inset-x-0 bottom-0 h-36" style={{ y: lakeY, opacity: valleyOpacity }}>
        <svg viewBox="0 0 1200 150" preserveAspectRatio="none" className="h-full w-full">
          {Array.from({ length: 12 }).map((_, i) => {
            const x = i % 2 === 0 ? 20 + i * 50 : 1100 - i * 46;
            return (
              <g key={i} fill="#21331e">
                <path d={`M${x} 150 L${x + 18} 70 L${x + 36} 150 Z`} />
                <path d={`M${x + 3} 130 L${x + 18} 54 L${x + 33} 130 Z`} />
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Mist band over the valley */}
      <motion.div className="absolute inset-x-0 bottom-[14%] h-20 bg-white/30 blur-2xl" style={{ opacity: valleyOpacity }} />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(0,0,0,0.38)_100%)]" />
    </div>
  );
}

// A mountain range drawn with a lit face and a shadow face per peak for a 3D
// feel, plus optional snow caps.
function Range({ peaks, lit, shadow, snow }) {
  return (
    <svg viewBox="0 0 1200 320" preserveAspectRatio="none" className="h-full w-full">
      {peaks.map((p, i) => {
        const apexX = p.x;
        const apexY = 320 - p.h;
        const leftX = p.x - p.w / 2;
        const rightX = p.x + p.w / 2;
        return (
          <g key={i}>
            {/* lit (left) face */}
            <path d={`M${leftX} 320 L${apexX} ${apexY} L${apexX} 320 Z`} fill={lit} />
            {/* shadow (right) face */}
            <path d={`M${apexX} ${apexY} L${rightX} 320 L${apexX} 320 Z`} fill={shadow} />
            {/* snow cap */}
            {snow && (
              <>
                <path
                  d={`M${apexX - p.w * 0.16} ${apexY + p.h * 0.22} L${apexX} ${apexY} L${apexX} ${apexY + p.h * 0.22} Z`}
                  fill="#f4f8ff"
                />
                <path
                  d={`M${apexX} ${apexY} L${apexX + p.w * 0.16} ${apexY + p.h * 0.22} L${apexX} ${apexY + p.h * 0.22} Z`}
                  fill="#d8e6f5"
                />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Zone({ climbMV, center, width, gradient }) {
  const opacity = useTransform(climbMV, (c) => bell(c, center, width));
  return <motion.div className="absolute inset-0" style={{ background: gradient, opacity }} />;
}
