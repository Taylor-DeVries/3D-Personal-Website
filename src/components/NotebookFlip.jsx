import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "Taylor's Travel Diary",
    description:
      "An interactive 3D globe with photo journals from 9 countries — spin, zoom, and click a pin to explore travels.",
    link: "https://tays-travel-diary.vercel.app/",
    image: "/images/projects/travel-diary.png",
    width: 3328,
    height: 2082,
    technologies: ["React", "Vite", "react-globe.gl", "Vercel"],
  },
  {
    title: "F1 Telemetry Dashboard",
    description:
      "Real-time F1 telemetry: speed, RPM, throttle, brake and track mapping with live driver performance metrics.",
    link: "https://f1-telemetry-dashboard.vercel.app/",
    image: "/images/projects/f1-dashboard.png",
    width: 1372,
    height: 1570,
    technologies: ["React", "TypeScript", "D3.js", "Chart.js"],
  },
  {
    title: "FinBud",
    description:
      "A platform that simplifies personal finance for young people with a decision-tree model for tailored advice.",
    link: "https://finbud.ca/",
    image: "/images/projects/finbud.png",
    width: 2381,
    height: 1331,
    technologies: ["React", "Next.js", "C#", "DynamoDB", "AWS"],
  },
  {
    title: "Personal Finance Dashboard",
    description:
      "A lightweight Streamlit dashboard that visualizes personal spending data with interactive charts.",
    link: "https://personal-dashboard.streamlit.app/",
    image: "/images/projects/dashboard.png",
    width: 2233,
    height: 1146,
    technologies: ["Streamlit", "Python", "Pandas", "Matplotlib"],
  },
  {
    title: "Plant Pal",
    description:
      "A cozy virtual desk plant that grows as you focus and work — watch it react to your care in real-time!",
    link: "https://plantpal-relax.vercel.app/",
    image: "/images/projects/plant.png",
    width: 1874,
    height: 960,
    technologies: ["React", "TypeScript", "Vite", "Tailwind"],
  },
  {
    title: "Flappy Pal",
    description:
      "A cute, pastel Flappy Bird–style web game — tap or press space to flap through pixel pipes.",
    link: "https://flappy-pal.vercel.app/",
    image: "/images/projects/flappy.png",
    width: 2385,
    height: 1331,
    technologies: ["React", "TypeScript", "Tailwind", "Vercel"],
  },
  {
    title: "Focus Cat",
    description:
      "A minimalist Chrome extension for study/break modes with a cat companion that keeps you on track.",
    link: "https://github.com/Taylor-DeVries/focus-cat",
    image: "/images/projects/focus.png",
    width: 1242,
    height: 554,
    technologies: ["React", "TypeScript", "Tailwind", "Chrome Extension"],
  },
  {
    title: "AR Headset",
    description:
      "An AR headset that shows resumes beside applicants using facial recognition technology.",
    link: "https://www.youtube.com/watch?v=sjttNGrEmtk",
    image: "/images/projects/AR.png",
    width: 920,
    height: 359,
    technologies: ["Unity", "C#", "AR Foundation", "Fusion 360"],
  },
  {
    title: "BrainScape",
    description:
      "A virtual study space revolutionizing collaborative learning for students with real-time features.",
    link: "https://devpost.com/software/brainscape",
    image: "/images/projects/brainscape2.png",
    width: 2396,
    height: 1321,
    technologies: ["JavaScript", "HTML", "CSS", "Figma"],
  },
  {
    title: "AutoRithm Robot",
    description:
      "A Lego EV3 robot that sorts through food items using automated sorting algorithms.",
    link: "https://devpost.com/software/handsfree-y7lsbq",
    image: "/images/projects/robot.png",
    width: 1164,
    height: 723,
    technologies: ["Lego EV3", "Robot-C"],
  },
];

function ProjectImage({ project }) {
  return (
    <div className="notebook-image-frame">
      <img
        src={project.image}
        alt={`${project.title} preview`}
        width={project.width}
        height={project.height}
        loading="lazy"
        decoding="async"
        className="notebook-project-image"
      />
    </div>
  );
}

function ProjectPage({ project }) {
  if (!project) {
    return (
      <div className="notebook-page notebook-blank-page">
        <span className="font-handwriting text-2xl text-muted">More to come...</span>
      </div>
    );
  }

  return (
    <article className="notebook-page">
      <div className="mb-3 flex items-center justify-between gap-3 border-b border-stone pb-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Project note
        </span>
        <span className="font-mono text-[10px] text-muted">{project.title}</span>
      </div>

      <ProjectImage project={project} />

      <div className="mt-4 flex min-h-0 flex-1 flex-col">
        <h3 className="font-serif text-2xl font-bold leading-tight text-ink md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted md:text-base">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-sm border border-emerald/20 bg-mint px-2 py-1 font-mono text-[10px] text-forest md:text-xs"
            >
              {technology}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-5 font-mono text-xs font-semibold text-forest transition-colors hover:text-emerald"
        >
          Open project ↗
        </a>
      </div>
    </article>
  );
}

function BackCover() {
  return (
    <div className="notebook-back-cover flex h-full flex-col items-center justify-center p-8 text-center text-ivory">
      <div className="mb-5 text-4xl">✦</div>
      <h3 className="font-serif text-3xl font-bold">End of the notebook</h3>
      <p className="mt-3 max-w-xs font-mono text-xs leading-5 text-ivory/75">
        Thanks for looking through my projects.
      </p>
    </div>
  );
}

function BookCover({ isOpen, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      disabled={isOpen}
      className="notebook-front-cover absolute inset-0 z-30 flex h-full w-full flex-col items-center justify-center p-8 text-center text-ivory"
      style={{
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        pointerEvents: isOpen ? "none" : "auto",
      }}
      initial={false}
      animate={{ rotateY: isOpen ? -180 : 0 }}
      transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
      whileHover={isOpen ? undefined : { translateY: -2 }}
      aria-label="Open My Projects notebook"
    >
      <span className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-ivory/70">
        Field notebook 01
      </span>
      <div className="mb-6 text-6xl leading-none">▤</div>
      <h3 className="font-serif text-5xl font-bold leading-none md:text-6xl">My Projects</h3>
      <p className="mt-5 font-handwriting text-2xl text-ivory/80">open to explore</p>
      <span className="absolute bottom-8 font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/60">
        Taylor DeVries
      </span>
    </motion.button>
  );
}

function TurningPage({
  direction,
  currentProject,
  nextProject,
  mobileCurrentProject,
  mobileNextProject,
  onComplete,
}) {
  const isNext = direction === "next";

  return (
    <motion.div
      className={`absolute inset-y-0 z-20 w-full md:w-1/2 ${isNext ? "right-0" : "left-0"}`}
      style={{
        transformOrigin: isNext ? "left center" : "right center",
        transformStyle: "preserve-3d",
      }}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isNext ? -180 : 180 }}
      transition={{ duration: 0.72, ease: [0.22, 0.61, 0.36, 1] }}
      onAnimationComplete={onComplete}
    >
      <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
        <div className="hidden h-full md:block">
          <ProjectPage project={isNext ? currentProject : currentProject} />
        </div>
        <div className="h-full md:hidden">
          <ProjectPage project={mobileCurrentProject} />
        </div>
      </div>
      <div
        className="absolute inset-0"
        style={{
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="hidden h-full md:block">
          <ProjectPage project={nextProject} />
        </div>
        <div className="h-full md:hidden">
          <ProjectPage project={mobileNextProject} />
        </div>
      </div>
    </motion.div>
  );
}

export default function NotebookFlip() {
  const [isOpen, setIsOpen] = useState(false);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [mobilePageIndex, setMobilePageIndex] = useState(0);
  const [turn, setTurn] = useState(null);
  const [showBackCover, setShowBackCover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const totalSpreads = Math.ceil(projects.length / 2);
  const leftProject = projects[spreadIndex * 2];
  const rightProject = projects[spreadIndex * 2 + 1];
  const mobileProject = projects[mobilePageIndex];
  const atLastSpread = spreadIndex === totalSpreads - 1;
  const atLastMobilePage = mobilePageIndex === projects.length - 1;
  const atBeginning = isMobile ? mobilePageIndex === 0 : spreadIndex === 0;
  const atEnd = isMobile ? atLastMobilePage : atLastSpread;
  const isBusy = Boolean(turn);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener?.("change", updateViewport);
    return () => mediaQuery.removeEventListener?.("change", updateViewport);
  }, []);

  const openBook = () => {
    setIsOpen(true);
    setShowBackCover(false);
    setSpreadIndex(0);
    setMobilePageIndex(0);
  };

  const closeBook = () => {
    if (isBusy) return;
    setIsOpen(false);
    setShowBackCover(false);
    setSpreadIndex(0);
    setMobilePageIndex(0);
  };

  const finishTurn = () => {
    if (!turn) return;
    if (turn.mode === "mobile") {
      setMobilePageIndex(turn.targetIndex);
    } else {
      setSpreadIndex(turn.targetIndex);
    }
    setTurn(null);
  };

  const nextPage = () => {
    if (!isOpen || isBusy) return;
    if (atEnd) {
      setShowBackCover(true);
      return;
    }

    if (isMobile) {
      setTurn({
        mode: "mobile",
        direction: "next",
        currentProject: rightProject ?? leftProject,
        nextProject: projects[spreadIndex * 2 + 2],
        mobileCurrentProject: mobileProject,
        mobileNextProject: projects[mobilePageIndex + 1],
        targetIndex: mobilePageIndex + 1,
      });
      return;
    }

    setTurn({
      mode: "desktop",
      direction: "next",
      currentProject: rightProject ?? leftProject,
      nextProject: projects[(spreadIndex + 1) * 2],
      mobileCurrentProject: leftProject,
      mobileNextProject: projects[(spreadIndex + 1) * 2],
      targetIndex: spreadIndex + 1,
    });
  };

  const previousPage = () => {
    if (!isOpen || isBusy) return;
    if (showBackCover) {
      setShowBackCover(false);
      return;
    }
    if (atBeginning) return;

    if (isMobile) {
      setTurn({
        mode: "mobile",
        direction: "previous",
        currentProject: mobileProject,
        nextProject: projects[mobilePageIndex - 1],
        mobileCurrentProject: mobileProject,
        mobileNextProject: projects[mobilePageIndex - 1],
        targetIndex: mobilePageIndex - 1,
      });
      return;
    }

    setTurn({
      mode: "desktop",
      direction: "previous",
      currentProject: leftProject,
      nextProject: projects[(spreadIndex - 1) * 2 + 1],
      mobileCurrentProject: leftProject,
      mobileNextProject: projects[(spreadIndex - 1) * 2 + 1],
      targetIndex: spreadIndex - 1,
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;
      if (event.key === "ArrowRight") nextPage();
      if (event.key === "ArrowLeft") previousPage();
      if (event.key === "Escape") closeBook();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <section
      id="projects-section"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 md:px-6"
      style={{ backgroundColor: "transparent", zIndex: 1 }}
    >
      <motion.h2
        className="text-center font-serif text-4xl font-bold text-ink md:text-5xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Projects
      </motion.h2>
        {isOpen ? (
          <p className="mb-8 mt-4 max-w-xl text-center text-sm leading-6 text-muted md:mb-10 md:text-base">
            {isMobile
              ? "Use the arrows or buttons to turn one project page at a time."
              : "Use the arrows or buttons to turn two brand-new project pages at a time."}
          </p>
        ) : (
          <p className="mb-8 mt-4 max-w-xl text-center text-sm leading-6 text-muted md:mb-10 md:text-base">
            Open the notebook to explore the projects.
          </p>
        )}

      <div className="notebook-stage w-full max-w-5xl" style={{ perspective: "1800px" }}>
        <div className="notebook-book relative mx-auto h-[560px] w-full max-w-[900px] md:h-[600px]">
          <div className="notebook-page-stack absolute inset-0" aria-hidden="true" />

          <div className="notebook-spread absolute inset-0 z-10">
            <div className="absolute inset-y-0 left-0 hidden w-1/2 md:block">
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={`left-project-${spreadIndex}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                >
                  <ProjectPage project={leftProject} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute inset-y-0 right-0 w-full md:w-1/2">
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={showBackCover ? "back-cover" : isMobile ? `mobile-project-${mobilePageIndex}` : `right-project-${spreadIndex}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                >
                  {showBackCover ? <BackCover /> : <ProjectPage project={isMobile ? mobileProject : rightProject} />}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="notebook-gutter absolute inset-y-0 left-1/2 hidden w-5 -translate-x-1/2 md:block" />
          </div>

          <AnimatePresence initial={false}>
            {turn && (
              <TurningPage
                key={`${turn.direction}-${turn.targetIndex}`}
                direction={turn.direction}
                currentProject={turn.currentProject}
                nextProject={turn.nextProject}
                mobileCurrentProject={turn.mobileCurrentProject}
                mobileNextProject={turn.mobileNextProject}
                onComplete={finishTurn}
              />
            )}
          </AnimatePresence>

          <BookCover isOpen={isOpen} onOpen={openBook} />

          {isOpen && (
            <button
              type="button"
              onClick={closeBook}
              className="absolute -top-3 right-3 z-40 rounded-sm border border-stone bg-ivory px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted shadow-[2px_2px_0px_#DCD7CD] transition hover:text-forest md:right-5"
            >
              Close notebook
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-5">
          <button
            type="button"
            onClick={previousPage}
            disabled={atBeginning && !showBackCover || isBusy}
            className="notebook-control"
          >
            ← Previous
          </button>
          <span className="font-mono text-xs text-muted md:text-sm">
            {isMobile
              ? `Page ${mobilePageIndex + 1} / ${projects.length}`
              : `Spread ${spreadIndex + 1} / ${totalSpreads}`}
          </span>
          <button
            type="button"
            onClick={showBackCover ? closeBook : nextPage}
            disabled={isBusy}
            className="notebook-control"
          >
            {showBackCover ? "Close book" : atEnd ? "Finish →" : "Next →"}
          </button>
        </div>
      )}
    </section>
  );
}
