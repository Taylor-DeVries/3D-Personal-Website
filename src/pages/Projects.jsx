import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const projects = [
  {
    title: "FinBud",
    description:
      "FinBud is an innovative platform designed to simplify personal finance for young people. It offers an easy-to-use interface that guides users through their financial journey with step-by-step instructions.",
    link: "https://finbud.ca/",
    image: "/images/projects/finbud.png",
    technologies: [
      "React",
      "Next.js",
      "C#",
      "DynamoDB",
      "Auth0",
      "TailwindCSS",
      "AWS",
      "Docker",
    ],
  },
  {
    title: "Personal Finance Dashboard",
    description:
      "A lightweight Streamlit dashboard that visualizes personal spending data. Users can upload a CSV of expenses to explore trends by category, track total spending over time, and filter by custom date ranges, all in an interactive, browser-based app.",
    link: "https://personal-dashboard.streamlit.app/",
    image: "/images/projects/dashboard.png",
    technologies: ["Streamlit", "Python", "Pandas", "Matplotlib", "Seaborn"],
  },
  {
    title: "Plant Pal",
    description:
      "Plant Pal is a cozy virtual desk plant web app built with React, TypeScript, and Tailwind CSS. Take care of your plant while you study or work—watch it grow and react to your care in real-time!",
    link: "https://plantpal-relax.vercel.app/",
    image: "/images/projects/plant.png",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "TailwindCSS",
      "Local Storage",
      "Vercel",
    ],
  },
  {
    title: "Flappy Pal",
    description:
      "A cute, pastel-themed Flappy Bird–style web game built with React, TypeScript, and Tailwind CSS. Tap or press space to flap your way through pink pixel pipes and beat your high score!",
    link: "https://flappy-pal.vercel.app/",
    image: "/images/projects/flappy.png",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    title: "Focus Cat",
    description:
      "Focus Cat is a minimalist Chrome extension that lets you switch between study and break modes, complete with a visual timer, cat moods, and adorable animations.",
    link: "https://github.com/Taylor-DeVries/focus-cat",
    image: "/images/projects/focus.png",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Chrome Extension"],
  },
  {
    title: "AR Headset",
    description:
      "Made for the SE101 course, this AR headset displays resumes next to job applicants. It uses facial recognition and AR technology to enhance the hiring process.",
    link: "https://www.youtube.com/watch?v=sjttNGrEmtk",
    image: "/images/projects/AR.png",
    technologies: ["Unity", "C#", "AR Foundation", "Fusion 360", "Figma"],
  },
  {
    title: "BrainScape - MLH Winner 🏆",
    description:
      "a virtual study space revolutionizing collaborative learning. BrainScape fosters a dynamic online environment for students in the same courses to study together. ",
    link: "https://devpost.com/software/brainscape",
    image: "/images/projects/brainscape2.png",
    technologies: ["JavaScript", "Html", "CSS", "Figma"],
  },
  {
    title: "AutoRithm Robot - WiE Hackathon",
    description:
      "Constructed AutoRithm robot made with Lego EV3 coded in robot-c that sorts through food items and autonomizes food packaging.",
    link: "https://devpost.com/software/handsfree-y7lsbq",
    image: "/images/projects/robot.png",
    technologies: ["Lego EV3", "Robot-C"],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const autoScrollInterval = useRef(null);
  const autoScrollPaused = useRef(false);
  const AUTO_SCROLL_SPEED = 1.2; // px per frame
  const AUTO_SCROLL_PAUSE_DURATION = 2000; // ms

  // Auto-scroll logic
  useEffect(() => {
    let frameId;
    function autoScroll() {
      if (!autoScrollPaused.current && scrollRef.current) {
        scrollRef.current.scrollLeft += AUTO_SCROLL_SPEED;
        // Loop scroll
        if (
          scrollRef.current.scrollLeft + scrollRef.current.offsetWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      frameId = requestAnimationFrame(autoScroll);
    }
    frameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Drag-to-scroll logic
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onMouseDown = (e) => {
      isDragging.current = true;
      dragStartX.current = e.pageX - container.offsetLeft;
      scrollStartX.current = container.scrollLeft;
      autoScrollPaused.current = true;
      container.classList.add("cursor-grabbing");
    };
    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const x = e.pageX - container.offsetLeft;
      const walk = (dragStartX.current - x);
      container.scrollLeft = scrollStartX.current + walk;
    };
    const onMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        container.classList.remove("cursor-grabbing");
        // Resume auto-scroll after a delay
        setTimeout(() => {
          autoScrollPaused.current = false;
        }, AUTO_SCROLL_PAUSE_DURATION);
      }
    };
    // Touch events
    const onTouchStart = (e) => {
      isDragging.current = true;
      dragStartX.current = e.touches[0].pageX - container.offsetLeft;
      scrollStartX.current = container.scrollLeft;
      autoScrollPaused.current = true;
      container.classList.add("cursor-grabbing");
    };
    const onTouchMove = (e) => {
      if (!isDragging.current) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (dragStartX.current - x);
      container.scrollLeft = scrollStartX.current + walk;
    };
    const onTouchEnd = () => {
      if (isDragging.current) {
        isDragging.current = false;
        container.classList.remove("cursor-grabbing");
        setTimeout(() => {
          autoScrollPaused.current = false;
        }, AUTO_SCROLL_PAUSE_DURATION);
      }
    };
    // Mouse events
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);
    container.addEventListener("mouseup", onMouseUp);
    // Touch events
    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchmove", onTouchMove);
    container.addEventListener("touchend", onTouchEnd);
    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const projectVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const modalVariants = {
    hidden: { 
      scale: 0.8,
      opacity: 0,
      borderRadius: "50%"
    },
    visible: { 
      scale: 1,
      opacity: 1,
      borderRadius: "20px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      borderRadius: "50%",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section id="projects-section" className="relative py-8 px-6 flex flex-col items-center overflow-hidden">
      <motion.h2
        className="text-4xl font-semibold text-[#333] dark:text-[#f5f4f2] mt-6 mb-2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>
      <motion.p
        className="text-gray-600 dark:text-gray-300 mb-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Scroll through and click on projects to learn more
      </motion.p>

      <div className="relative w-full overflow-x-auto overflow-y-hidden hide-scrollbar" ref={scrollRef} style={{ cursor: 'grab', WebkitOverflowScrolling: 'touch' }}>
        <div className="flex gap-12 py-4 whitespace-nowrap select-none">
          {projects.concat(projects).map((project, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center w-48 cursor-pointer"
              variants={projectVariants}
              whileHover="hover"
              onClick={() => {
                setSelectedProject(project);
                setIsExpanded(true);
              }}
            >
              <div className="relative w-48 h-48 mb-3">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
              <h3 className="text-center font-semibold text-gray-800 dark:text-white text-base">
                {project.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              className="bg-white dark:bg-[#333] rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  {selectedProject.title}
                </h3>
                <motion.button
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsExpanded(false)}
                >
                  ✕
                </motion.button>
              </div>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 dark:text-[#f5f4f2] mb-4">
                {selectedProject.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-100 text-sm font-medium rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <motion.a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Project
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
