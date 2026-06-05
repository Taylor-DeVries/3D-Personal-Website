import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaFileDownload, FaEnvelope, FaRedo, FaHome } from "react-icons/fa";
import Confetti from "./Confetti";
import { summit, checkpoints } from "../data/checkpoints";

// Final summit experience: celebration, full journey recap, score and CTAs.
export default function Summit({ reached, percent, gemCount, totalGems, secretCount, totalSecrets, facts = [], onClimbAgain, reducedMotion }) {
  const allGems = totalGems > 0 && gemCount >= totalGems;
  const allSecrets = totalSecrets > 0 && secretCount >= totalSecrets;
  const score =
    reached.size * 250 +
    gemCount * 100 +
    secretCount * 150 +
    (allGems ? 500 : 0) +
    (allSecrets ? 500 : 0);
  return (
    <motion.div
      className="absolute inset-0 z-50 overflow-y-auto bg-[#1a1340]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="fixed inset-0 bg-gradient-to-b from-[#1a1340] to-[#3b2566]" />
      <Confetti reducedMotion={reducedMotion} />

      <div className="relative mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center px-4 py-12 text-center">
        <motion.div
          className="mb-2 text-6xl"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        >
          🏔️
        </motion.div>
        <motion.h1
          className="text-3xl font-bold text-white sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {summit.title}
        </motion.h1>
        <motion.p
          className="mt-2 text-lg text-purple-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {summit.message}
        </motion.p>

        <motion.div
          className="mt-3 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {reached.size}/{checkpoints.length} checkpoints · {percent}% complete
        </motion.div>

        <motion.div
          className="mt-2 flex flex-wrap items-center justify-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          💎 {gemCount}/{totalGems} gems {allGems && <span className="rounded-full bg-amber-400 px-2 py-0.5 text-xs text-amber-950">Gem Master 🏅</span>}
          <span className="opacity-50">·</span>
          🔮 {secretCount}/{totalSecrets} secrets {allSecrets && <span className="rounded-full bg-fuchsia-400 px-2 py-0.5 text-xs text-fuchsia-950">Explorer 🧭</span>}
        </motion.div>

        {/* Final score */}
        <motion.div
          className="mt-4 rounded-2xl border border-white/20 bg-gradient-to-r from-purple-600/40 to-fuchsia-600/40 px-6 py-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-purple-200">Climb score</p>
          <motion.p
            className="text-4xl font-extrabold text-white"
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.85, type: "spring", stiffness: 220, damping: 12 }}
          >
            {score.toLocaleString()}
          </motion.p>
        </motion.div>

        {/* Journey recap */}
        <div className="mt-8 w-full">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-purple-300">
            Your climb
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {checkpoints.map((cp, i) => (
              <motion.div
                key={cp.id}
                className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.07 }}
              >
                <span className="text-xl">{cp.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{cp.title}</p>
                  <p className="truncate text-xs text-purple-200">
                    {cp.badge.emoji} {cp.badge.name}
                  </p>
                </div>
                {reached.has(cp.id) ? (
                  <span className="text-green-400">✓</span>
                ) : (
                  <span className="text-xs text-white/40">—</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Secret fun facts uncovered */}
        {facts.length > 0 && (
          <div className="mt-8 w-full">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">
              🔮 Secret fun facts ({facts.filter((f) => f.found).length}/{facts.length})
            </p>
            <div className="space-y-2">
              {facts.map((f, i) => (
                <motion.div
                  key={i}
                  className={`flex items-start gap-3 rounded-xl border px-3 py-2 text-left text-sm ${
                    f.found ? "border-fuchsia-300/30 bg-fuchsia-500/15 text-white" : "border-white/10 bg-white/5 text-white/40"
                  }`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.06 }}
                >
                  <span className="mt-0.5 flex-none">{f.found ? "🔮" : "🔒"}</span>
                  <span>{f.found ? f.text : "Locked — find this 🔮 hold on a side route."}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Recruiter CTA */}
        <motion.p
          className="mt-8 max-w-md text-sm text-purple-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {summit.recruiterNote}
        </motion.p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href={summit.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-[#0a66c2] px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            href={summit.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-gray-800 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href={summit.links.email}
            className="flex items-center gap-2 rounded-xl bg-purple-500 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            <FaEnvelope /> Contact
          </a>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onClimbAgain}
              className="flex items-center gap-2 rounded-xl bg-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/25"
            >
              <FaRedo /> Reset & climb again
            </button>
            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
            <FaHome /> Back to portfolio
          </Link>
          </div>
          <p className="text-xs text-white/60">Resetting wipes your gems, secrets and score for a fresh attempt.</p>
        </div>
      </div>
    </motion.div>
  );
}
