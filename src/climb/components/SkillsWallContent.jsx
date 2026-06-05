import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaReact, FaAws, FaNodeJs, FaAngular, FaRobot } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiCplusplus, SiNextdotjs, SiPython, SiRuby, SiRubyonrails } from "react-icons/si";
import { skills } from "../data/skills";

const ICONS = {
  react: <FaReact className="text-sky-500" />,
  typescript: <SiTypescript className="text-blue-600" />,
  nextjs: <SiNextdotjs className="text-gray-800 dark:text-white" />,
  nodejs: <FaNodeJs className="text-green-500" />,
  python: <SiPython className="text-blue-500" />,
  ruby: <SiRuby className="text-red-500" />,
  rails: <SiRubyonrails className="text-red-600" />,
  ai: <FaRobot className="text-fuchsia-500" />,
  aws: <FaAws className="text-orange-500" />,
  angular: <FaAngular className="text-red-500" />,
  tailwind: <SiTailwindcss className="text-teal-500" />,
  cplusplus: <SiCplusplus className="text-blue-400" />,
  csharp: <span className="text-sm font-extrabold text-violet-600">C#</span>,
};

// Skills wall: each hold is a skill. Selecting one reveals level, proficiency
// and related projects.
export default function SkillsWallContent({ data }) {
  const [selected, setSelected] = useState(skills[0]);

  return (
    <div>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">{data.intro}</p>

      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {skills.map((skill) => {
          const isActive = selected.name === skill.name;
          return (
            <motion.button
              key={skill.name}
              type="button"
              onClick={() => setSelected(skill)}
              onMouseEnter={() => setSelected(skill)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={isActive}
              className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-2 p-1 text-2xl shadow-sm transition ${
                isActive
                  ? "border-purple-500 bg-purple-100 dark:bg-purple-900/40"
                  : "border-transparent bg-gray-100 dark:bg-white/5"
              }`}
            >
              {ICONS[skill.icon]}
              <span className="text-[9px] font-semibold leading-none text-gray-600 dark:text-gray-300">
                {skill.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.name}
          className="mt-4 rounded-2xl bg-purple-50 p-4 dark:bg-white/5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{ICONS[selected.icon]}</span>
              <h4 className="text-lg font-bold text-gray-800 dark:text-white">{selected.name}</h4>
            </div>
            <span className="rounded-full bg-purple-500 px-3 py-1 text-xs font-bold text-white">
              {selected.level}
            </span>
          </div>
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">{selected.blurb}</p>

          <div className="mb-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-400"
              initial={{ width: 0 }}
              animate={{ width: `${selected.proficiency}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {selected.related.map((r) => (
              <span
                key={r}
                className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-purple-700 shadow-sm dark:bg-white/10 dark:text-purple-200"
              >
                {r}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
