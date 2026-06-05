import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaLock } from "react-icons/fa";

// A journal of the hidden fun facts. Found facts show their text; undiscovered
// ones stay locked, nudging the player to explore the side routes for more.
export default function SecretsJournal({ open, facts, onClose }) {
  const found = facts.filter((f) => f.found).length;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[65] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Secret fun facts journal"
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-[#241f2e]"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-fuchsia-500/20 to-purple-500/10 p-3 sm:p-4">
              <div>
                <h2 className="flex items-center gap-2 text-base font-bold text-gray-800 dark:text-white sm:text-lg">
                  🔮 Secret fun facts
                </h2>
                <p className="text-[11px] text-gray-500 dark:text-gray-300 sm:text-xs">
                  {found}/{facts.length} uncovered — find 🔮 holds on side routes
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-black/10 text-gray-600 transition hover:bg-black/20 dark:bg-white/10 dark:text-gray-200 sm:h-9 sm:w-9"
              >
                <FaTimes />
              </button>
            </div>

            <div className="max-h-[60vh] space-y-2 overflow-y-auto p-3 sm:p-4">
              {facts.map((f, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 rounded-2xl p-2.5 text-xs sm:gap-3 sm:p-3 sm:text-sm ${
                    f.found
                      ? "bg-fuchsia-50 text-gray-700 dark:bg-white/10 dark:text-gray-100"
                      : "bg-gray-100 text-gray-400 dark:bg-white/5 dark:text-gray-500"
                  }`}
                >
                  <span className="mt-0.5 flex-none text-sm sm:text-base">{f.found ? "🔮" : <FaLock />}</span>
                  <span>{f.found ? f.text : "Locked — keep climbing to discover this one."}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
