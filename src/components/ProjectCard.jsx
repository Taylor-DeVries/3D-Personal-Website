import { motion } from "framer-motion";
import { getPerspectiveTags } from "../data/perspectiveMapping";

export default function ProjectCard({
  project,
  index,
  activePerspective,
  blueprintMode,
}) {
  const perspectiveTags = getPerspectiveTags(
    project.technologies,
    project.description
  );

  const isHighlighted =
    activePerspective === "all" || perspectiveTags.includes(activePerspective);

  return (
    <motion.div
      className={`bg-card border border-stone rounded-sm overflow-hidden transition-all duration-300 ${
        isHighlighted ? "ring-2 ring-forest ring-opacity-50" : "opacity-60"
      } hover:shadow-lg hover:border-forest`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isHighlighted ? 1 : 0.6, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      layout
    >
      {/* Spec Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-stone bg-card">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-serif text-xl font-bold text-ink">
            {project.title}
          </h3>
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-forest hover:text-emerald transition-colors underline"
          >
            View Project →
          </a>
        )}
      </div>

      {/* Content */}
      <div className="px-5 py-4">
        <p className="text-muted text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Image Preview */}
        {project.image && (
          <div className="my-4 rounded-sm overflow-hidden border border-stone bg-white/50">
            <div className="flex items-center gap-2 px-3 py-2 bg-card border-b border-stone">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
              <span className="font-mono text-xs text-muted ml-2">
                preview.png
              </span>
            </div>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="font-mono text-xs bg-mint text-forest border border-emerald/20 px-2.5 py-1 rounded-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Blueprint Mode: Show Perspective Tags */}
        {blueprintMode && perspectiveTags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-stone">
            <span className="font-mono text-xs text-muted block mb-2">
              Perspective Tags:
            </span>
            <div className="flex gap-2">
              {perspectiveTags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs bg-amber/10 text-amber border border-amber/30 px-2 py-1 rounded-sm"
                >
                  {tag === "product"
                    ? "🎯 Product"
                    : tag === "data"
                    ? "📊 Data"
                    : "⚡ Engineering"}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
