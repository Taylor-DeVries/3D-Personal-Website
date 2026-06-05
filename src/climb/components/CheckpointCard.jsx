import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaArrowUp } from "react-icons/fa";
import CheckpointContent from "./CheckpointContent";

// Animated modal card revealed at each checkpoint. Handles Escape-to-close,
// initial focus and basic accessibility semantics.
export default function CheckpointCard({ checkpoint, onClose, reducedMotion }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!checkpoint) return;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [checkpoint, onClose]);

  return (
    <AnimatePresence>
      {checkpoint && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkpoint-title"
            className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-[#241f2e] sm:rounded-3xl"
            initial={{ scale: reducedMotion ? 1 : 0.85, opacity: 0, y: reducedMotion ? 0 : 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: reducedMotion ? 1 : 0.9, opacity: 0, y: reducedMotion ? 0 : 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="relative flex items-center gap-2.5 p-3.5 sm:gap-4 sm:p-5"
              style={{ background: `linear-gradient(120deg, ${checkpoint.holdColor}33, transparent)` }}
            >
              <div
                className="flex h-10 w-10 flex-none items-center justify-center rounded-xl text-2xl shadow-lg sm:h-14 sm:w-14 sm:rounded-2xl sm:text-3xl"
                style={{ background: `radial-gradient(circle at 35% 30%, ${checkpoint.holdColor}, ${checkpoint.holdColor}bb)` }}
              >
                {checkpoint.icon}
              </div>
              <div className="min-w-0 pr-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-500 sm:text-xs">
                  {checkpoint.kicker}
                </p>
                <h2 id="checkpoint-title" className="truncate text-base font-bold text-gray-800 dark:text-white sm:text-xl">
                  {checkpoint.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close and keep climbing"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-gray-600 transition hover:bg-black/20 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20 sm:right-4 sm:top-4 sm:h-9 sm:w-9"
              >
                <FaTimes />
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[64vh] overflow-y-auto px-3.5 pb-2 sm:max-h-[58vh] sm:px-5">
              <CheckpointContent checkpoint={checkpoint} />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-2 border-t border-black/5 p-3 dark:border-white/10 sm:p-4">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300 sm:text-sm">
                <span className="text-base sm:text-lg">{checkpoint.badge.emoji}</span>
                <span className="font-semibold">{checkpoint.badge.name}</span> earned
              </div>
              <motion.button
                type="button"
                onClick={onClose}
                className="flex flex-none items-center gap-2 rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-600 sm:px-5 sm:py-2.5 sm:text-base"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Keep climbing <FaArrowUp />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
