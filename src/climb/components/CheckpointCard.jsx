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
            className="relative max-h-[88vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-[#241f2e]"
            initial={{ scale: reducedMotion ? 1 : 0.85, opacity: 0, y: reducedMotion ? 0 : 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: reducedMotion ? 1 : 0.9, opacity: 0, y: reducedMotion ? 0 : 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="relative flex items-center gap-4 p-5"
              style={{ background: `linear-gradient(120deg, ${checkpoint.holdColor}33, transparent)` }}
            >
              <div
                className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl text-3xl shadow-lg"
                style={{ background: `radial-gradient(circle at 35% 30%, ${checkpoint.holdColor}, ${checkpoint.holdColor}bb)` }}
              >
                {checkpoint.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-500">
                  {checkpoint.kicker}
                </p>
                <h2 id="checkpoint-title" className="truncate text-xl font-bold text-gray-800 dark:text-white">
                  {checkpoint.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close and keep climbing"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-gray-600 transition hover:bg-black/20 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20"
              >
                <FaTimes />
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[58vh] overflow-y-auto px-5 pb-2">
              <CheckpointContent checkpoint={checkpoint} />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 border-t border-black/5 p-4 dark:border-white/10">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                <span className="text-lg">{checkpoint.badge.emoji}</span>
                <span className="font-semibold">{checkpoint.badge.name}</span> earned
              </div>
              <motion.button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 rounded-xl bg-purple-500 px-5 py-2.5 font-semibold text-white shadow-lg transition hover:bg-purple-600"
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
