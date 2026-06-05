import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPlay, FaUserAstronaut } from "react-icons/fa";
import { baseCamp } from "../data/checkpoints";
import Climber from "../game/Climber";
import { DEFAULT_AVATAR } from "../data/avatar";

// Intro overlay shown before the climb begins.
export default function BaseCamp({ onStart, onCustomize, avatar = DEFAULT_AVATAR, hasProgress, reducedMotion }) {
  return (
    <motion.div
      className="absolute inset-0 z-40 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <motion.div
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/20 bg-white/90 p-4 text-center shadow-2xl dark:bg-[#241f2e]/90 sm:rounded-3xl sm:p-7"
        initial={{ scale: reducedMotion ? 1 : 0.9, y: reducedMotion ? 0 : 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <Link
          to="/"
          className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-semibold text-gray-600 transition hover:bg-black/10 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20 sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs"
        >
          <FaArrowLeft /> Portfolio
        </Link>

        <motion.div
          className="mx-auto mb-3 h-16 w-16 overflow-hidden rounded-full border-4 border-purple-400 shadow-lg sm:mb-4 sm:h-24 sm:w-24"
          initial={{ scale: 0.8, rotate: -6 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.05, rotate: 4 }}
        >
          <img src={baseCamp.image} alt="Taylor DeVries" className="h-full w-full object-cover" />
        </motion.div>

        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-purple-500 sm:text-xs">Base Camp</p>
        <h1 className="text-xl font-bold text-[#333] dark:text-white sm:text-3xl">{baseCamp.name}</h1>
        <p className="mb-2 text-xs font-medium text-purple-500 dark:text-purple-300 sm:mb-3 sm:text-sm">{baseCamp.tagline}</p>
        <p className="mb-3 text-xs leading-relaxed text-gray-600 dark:text-gray-200 sm:mb-4 sm:text-sm">{baseCamp.summary}</p>

        {/* How to play */}
        <div className="mb-3 space-y-1.5 rounded-2xl bg-purple-50 p-3 text-left dark:bg-white/5 sm:mb-4 sm:space-y-2 sm:p-4">
          <p className="text-[10px] font-bold uppercase tracking-wide text-purple-500 sm:text-xs">How to play</p>
          {baseCamp.howTo.map((item) => (
            <div key={item.text} className="flex items-start gap-2 text-[11px] text-gray-600 dark:text-gray-200 sm:gap-2.5 sm:text-xs">
              <span className="text-sm leading-none sm:text-base">{item.emoji}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Your climber + customize */}
        <div className="mb-4 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-100 to-fuchsia-100 p-2.5 dark:from-white/10 dark:to-white/5 sm:mb-5 sm:gap-4 sm:p-3">
          <div className="flex h-16 w-14 items-center justify-center sm:h-24 sm:w-20">
            <Climber avatar={avatar} scale={0.7} />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-800 dark:text-white sm:text-sm">This is your climber</p>
            <p className="mb-1.5 text-[11px] text-gray-500 dark:text-gray-300 sm:mb-2 sm:text-xs">Make it your own before you start.</p>
            <button
              type="button"
              onClick={onCustomize}
              className="inline-flex items-center gap-1.5 rounded-lg border-2 border-purple-400 px-2.5 py-1 text-[11px] font-semibold text-purple-600 transition hover:bg-purple-100 dark:text-purple-300 dark:hover:bg-white/10 sm:px-3 sm:py-1.5 sm:text-xs"
            >
              <FaUserAstronaut /> Customize
            </button>
          </div>
        </div>

        <motion.button
          onClick={onStart}
          className="mb-2.5 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-600 sm:mb-3 sm:py-3 sm:text-base"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <FaPlay /> {hasProgress ? "Continue Climb" : "Start Climbing"}
        </motion.button>

        <p className="text-[10px] text-gray-500 dark:text-gray-400 sm:text-xs">
          Climb with <kbd className="rounded bg-black/10 px-1.5 py-0.5 dark:bg-white/10">W</kbd>{" "}
          <kbd className="rounded bg-black/10 px-1.5 py-0.5 dark:bg-white/10">A</kbd>{" "}
          <kbd className="rounded bg-black/10 px-1.5 py-0.5 dark:bg-white/10">S</kbd>{" "}
          <kbd className="rounded bg-black/10 px-1.5 py-0.5 dark:bg-white/10">D</kbd> / arrows, the D-pad, or tap a glowing hold.
        </p>
      </motion.div>
    </motion.div>
  );
}
