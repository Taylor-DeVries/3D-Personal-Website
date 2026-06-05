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
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/20 bg-white/90 p-7 text-center shadow-2xl dark:bg-[#241f2e]/90"
        initial={{ scale: reducedMotion ? 1 : 0.9, y: reducedMotion ? 0 : 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <Link
          to="/"
          className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-black/10 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20"
        >
          <FaArrowLeft /> Portfolio
        </Link>

        <motion.div
          className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-purple-400 shadow-lg"
          initial={{ scale: 0.8, rotate: -6 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.05, rotate: 4 }}
        >
          <img src={baseCamp.image} alt="Taylor DeVries" className="h-full w-full object-cover" />
        </motion.div>

        <p className="mb-1 text-xs font-bold uppercase tracking-[0.3em] text-purple-500">Base Camp</p>
        <h1 className="text-3xl font-bold text-[#333] dark:text-white">{baseCamp.name}</h1>
        <p className="mb-3 text-sm font-medium text-purple-500 dark:text-purple-300">{baseCamp.tagline}</p>
        <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-200">{baseCamp.summary}</p>

        {/* How to play */}
        <div className="mb-4 space-y-2 rounded-2xl bg-purple-50 p-4 text-left dark:bg-white/5">
          <p className="text-xs font-bold uppercase tracking-wide text-purple-500">How to play</p>
          {baseCamp.howTo.map((item) => (
            <div key={item.text} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-200">
              <span className="text-base leading-none">{item.emoji}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Your climber + customize */}
        <div className="mb-5 flex items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-purple-100 to-fuchsia-100 p-3 dark:from-white/10 dark:to-white/5">
          <div className="flex h-24 w-20 items-center justify-center">
            <Climber avatar={avatar} />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">This is your climber</p>
            <p className="mb-2 text-xs text-gray-500 dark:text-gray-300">Make it your own before you start.</p>
            <button
              type="button"
              onClick={onCustomize}
              className="inline-flex items-center gap-1.5 rounded-lg border-2 border-purple-400 px-3 py-1.5 text-xs font-semibold text-purple-600 transition hover:bg-purple-100 dark:text-purple-300 dark:hover:bg-white/10"
            >
              <FaUserAstronaut /> Customize
            </button>
          </div>
        </div>

        <motion.button
          onClick={onStart}
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-purple-600"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <FaPlay /> {hasProgress ? "Continue Climb" : "Start Climbing"}
        </motion.button>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Climb with <kbd className="rounded bg-black/10 px-1.5 py-0.5 dark:bg-white/10">W</kbd>{" "}
          <kbd className="rounded bg-black/10 px-1.5 py-0.5 dark:bg-white/10">A</kbd>{" "}
          <kbd className="rounded bg-black/10 px-1.5 py-0.5 dark:bg-white/10">S</kbd>{" "}
          <kbd className="rounded bg-black/10 px-1.5 py-0.5 dark:bg-white/10">D</kbd> / arrows, the D-pad, or tap a glowing hold.
        </p>
      </motion.div>
    </motion.div>
  );
}
