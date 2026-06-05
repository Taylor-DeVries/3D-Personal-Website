import { Link } from "react-router-dom";
import { motion, useTransform } from "framer-motion";
import {
  FaArrowLeft,
  FaVolumeMute,
  FaVolumeUp,
  FaRedo,
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaUserAstronaut,
} from "react-icons/fa";
import RecruiterMenu from "./RecruiterMenu";

// Heads-up display: top bar, a vertical height rail with checkpoint markers,
// and a directional D-pad for touch/mouse climbing.
export default function HUD({
  percent,
  climbMV,
  checkpoints,
  reached,
  gemCount,
  totalGems,
  secretCount,
  totalSecrets,
  onOpenSecrets,
  soundOn,
  onToggleSound,
  onReset,
  onCustomize,
  onJump,
  onSummit,
  onMove,
}) {
  const railFill = useTransform(climbMV, (y) => `${Math.round(y * 100)}%`);
  const altitude = useTransform(climbMV, (y) => `${Math.round(y * 2400)} m`);

  return (
    <>
      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-2 p-3 sm:p-4">
        <div className="pointer-events-auto flex flex-wrap items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-2 text-sm font-semibold text-gray-700 shadow-lg backdrop-blur transition hover:bg-white dark:bg-[#332a47]/85 dark:text-gray-100 dark:hover:bg-[#332a47]"
          >
            <FaArrowLeft /> <span className="hidden sm:inline">Exit</span>
          </Link>
          <IconBtn label="Customize climber" onClick={onCustomize}>
            <FaUserAstronaut />
          </IconBtn>
          <IconBtn label={soundOn ? "Mute sound" : "Enable sound"} onClick={onToggleSound}>
            {soundOn ? <FaVolumeUp /> : <FaVolumeMute />}
          </IconBtn>
          <IconBtn label="Reset progress" onClick={onReset}>
            <FaRedo />
          </IconBtn>
          <button
            type="button"
            onClick={onOpenSecrets}
            aria-label="Open secret fun facts journal"
            className="flex items-center gap-2 rounded-full bg-white/85 px-3 py-2 text-sm font-bold shadow-lg backdrop-blur transition hover:bg-white dark:bg-[#332a47]/85 dark:hover:bg-[#332a47]"
          >
            <span className="text-purple-700 dark:text-purple-200">💎 {gemCount}/{totalGems}</span>
            <span className="text-fuchsia-600 dark:text-fuchsia-300">🔮 {secretCount}/{totalSecrets}</span>
          </button>
        </div>

        <div className="pointer-events-auto">
          <RecruiterMenu
            checkpoints={checkpoints}
            reached={reached}
            onJump={onJump}
            onSummit={onSummit}
          />
        </div>
      </div>

      {/* Vertical height rail */}
      <div className="pointer-events-none absolute left-3 top-1/2 z-30 hidden -translate-y-1/2 sm:block">
        <div className="relative h-72 w-2.5 overflow-hidden rounded-full bg-white/25">
          <motion.div
            className="absolute bottom-0 w-full rounded-full bg-gradient-to-t from-purple-500 to-fuchsia-400"
            style={{ height: railFill }}
          />
        </div>
        {checkpoints.map((cp) => (
          <div
            key={cp.id}
            className="absolute -left-1 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-[8px]"
            style={{
              bottom: `${cp.y * 100}%`,
              background: reached.has(cp.id) ? "#22c55e" : "rgba(255,255,255,0.4)",
            }}
            title={cp.title}
          >
            {reached.has(cp.id) ? "✓" : ""}
          </div>
        ))}
        <div className="mt-3 text-center">
          <span className="rounded-full bg-white/85 px-2 py-1 text-xs font-bold text-purple-700 shadow dark:bg-[#332a47]/85 dark:text-purple-200">
            {percent}%
          </span>
          <motion.div className="mt-1 text-[10px] font-semibold text-white/80 drop-shadow">{altitude}</motion.div>
        </div>
      </div>

      {/* Compact progress for mobile */}
      <div className="pointer-events-none absolute inset-x-0 top-16 z-20 flex justify-center sm:hidden">
        <div className="flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 backdrop-blur">
          <div className="h-2 w-40 overflow-hidden rounded-full bg-white/30">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-400" style={{ width: railFill }} />
          </div>
          <span className="text-xs font-bold text-white">{percent}%</span>
        </div>
      </div>

      {/* Directional D-pad */}
      <div className="pointer-events-none absolute bottom-5 right-4 z-30 select-none sm:bottom-6">
        <div className="grid grid-cols-3 grid-rows-3 gap-1.5">
          <span />
          <PadBtn label="Climb up" onPress={() => onMove("up")}>
            <FaChevronUp />
          </PadBtn>
          <span />
          <PadBtn label="Move left" onPress={() => onMove("left")}>
            <FaChevronLeft />
          </PadBtn>
          <span />
          <PadBtn label="Move right" onPress={() => onMove("right")}>
            <FaChevronRight />
          </PadBtn>
          <span />
          <PadBtn label="Climb down" onPress={() => onMove("down")}>
            <FaChevronDown />
          </PadBtn>
          <span />
        </div>
      </div>
    </>
  );
}

function IconBtn({ children, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="rounded-full bg-white/85 p-2.5 text-gray-700 shadow-lg backdrop-blur transition hover:bg-white dark:bg-[#332a47]/85 dark:text-gray-100 dark:hover:bg-[#332a47]"
    >
      {children}
    </button>
  );
}

function PadBtn({ children, label, onPress }) {
  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/85 text-lg text-purple-700 shadow-lg backdrop-blur transition active:scale-90 active:bg-purple-100 dark:bg-[#332a47]/85 dark:text-purple-200"
    >
      {children}
    </button>
  );
}
