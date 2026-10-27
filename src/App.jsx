import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import NotebookFlip from "./components/NotebookFlip";

export default function App() {
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

  return (
    <div className="min-h-screen text-ink font-sans relative">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-forest origin-left z-50"
        style={{ scaleX }}
      />

      {/* Simple Navigation - Responsive */}
      <nav className="fixed left-0 right-0 top-0 z-40 border-b-2 border-stone bg-ivory/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <h1 className="text-center font-serif text-xl font-bold text-ink sm:text-left md:text-2xl">
            Taylor DeVries
          </h1>
          <div className="flex w-full items-center justify-center gap-1 sm:w-auto sm:gap-5 md:gap-7">
            <button
              onClick={() => homeRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="whitespace-nowrap px-1.5 font-mono text-[11px] text-muted transition-colors hover:text-forest sm:px-0 sm:text-sm"
            >
              Home
            </button>
            <button
              onClick={() => aboutRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="whitespace-nowrap px-1.5 font-mono text-[11px] text-muted transition-colors hover:text-forest sm:px-0 sm:text-sm"
            >
              About
            </button>
            <button
              onClick={() => projectsRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="whitespace-nowrap px-1.5 font-mono text-[11px] text-muted transition-colors hover:text-forest sm:px-0 sm:text-sm"
            >
              Projects
            </button>
            <button
              onClick={() => experienceRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="whitespace-nowrap px-1.5 font-mono text-[11px] text-muted transition-colors hover:text-forest sm:px-0 sm:text-sm"
            >
              Experience
            </button>
            <button
              onClick={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="whitespace-nowrap px-1.5 font-mono text-[11px] text-muted transition-colors hover:text-forest sm:px-0 sm:text-sm"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 sm:pt-16">
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
          <NotebookFlip />
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
