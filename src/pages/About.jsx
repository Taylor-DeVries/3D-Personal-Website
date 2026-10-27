import { motion } from "framer-motion";

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
        I love building.
        I've worked at the intersection of engineering, data, and product strategy: shipping code, digging into user telemetry, and figuring out whats worth building.
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
          {/* Product & Strategy Card */}
          <motion.div
            className="bg-card border-2 border-stone rounded-sm p-6 shadow-[4px_4px_0px_#DCD7CD] hover:shadow-[6px_6px_0px_#1E4631] hover:-translate-x-1 hover:-translate-y-1 transition-all relative"
            initial={{ opacity: 0, y: 20, rotate: -0.5 }}
            animate={{ opacity: 1, y: 0, rotate: -0.5 }}
            whileHover={{ rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Washi tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-forest/20 border border-forest/10 rotate-1 shadow-sm" />
            
            <h4 className="text-xl font-serif font-bold text-ink mb-4">
              Product & Strategy
            </h4>
            <div className="flex flex-wrap gap-2">
              {["User Research & Analyst Interviews", "Adoption Metrics", "Unit Economics Modeling", "Technical Specs & API Contracts", "Figma Prototyping"].map((skill, index) => (
                <span
                  key={index}
                  className="font-mono text-xs bg-white text-ink border border-stone px-2.5 py-1 rounded-sm shadow-[2px_2px_0px_#DCD7CD]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Data & Observability Card */}
          <motion.div
            className="bg-card border-2 border-stone rounded-sm p-6 shadow-[4px_4px_0px_#DCD7CD] hover:shadow-[6px_6px_0px_#2A7B57] hover:-translate-x-1 hover:-translate-y-1 transition-all relative"
            initial={{ opacity: 0, y: 20, rotate: 0.7 }}
            animate={{ opacity: 1, y: 0, rotate: 0.7 }}
            whileHover={{ rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Washi tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-emerald/20 border border-emerald/10 -rotate-1 shadow-sm" />
            
            <h4 className="text-xl font-serif font-bold text-ink mb-4">
              Data & Observability
            </h4>
            <div className="flex flex-wrap gap-2">
              {["SQL", "Python", "Datadog", "Telemetry & Time-Series Visualization", "Fraud & Risk Analytics"].map((skill, index) => (
                <span
                  key={index}
                  className="font-mono text-xs bg-white text-ink border border-stone px-2.5 py-1 rounded-sm shadow-[2px_2px_0px_#DCD7CD]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Engineering Foundation Card */}
          <motion.div
            className="bg-card border-2 border-stone rounded-sm p-6 shadow-[4px_4px_0px_#DCD7CD] hover:shadow-[6px_6px_0px_#D97736] hover:-translate-x-1 hover:-translate-y-1 transition-all relative"
            initial={{ opacity: 0, y: 20, rotate: -0.3 }}
            animate={{ opacity: 1, y: 0, rotate: -0.3 }}
            whileHover={{ rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Washi tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber/20 border border-amber/10 rotate-2 shadow-sm" />
            
            <h4 className="text-xl font-serif font-bold text-ink mb-4">
              Engineering Foundation
            </h4>
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "React / React Native", "Swift", "Ruby on Rails", "C++", "Cloudflare Developer Platform"].map((skill, index) => (
                <span
                  key={index}
                  className="font-mono text-xs bg-white text-ink border border-stone px-2.5 py-1 rounded-sm shadow-[2px_2px_0px_#DCD7CD]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
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
