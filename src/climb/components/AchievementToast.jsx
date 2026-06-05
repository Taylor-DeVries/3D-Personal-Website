import { AnimatePresence, motion } from "framer-motion";

// "Achievement unlocked" toast that slides in when a new badge is earned.
export default function AchievementToast({ badge, reducedMotion }) {
  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          key={badge.name}
          className="pointer-events-none fixed left-1/2 top-20 z-[60] -translate-x-1/2"
          initial={{ opacity: 0, y: reducedMotion ? 0 : -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-gradient-to-r from-purple-600/90 to-fuchsia-600/90 px-5 py-3 text-white shadow-2xl backdrop-blur-md">
            <motion.span
              className="text-3xl"
              animate={reducedMotion ? {} : { rotate: [0, -12, 12, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8 }}
            >
              {badge.emoji}
            </motion.span>
            <div className="max-w-[16rem]">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/80">
                Achievement Unlocked
              </p>
              <p className="text-base font-bold leading-tight">{badge.name}</p>
              <p className="text-xs leading-snug text-white/85">{badge.blurb}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
