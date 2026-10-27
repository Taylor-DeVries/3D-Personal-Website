import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

const projects = [
  {
    title: "Taylor's Travel Diary",
    description:
      "A personal travel diary showcasing 392 photos across 9 countries with an interactive 3D globe.",
    link: "https://tays-travel-diary.vercel.app/",
    image: "/images/projects/travel-diary.png",
    technologies: ["Claude", "React", "Vite", "react-globe.gl", "Vercel"],
  },
  {
    title: "F1 Telemetry Dashboard",
    description:
      "Comprehensive F1 telemetry with real-time data visualization and driver performance metrics.",
    link: "https://f1-telemetry-dashboard.vercel.app/",
    image: "/images/projects/f1-dashboard.png",
    technologies: ["React", "TypeScript", "D3.js", "Chart.js", "TailwindCSS"],
  },
  {
    title: "FinBud",
    description:
      "An innovative platform designed to simplify personal finance for young people.",
    link: "https://finbud.ca/",
    image: "/images/projects/finbud.png",
    technologies: ["React", "Next.js", "C#", "DynamoDB", "AWS", "Docker"],
  },
  {
    title: "Personal Finance Dashboard",
    description:
      "A lightweight Streamlit dashboard that visualizes personal spending data.",
    link: "https://personal-dashboard.streamlit.app/",
    image: "/images/projects/dashboard.png",
    technologies: ["Streamlit", "Python", "Pandas", "Matplotlib", "Seaborn"],
  },
  {
    title: "Plant Pal",
    description:
      "A cozy virtual desk plant web app - watch it grow and react to your care in real-time!",
    link: "https://plantpal-relax.vercel.app/",
    image: "/images/projects/plant.png",
    technologies: ["React", "TypeScript", "Vite", "TailwindCSS", "Vercel"],
  },
  {
    title: "Flappy Pal",
    description:
      "A cute, pastel-themed Flappy Bird–style web game.",
    link: "https://flappy-pal.vercel.app/",
    image: "/images/projects/flappy.png",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    title: "Focus Cat",
    description:
      "A minimalist Chrome extension for study/break modes with cat animations.",
    link: "https://github.com/Taylor-DeVries/focus-cat",
    image: "/images/projects/focus.png",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Chrome Extension"],
  },
  {
    title: "AR Headset",
    description:
      "An AR headset that displays resumes beside applicants using facial recognition.",
    link: "https://www.youtube.com/watch?v=sjttNGrEmtk",
    image: "/images/projects/AR.png",
    technologies: ["Unity", "C#", "AR Foundation", "Fusion 360", "Figma"],
  },
  {
    title: "BrainScape",
    description:
      "A virtual study space revolutionizing collaborative learning for students.",
    link: "https://devpost.com/software/brainscape",
    image: "/images/projects/brainscape2.png",
    technologies: ["JavaScript", "Html", "CSS", "Figma", "MLH Winner 🏆"],
  },
  {
    title: "AutoRithm Robot",
    description:
      "Constructed AutoRithm robot made with Lego EV3 that sorts through food items.",
    link: "https://devpost.com/software/handsfree-y7lsbq",
    image: "/images/projects/robot.png",
    technologies: ["Lego EV3", "Robot-C"],
  },
];

// Single page component with high-quality image
const NotebookPage = ({ project, side }) => {
  return (
    <div
      className={`absolute inset-0 flex flex-col ${
        side === "left" ? "items-end pr-12" : "items-start pl-12"
      } p-6 overflow-hidden`}
      style={{
        background: "linear-gradient(to right, #F7F5F0 0%, #FAF9F6 100%)",
        boxShadow: side === "left" 
          ? "inset -20px 0 40px rgba(0,0,0,0.05)" 
          : "inset 20px 0 40px rgba(0,0,0,0.05)",
      }}
    >
      {/* Image container - Fixed height for consistency */}
      <div className="w-full mb-4 bg-white rounded-sm overflow-hidden shadow-md">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-56 object-cover"
          loading="lazy"
        />
      </div>

      {/* Title - Bold */}
      <h3 className="text-lg md:text-xl font-serif font-bold text-ink mb-2 text-center w-full">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-xs md:text-sm text-muted mb-3 text-center w-full line-clamp-3 px-2">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 justify-center w-full mb-3">
        {project.technologies.slice(0, 4).map((tech, i) => (
          <span
            key={i}
            className="font-mono text-[10px] md:text-xs bg-white text-ink border border-stone px-2 py-1 rounded-sm shadow-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Link */}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-xs text-forest hover:text-emerald transition-colors mt-auto text-center"
      >
        View Project →
      </a>
    </div>
  );
};

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const totalPages = Math.ceil(projects.length / 2);
  const containerRef = useRef(null);

  const goToNextPage = () => {
    if (!isAnimating && currentPage < totalPages - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsAnimating(false);
      }, 700);
    }
  };

  const goToPrevPage = () => {
    if (!isAnimating && currentPage > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsAnimating(false);
      }, 700);
    }
  };

  const leftProject = projects[currentPage * 2];
  const rightProject = projects[currentPage * 2 + 1];

  return (
    <section
      id="projects-section"
      className="relative px-4 md:px-6 py-16 min-h-screen flex flex-col items-center"
      style={{ backgroundColor: '#F7F5F0', zIndex: 1 }}
    >
      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-serif font-bold text-ink mb-4 md:mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>

      <motion.p
        className="text-muted text-base md:text-lg mb-8 md:mb-12 text-center max-w-2xl px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Flip through my project notebook
      </motion.p>

      {/* 3D Notebook Container - Responsive */}
      <div 
        className="relative w-full max-w-5xl"
        style={{ perspective: "2500px" }}
        ref={containerRef}
      >
        {/* Notebook */}
        <div
          className="relative bg-card rounded-sm overflow-hidden mx-auto"
          style={{
            width: "100%",
            maxWidth: "900px",
            height: "auto",
            minHeight: "500px",
            aspectRatio: "16/10",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(220, 215, 205, 0.5)",
          }}
        >
          {/* Notebook binding/spine */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-6 md:w-8 -translate-x-1/2 z-20"
            style={{
              background: "linear-gradient(to right, #DCD7CD 0%, #EFECE6 30%, #DCD7CD 50%, #EFECE6 70%, #DCD7CD 100%)",
              boxShadow: "0 0 20px rgba(0,0,0,0.1)",
            }}
          >
            {/* Binding stitches */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-px bg-stone"
                style={{ top: `${(i + 1) * 11}%` }}
              />
            ))}
          </div>

          {/* Left Page (static) */}
          <div
            className="absolute left-0 top-0 bottom-0 overflow-hidden"
            style={{
              width: "calc(50% - 12px)",
              transform: "rotateY(0deg)",
              transformOrigin: "right center",
            }}
          >
            {leftProject && <NotebookPage project={leftProject} side="left" />}
            
            {/* Page edge shadow */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-transparent to-black/5 pointer-events-none" />
          </div>

          {/* Right Page (flippable) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="absolute right-0 top-0 bottom-0 overflow-hidden"
              style={{
                width: "calc(50% - 12px)",
                transformOrigin: "left center",
              }}
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ 
                duration: 0.7, 
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
            >
              {rightProject && <NotebookPage project={rightProject} side="right" />}
              
              {/* Page edge shadow */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-black/5 pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Page edges (book thickness effect) */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{
              background: "repeating-linear-gradient(to right, transparent, transparent 0.5px, #DCD7CD 0.5px, #DCD7CD 1px)",
            }}
          />
        </div>

        {/* Navigation - Responsive */}
        <div className="flex justify-center items-center gap-4 md:gap-6 mt-8 px-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className={`px-4 md:px-6 py-2 font-mono text-xs md:text-sm rounded-sm border-2 border-stone transition-all ${
              currentPage === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-forest hover:text-ivory hover:border-forest shadow-[2px_2px_0px_#DCD7CD] hover:shadow-[3px_3px_0px_#1E4631]"
            }`}
          >
            ← Previous
          </button>

          <span className="font-mono text-xs md:text-sm text-muted flex items-center">
            Page {currentPage + 1} of {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            className={`px-4 md:px-6 py-2 font-mono text-xs md:text-sm rounded-sm border-2 border-stone transition-all ${
              currentPage === totalPages - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-forest hover:text-ivory hover:border-forest shadow-[2px_2px_0px_#DCD7CD] hover:shadow-[3px_3px_0px_#1E4631]"
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
