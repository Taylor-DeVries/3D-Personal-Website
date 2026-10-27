import { motion } from "framer-motion";
import { bio, toolkit } from "../data/portfolioData";

// Hand-drawn underline SVG
const UnderlineDoodle = () => (
  <svg width="200" height="20" viewBox="0 0 200 20" fill="none" className="text-emerald">
    <path
      d="M5 15C40 10 80 18 120 12C160 6 195 15 195 15"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export default function About() {
  const galleryImages = [
    "/images/gallery/cat.png",
    "/images/gallery/city.png",
    "/images/gallery/rome.png",
    "/images/gallery/waterfall.png",
    "/images/gallery/waterloo.png",
    "/images/gallery/velocity.png",
  ];

  return (
    <section
      id="about-section"
      className="relative min-h-screen px-6 py-16 flex flex-col items-center"
      style={{ backgroundColor: "transparent", zIndex: 1 }}
    >
      {/* Title with serif font */}
      <motion.h2
        className="text-5xl font-serif font-bold text-ink mb-6 z-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      {/* Decorative underline */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-8"
      >
        <UnderlineDoodle />
      </motion.div>

      {/* Bio text */}
      <motion.p
        className="text-base md:text-lg text-muted max-w-3xl text-center mb-12 z-10 leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {bio}
      </motion.p>

      {/* Action buttons with notebook style */}
      <div className="flex flex-row items-center justify-center gap-4 mb-16 z-10 flex-wrap">
        <motion.button
          className="px-6 py-3 bg-forest text-ivory font-semibold rounded-sm shadow-[3px_3px_0px_#DCD7CD] hover:shadow-[5px_5px_0px_#1E4631] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all font-mono text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Contact me
        </motion.button>
        <motion.button
          className="px-6 py-3 bg-emerald text-ivory font-semibold rounded-sm shadow-[3px_3px_0px_#DCD7CD] hover:shadow-[5px_5px_0px_#2A7B57] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all font-mono text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={() => document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          My projects
        </motion.button>
        <motion.button
          className="px-6 py-3 bg-amber text-ivory font-semibold rounded-sm shadow-[3px_3px_0px_#DCD7CD] hover:shadow-[5px_5px_0px_#D97736] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all font-mono text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onClick={() => document.getElementById('experience-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          My experience
        </motion.button>
      </div>

      {/* How I Work Section */}
      <div className="w-full max-w-5xl mb-16 z-10">
        <motion.h3
          className="text-4xl font-serif font-bold text-ink mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          How I Work
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {toolkit.map((group, groupIndex) => {
            const cardStyles = [
              {
                rotate: -0.5,
                hoverShadow: "hover:shadow-[6px_6px_0px_#1E4631]",
                tape: "bg-forest/20 border-forest/10 rotate-1",
              },
              {
                rotate: 0.7,
                hoverShadow: "hover:shadow-[6px_6px_0px_#2A7B57]",
                tape: "bg-emerald/20 border-emerald/10 -rotate-1",
              },
              {
                rotate: -0.3,
                hoverShadow: "hover:shadow-[6px_6px_0px_#D97736]",
                tape: "bg-amber/20 border-amber/10 rotate-2",
              },
            ][groupIndex % 3];

            return (
              <motion.div
                key={group.title}
                className={`bg-card border-2 border-stone rounded-sm p-6 shadow-[4px_4px_0px_#DCD7CD] ${cardStyles.hoverShadow} hover:-translate-x-1 hover:-translate-y-1 transition-all relative`}
                initial={{ opacity: 0, y: 20, rotate: cardStyles.rotate }}
                animate={{ opacity: 1, y: 0, rotate: cardStyles.rotate }}
                whileHover={{ rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + groupIndex * 0.2 }}
              >
                {/* Washi tape */}
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 border shadow-sm ${cardStyles.tape}`}
                />

                <h4 className="text-xl font-serif font-bold text-ink mb-4">
                  {group.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs bg-white text-ink border border-stone px-2.5 py-1 rounded-sm shadow-[2px_2px_0px_#DCD7CD]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Photo Gallery - Scrapbook style */}
      <div className="w-full max-w-5xl mb-16 z-10">
        <motion.h3
          className="text-4xl font-serif font-bold text-ink mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Adventures
        </motion.h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => {
            const rotations = [-2, 1.5, -1, 2, -1.5, 1];
            return (
              <motion.div
                key={index}
                className="relative bg-white p-3 shadow-[4px_4px_0px_#DCD7CD] hover:shadow-[6px_6px_0px_#1E4631] transition-all"
                style={{ rotate: rotations[index] }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Paperclip effect */}
                <div className="absolute -top-2 right-4 w-3 h-8 border-2 border-stone rounded-sm" />
                
                <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-white">
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
