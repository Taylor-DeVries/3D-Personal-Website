import { AnimatePresence, motion } from "framer-motion";

// "Achievement unlocked" toast that slides in when a new badge is earned.
export default function AchievementToast({ badge, reducedMotion }) {
  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          key={badge.name}
          className="pointer-events-none fixed left-1/2 top-16 z-[60] w-[92vw] max-w-xs -translate-x-1/2 sm:top-20 sm:w-auto sm:max-w-sm"
          initial={{ opacity: 0, y: reducedMotion ? 0 : -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2.5 rounded-2xl border border-white/20 bg-gradient-to-r from-purple-600/90 to-fuchsia-600/90 px-3.5 py-2.5 text-white shadow-2xl backdrop-blur-md sm:gap-3 sm:px-5 sm:py-3">
            <motion.span
              className="text-2xl sm:text-3xl"
              animate={reducedMotion ? {} : { rotate: [0, -12, 12, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8 }}
            >
              {badge.emoji}
            </motion.span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/80 sm:text-[11px]">
                Achievement Unlocked
              </p>
              <p className="text-sm font-bold leading-tight sm:text-base">{badge.name}</p>
              <p className="text-[11px] leading-snug text-white/85 sm:text-xs">{badge.blurb}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
