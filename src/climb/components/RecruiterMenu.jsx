import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCompass, FaChevronDown, FaFlagCheckered } from "react-icons/fa";

// Recruiter shortcuts: jump straight to any checkpoint or skip to the summit.
// Lets time-pressed visitors get the highlights fast.
export default function RecruiterMenu({ checkpoints, reached, onJump, onSummit }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-purple-700 shadow-lg backdrop-blur transition hover:bg-white dark:bg-[#332a47]/85 dark:text-purple-200 dark:hover:bg-[#332a47]"
      >
        <FaCompass className="text-amber-500" />  shortcuts
        <FaChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-white/20 bg-white/95 p-2 shadow-2xl backdrop-blur dark:bg-[#241f2e]/95"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onSummit();
              }}
              className="mb-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold text-purple-700 transition hover:bg-purple-100 dark:text-purple-200 dark:hover:bg-white/10"
            >
              <FaFlagCheckered /> Skip to Summit
            </button>
            <div className="my-1 border-t border-black/10 dark:border-white/10" />
            <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Jump to section
            </p>
            <div className="max-h-56 overflow-y-auto">
              {checkpoints.map((cp) => (
                <button
                  key={cp.id}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onJump(cp);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-purple-100 dark:text-gray-200 dark:hover:bg-white/10"
                >
                  <span className="text-lg">{cp.icon}</span>
                  <span className="flex-1">{cp.title}</span>
                  {reached.has(cp.id) && <span className="text-xs text-green-500">✓</span>}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
