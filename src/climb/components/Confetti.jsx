import { useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = ["#BC86F7", "#BF40BF", "#9B4DCA", "#F59E0B", "#10B981", "#3B82F6", "#EC4899"];

// Dependency-free confetti burst built from animated DOM pieces.
export default function Confetti({ count = 90, reducedMotion }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.2 + Math.random() * 1.8,
        size: 6 + Math.random() * 8,
        color: COLORS[i % COLORS.length],
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 120,
      })),
    [count]
  );

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{ left: `${p.left}%`, width: p.size, height: p.size * 0.6, background: p.color }}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{ y: "105vh", opacity: [0, 1, 1, 0], rotate: p.rotate, x: p.drift }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn", repeat: Infinity, repeatDelay: 0.4 }}
        />
      ))}
    </div>
  );
}
