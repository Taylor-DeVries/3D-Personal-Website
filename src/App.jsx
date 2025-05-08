import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaInfoCircle } from "react-icons/fa";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode === "true") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f4f2] dark:bg-[#1a1a1a] text-[#333] dark:text-[#f5f4f2] font-sans">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-400 origin-left z-50"
        style={{ scaleX }}
      />
      
      <nav className="p-4 bg-purple-400 text-[#f5f4f2] dark:text-[#333] shadow-lg fixed top-0 left-0 w-full z-20 flex justify-between items-center">
        <motion.button
          className="sm:hidden text-lg font-bold hover:text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ☰
        </motion.button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="sm:hidden absolute top-16 left-0 w-full bg-purple-400 p-4 shadow-lg"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <div className="flex flex-col space-y-4">
                <motion.button
                  onClick={() => scrollToSection(homeRef)}
                  className="text-lg font-bold hover:text-gray-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Home
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection(aboutRef)}
                  className="text-lg font-bold hover:text-gray-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  About
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection(projectsRef)}
                  className="text-lg font-bold hover:text-gray-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Projects
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection(experienceRef)}
                  className="text-lg font-bold hover:text-gray-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Experience
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection(contactRef)}
                  className="text-lg font-bold hover:text-gray-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden sm:flex space-x-4">
          <motion.button
            onClick={() => scrollToSection(homeRef)}
            className="text-lg font-bold hover:text-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.button>
          <motion.button
            onClick={() => scrollToSection(aboutRef)}
            className="text-lg font-bold hover:text-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </motion.button>
          <motion.button
            onClick={() => scrollToSection(projectsRef)}
            className="text-lg font-bold hover:text-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Projects
          </motion.button>
          <motion.button
            onClick={() => scrollToSection(experienceRef)}
            className="text-lg font-bold hover:text-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Experience
          </motion.button>
          <motion.button
            onClick={() => scrollToSection(contactRef)}
            className="text-lg font-bold hover:text-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact
          </motion.button>
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            className="relative"
            onMouseEnter={() => {
              if (window.innerWidth >= 640) { 
                setShowInfoPopup(true);
              }
            }}
            onMouseLeave={() => {
              if (window.innerWidth >= 640) { 
                setShowInfoPopup(false);
              }
            }}
            onClick={() => setShowInfoPopup(!showInfoPopup)}
          >
            <FaInfoCircle className="text-2xl cursor-help" />
            <AnimatePresence>
              {showInfoPopup && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-64 p-3 bg-white dark:bg-[#333] rounded-lg shadow-lg text-sm text-gray-600 dark:text-[#f5f4f2]"
                >
                  Feel free to click and drag the 3D objects for fun effects!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <input
              type="checkbox"
              className="peer sr-only opacity-0"
              id="toggle"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <label
              htmlFor="toggle"
              className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-[#333] peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-[#333]"
            >
              <span className="sr-only">Enable</span>
              <div className="absolute top-0.2 left-0 dark:left-5 w-6 h-6 rounded-full shadow-md flex items-center justify-center transform transition-transform peer-checked:translate-x-5">
                {darkMode ? (
                  <FaSun className="text-yellow-600" size={12} />
                ) : (
                  <FaMoon className="text-purple-600" size={12} />
                )}
              </div>
            </label>
          </motion.div>
        </div>
      </nav>

      <main className="pt-16">
        <motion.section
          ref={homeRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Home />
        </motion.section>

        <motion.section
          ref={aboutRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <About />
        </motion.section>

        <motion.section
          ref={projectsRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Projects />
        </motion.section>

        <motion.section
          ref={experienceRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Experience />
        </motion.section>

        <motion.section
          ref={contactRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Contact />
        </motion.section>
      </main>
    </div>
  );
}
