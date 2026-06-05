import { motion } from "framer-motion";

const SHAPE_RADIUS = {
  jug: "50%",
  crimp: "38% 38% 30% 30%",
  pinch: "50% 50% 45% 45% / 60% 60% 40% 40%",
  sloper: "46% 54% 55% 45% / 48% 42% 58% 52%",
};

// A 3D-shaded climbing hold. Checkpoint holds are large, glowing and labelled.
// Reachable holds pulse a hint ring and get an enlarged (invisible) tap target
// so they're easy to hit on touch screens. `scale` shrinks visuals on mobile.
export default function Hold({
  hold,
  checkpoint = null,
  reached = false,
  isCurrent = false,
  reachable = false,
  gemCollected = false,
  mysteryFound = false,
  scale = 1,
  onClick,
  reducedMotion,
}) {
  const isCheckpoint = Boolean(checkpoint);
  const color = checkpoint?.holdColor || hold.color;
  const visual = Math.round((isCheckpoint ? 72 : hold.size || 32) * scale);
  // Generous tap target for interactive holds (min 44px is the touch standard).
  const hit = isCheckpoint || reachable ? Math.max(visual, 46) : visual;
  const radius = isCheckpoint ? "50%" : SHAPE_RADIUS[hold.shape] || "50%";
  const showGem = hold.gem && !gemCollected;
  const showMystery = hold.mystery && !mysteryFound;
  const markerSize = Math.max(13, Math.round(20 * scale));

  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={isCheckpoint || reachable ? 0 : -1}
      aria-label={
        isCheckpoint
          ? `${checkpoint.kicker}: ${checkpoint.title}${reached ? " (completed)" : ""}`
          : reachable
          ? "Climbing hold"
          : undefined
      }
      aria-hidden={!isCheckpoint && !reachable}
      className="absolute -translate-x-1/2 translate-y-1/2 flex touch-manipulation items-center justify-center rounded-full outline-none focus-visible:ring-4 focus-visible:ring-white/80"
      style={{ left: `${hold.x}%`, bottom: `${hold.y * 100}%`, width: hit, height: hit }}
    >
      <span className="relative flex items-center justify-center" style={{ width: visual, height: visual }}>
        {/* Reachable hint ring */}
        {reachable && !isCurrent && (
          <motion.span
            className="absolute rounded-full border-2 border-white/85"
            style={{ width: visual + 16, height: visual + 16 }}
            animate={reducedMotion ? { opacity: 0.7 } : { scale: [1, 1.2, 1], opacity: [0.85, 0.3, 0.85] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Glow for checkpoints */}
        {isCheckpoint && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: `0 0 ${28 * scale}px ${8 * scale}px ${color}` }}
            animate={reducedMotion ? { opacity: 0.6 } : { opacity: reached ? 0.45 : [0.5, 0.95, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Hold body */}
        <span
          className="relative flex h-full w-full items-center justify-center"
          style={{
            borderRadius: radius,
            background: `radial-gradient(circle at 32% 26%, #ffffffd9 0%, ${color} 40%, ${color} 62%, #00000070 100%)`,
            boxShadow:
              "inset -3px -4px 6px rgba(0,0,0,0.45), inset 2px 3px 5px rgba(255,255,255,0.5), 0 6px 11px rgba(0,0,0,0.45)",
            border: isCheckpoint ? "2px solid rgba(255,255,255,0.75)" : "1px solid rgba(255,255,255,0.25)",
          }}
        >
          <span className="absolute h-1.5 w-1.5 rounded-full bg-black/40" />
          {isCheckpoint && <span style={{ fontSize: Math.round(24 * scale) }} className="drop-shadow-md">{checkpoint.icon}</span>}
          {isCheckpoint && reached && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white shadow">
              ✓
            </span>
          )}
          {isCurrent && !isCheckpoint && <span className="absolute inset-0 ring-2 ring-yellow-300" style={{ borderRadius: radius }} />}
        </span>

        {/* Collectible gem */}
        {showGem && (
          <motion.span
            className="absolute left-1/2 -translate-x-1/2"
            style={{ bottom: "100%", fontSize: markerSize, filter: "drop-shadow(0 0 6px rgba(110,231,255,0.9))" }}
            animate={reducedMotion ? {} : { y: [0, -5, 0], rotate: [-8, 8, -8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            💎
          </motion.span>
        )}

        {/* Mystery / easter-egg hold */}
        {showMystery && (
          <motion.span
            className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full bg-fuchsia-500/90 font-bold text-white shadow-lg"
            style={{ bottom: "100%", width: markerSize + 8, height: markerSize + 8, fontSize: markerSize - 6, filter: "drop-shadow(0 0 7px rgba(217,70,239,0.9))" }}
            animate={reducedMotion ? {} : { y: [0, -5, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ?
          </motion.span>
        )}
      </span>

      {/* Checkpoint label */}
      {isCheckpoint && (
        <span
          className="absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap rounded-full bg-black/55 px-2 py-0.5 font-semibold text-white shadow backdrop-blur-sm"
          style={{ fontSize: Math.max(10, Math.round(12 * scale)) }}
        >
          {checkpoint.title}
        </span>
      )}
    </button>
  );
}
