import { motion } from "framer-motion";
import { experiences } from "../data/portfolioData";

export default function Experience() {
  return (
    <section
      id="experience-section"
      className="relative px-4 md:px-6 py-16"
      style={{ backgroundColor: 'transparent', zIndex: 1 }}
    >
      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-serif font-bold text-ink mb-8 md:mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Experience
      </motion.h2>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-stone hidden sm:block" />

        {/* Experience items */}
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            className="relative pl-8 md:pl-20 mb-8 md:mb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Timeline dot */}
            <div className="absolute left-2 md:left-6 top-6 w-4 md:w-5 h-4 md:h-5 bg-forest rounded-full border-4 border-ivory shadow-md hidden sm:block" />

            {/* Card */}
            <motion.div
              className="bg-card border-2 border-stone rounded-sm p-4 md:p-6 shadow-[3px_3px_0px_#DCD7CD] md:shadow-[4px_4px_0px_#DCD7CD] hover:shadow-[4px_4px_0px_#1E4631] md:hover:shadow-[6px_6px_0px_#1E4631] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                {/* Company logo - Fixed size for consistency */}
                <div className="flex-shrink-0 w-24 h-24 md:w-36 md:h-28 bg-white p-2 md:p-3 rounded-sm border border-stone shadow-sm mx-auto sm:mx-0">
                  <img
                    src={experience.image}
                    alt={experience.company}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                  {/* Title - Bold */}
                  <h3 className="text-lg md:text-xl font-serif font-bold text-ink mb-1 text-center sm:text-left">
                    {experience.title}
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                    <span className="font-bold text-forest text-center sm:text-left">
                      {experience.company}
                    </span>
                    {experience.team && (
                      <>
                        <span className="text-stone hidden sm:inline">•</span>
                        <span className="text-muted text-sm text-center sm:text-left">
                          {experience.team}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <span className="font-mono text-xs text-muted block text-center sm:text-left mb-3">
                    {experience.duration}
                  </span>

                  {/* Tech tags - Responsive */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center sm:justify-start">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="font-mono text-[10px] md:text-xs bg-white text-ink border border-stone px-2 py-1 rounded-sm shadow-[1px_1px_0px_#DCD7CD]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
