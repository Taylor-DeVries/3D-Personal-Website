import { useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import SkillsWallContent from "./SkillsWallContent";

// Renders the inner content of a checkpoint card based on its `type`.
export default function CheckpointContent({ checkpoint }) {
  switch (checkpoint.type) {
    case "story":
      return <StoryContent data={checkpoint} />;
    case "university":
      return <UniversityContent data={checkpoint} />;
    case "experience":
      return <ExperienceContent data={checkpoint} />;
    case "startup":
      return <StartupContent data={checkpoint} />;
    case "projects":
      return <ProjectsContent data={checkpoint} />;
    case "skills":
      return <SkillsWallContent data={checkpoint} />;
    case "personal":
      return <PersonalContent data={checkpoint} />;
    default:
      return null;
  }
}

function TechPills({ items }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/50 dark:text-purple-200"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function StoryContent({ data }) {
  return (
    <div className="space-y-3">
      {data.body.map((p, i) => (
        <motion.p
          key={i}
          className="text-sm leading-relaxed text-gray-600 dark:text-gray-200"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12 }}
        >
          {p}
        </motion.p>
      ))}
    </div>
  );
}

function UniversityContent({ data }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-bold text-gray-800 dark:text-white">{data.school}</h4>
        <p className="text-sm font-medium text-purple-500 dark:text-purple-300">{data.program}</p>
      </div>

      <div className="flex gap-2">
        {data.photos.map((src) => (
          <div key={src} className="h-24 flex-1 overflow-hidden rounded-xl shadow">
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      {/* Animated timeline */}
      <div className="relative ml-3 border-l-2 border-purple-300 pl-5 dark:border-purple-700">
        {data.timeline.map((item, i) => (
          <motion.div
            key={item.when}
            className="relative mb-4 last:mb-0"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.15 }}
          >
            <span className="absolute -left-[27px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-purple-500 shadow" />
            <p className="text-xs font-bold uppercase tracking-wide text-purple-500">{item.when}</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.what}</p>
            <p className="text-xs text-gray-500 dark:text-gray-300">{item.detail}</p>
          </motion.div>
        ))}
      </div>

      <div>
        <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-gray-400">Key courses</p>
        <TechPills items={data.courses} />
      </div>

      <p className="rounded-xl bg-purple-50 p-3 text-sm italic text-gray-600 dark:bg-white/5 dark:text-gray-200">
        “{data.lessons}”
      </p>
    </div>
  );
}

function ExperienceContent({ data }) {
  return (
    <div className="space-y-4">
      {data.experiences.map((exp, i) => (
        <motion.div
          key={`${exp.company}-${i}`}
          className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm dark:border-purple-900/50 dark:bg-white/5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12 }}
        >
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-white p-1 shadow">
              <img src={exp.image} alt={exp.company} className="h-full w-full object-contain" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-white">{exp.role}</h4>
              <p className="text-xs text-purple-500 dark:text-purple-300">
                {exp.company} · {exp.when}
              </p>
            </div>
          </div>
          <ul className="mb-3 list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-200">
            {exp.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
          <TechPills items={exp.tech} />
        </motion.div>
      ))}
    </div>
  );
}

function StartupContent({ data }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow">
          <img src={data.image} alt={data.name} className="h-full w-full object-contain" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-800 dark:text-white">{data.name}</h4>
          <p className="text-xs text-purple-500 dark:text-purple-300">
            {data.role} · {data.when}
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-200">{data.pitch}</p>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">Validation process</p>
        <div className="space-y-2">
          {data.validation.map((step, i) => (
            <motion.div
              key={step}
              className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-200"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-purple-500 text-[10px] font-bold text-white">
                {i + 1}
              </span>
              {step}
            </motion.div>
          ))}
        </div>
      </div>

      <p className="rounded-xl bg-purple-50 p-3 text-sm italic text-gray-600 dark:bg-white/5 dark:text-gray-200">
        “{data.learned}”
      </p>

      <StartupQuiz quiz={data.quiz} />

      <TechPills items={data.tech} />

      <a
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-600"
      >
        Visit FinBud <FaExternalLinkAlt className="text-xs" />
      </a>
    </div>
  );
}

function StartupQuiz({ quiz }) {
  const [picked, setPicked] = useState(null);
  const isCorrect = picked != null && quiz.options[picked].correct;

  return (
    <div className="rounded-2xl border border-dashed border-purple-300 p-4 dark:border-purple-700">
      <p className="mb-2 text-sm font-semibold text-gray-800 dark:text-white">
        🧩 Mini challenge: {quiz.question}
      </p>
      <div className="space-y-2">
        {quiz.options.map((opt, i) => {
          const chosen = picked === i;
          const tone = chosen
            ? opt.correct
              ? "border-green-500 bg-green-50 dark:bg-green-900/30"
              : "border-red-400 bg-red-50 dark:bg-red-900/30"
            : "border-transparent bg-gray-100 hover:bg-purple-100 dark:bg-white/5 dark:hover:bg-white/10";
          return (
            <button
              key={opt.text}
              type="button"
              onClick={() => setPicked(i)}
              className={`block w-full rounded-xl border-2 px-3 py-2 text-left text-sm text-gray-700 transition dark:text-gray-200 ${tone}`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
      {picked != null && (
        <motion.p
          className={`mt-2 text-xs font-medium ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-500"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {isCorrect ? quiz.correctNote : quiz.wrongNote}
        </motion.p>
      )}
    </div>
  );
}

function ProjectsContent({ data }) {
  return (
    <div>
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-300">
        Each project is its own route up the wall — tap a card to open it.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {data.projects.map((proj, i) => (
          <motion.div
            key={proj.title}
            className="group overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm dark:border-purple-900/50 dark:bg-white/5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <div className="relative h-28 overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600">
              <img
                src={proj.image}
                alt={proj.title}
                className="h-full w-full object-cover opacity-90 transition group-hover:scale-105"
              />
              <span className="absolute right-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-white">
                {proj.impact}
              </span>
            </div>
            <div className="p-3">
              <h4 className="font-bold text-gray-800 dark:text-white">{proj.title}</h4>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-300">{proj.blurb}</p>
              <div className="mb-2">
                <TechPills items={proj.tech} />
              </div>
              <div className="flex flex-wrap gap-2">
                {proj.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:underline dark:text-purple-300"
                  >
                    {link.label} <FaExternalLinkAlt className="text-[9px]" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PersonalContent({ data }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-200">{data.intro}</p>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {data.facts.map((fact, i) => (
          <motion.div
            key={fact.title}
            className="flex items-start gap-3 rounded-2xl bg-purple-50 p-3 dark:bg-white/5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="text-2xl">{fact.emoji}</span>
            <div>
              <p className="text-sm font-bold text-gray-800 dark:text-white">{fact.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-300">{fact.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {data.photos.map((src) => (
          <div key={src} className="aspect-square overflow-hidden rounded-xl shadow">
            <img src={src} alt="" className="h-full w-full object-cover transition hover:scale-110" />
          </div>
        ))}
      </div>

      <div>
        <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-gray-400">A few traits</p>
        <TechPills items={data.traits} />
      </div>
    </div>
  );
}
