import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import Climber from "../game/Climber";
import { SUIT_COLORS, HELMET_COLORS, FACES } from "../data/avatar";

function Swatch({ color, active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`h-8 w-8 rounded-full border-2 shadow transition ${
        active ? "scale-110 border-purple-500 ring-2 ring-purple-300" : "border-white/60 hover:scale-105"
      }`}
      style={{ background: color }}
    />
  );
}

// Live avatar customizer. Changes persist via the parent's `update` (localStorage).
export default function AvatarCustomizer({ open, avatar, update, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Customize your climber"
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-[#241f2e]"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-purple-500/20 to-fuchsia-500/10 p-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">Customize your climber</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-gray-600 transition hover:bg-black/20 dark:bg-white/10 dark:text-gray-200"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex gap-5 p-5">
              {/* Live preview */}
              <div className="flex w-28 flex-none items-center justify-center rounded-2xl bg-gradient-to-b from-purple-100 to-purple-200 dark:from-white/10 dark:to-white/5">
                <Climber avatar={avatar} />
              </div>

              {/* Controls */}
              <div className="flex-1 space-y-3">
                <Row label="Suit">
                  {SUIT_COLORS.map((c) => (
                    <Swatch key={c} color={c} active={avatar.suit === c} onClick={() => update({ suit: c })} label={`Suit ${c}`} />
                  ))}
                </Row>
                <Row label="Helmet">
                  {HELMET_COLORS.map((c) => (
                    <Swatch key={c} color={c} active={avatar.helmet === c} onClick={() => update({ helmet: c })} label={`Helmet ${c}`} />
                  ))}
                </Row>
                <div>
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-gray-400">Face</p>
                  <div className="flex flex-wrap gap-1.5">
                    {FACES.map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => update({ face: f })}
                        aria-label={`Face ${f}`}
                        aria-pressed={avatar.face === f}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-lg transition ${
                          avatar.face === f ? "bg-purple-500/20 ring-2 ring-purple-400" : "hover:bg-black/5 dark:hover:bg-white/10"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  <input
                    type="checkbox"
                    checked={avatar.helmetOn}
                    onChange={(e) => update({ helmetOn: e.target.checked })}
                    className="h-4 w-4 accent-purple-500"
                  />
                  Wear helmet
                </label>
              </div>
            </div>

            <div className="border-t border-black/5 p-4 dark:border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl bg-purple-500 py-3 font-semibold text-white shadow-lg transition hover:bg-purple-600"
              >
                Looks good — let's climb
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({ label, children }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-gray-400">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
