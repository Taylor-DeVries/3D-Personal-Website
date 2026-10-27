import { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { projects } from "../data/portfolioData";

/**
 * Projects-only fieldbook. Bio, toolkit, experience and contact all live in
 * their own sections of the site — this notebook is purely a project showcase.
 *
 * page-flip pairs landscape spreads as [0], [1,2], [3,4], ... when showCover is
 * on, so every LEFT page sits on an odd index and every RIGHT page on an even
 * one. Each project therefore occupies exactly one spread:
 *
 *   0            front hardcover (alone)
 *   1 / 2        project 01 story | project 01 visual
 *   3 / 4        project 02 story | project 02 visual
 *   ...
 *   19 / 20      project 10 story | project 10 visual
 *   21           back hardcover (alone)
 */
const PROJECTS_START = 1;
const projectStoryPage = (index) => PROJECTS_START + index * 2;
const BACK_COVER_PAGE = PROJECTS_START + projects.length * 2;
const TOTAL_PAGES = BACK_COVER_PAGE + 1;

const pad = (value) => String(value).padStart(2, "0");

// Interactive children must not let page-flip treat the gesture as a page drag.
const stopFlip = {
  onPointerDown: (event) => event.stopPropagation(),
  onMouseDown: (event) => event.stopPropagation(),
  onTouchStart: (event) => event.stopPropagation(),
};

function TagList({ items }) {
  if (!items?.length) return null;

  return (
    <div className="fieldbook-tags">
      {items.map((item) => (
        <span key={item} className="fieldbook-tag">
          {item}
        </span>
      ))}
    </div>
  );
}

/** A soft, turnable paper page. */
const PaperPage = forwardRef(function PaperPage({ children, folio, side = "right" }, ref) {
  return (
    <div className="fieldbook-page" ref={ref} data-density="soft">
      <div className="fieldbook-page__sheet">
        <div className="fieldbook-page__body">{children}</div>
        {folio ? (
          <span className={`fieldbook-folio fieldbook-folio--${side}`}>{folio}</span>
        ) : null}
      </div>
    </div>
  );
});

/** A rigid cover board. */
const CoverPage = forwardRef(function CoverPage({ children, variant = "front" }, ref) {
  return (
    <div
      className={`fieldbook-cover fieldbook-cover--${variant}`}
      ref={ref}
      data-density="hard"
    >
      <div className="fieldbook-cover__board">{children}</div>
    </div>
  );
});

export default function Notebook3D() {
  const bookRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [hasTurned, setHasTurned] = useState(false);

  const isClosed = currentPage === 0;

  const getFlip = useCallback(() => {
    const api = bookRef.current?.pageFlip?.();
    return api && typeof api.flip === "function" ? api : null;
  }, []);

  const flipNext = useCallback(() => getFlip()?.flipNext(), [getFlip]);
  const flipPrev = useCallback(() => getFlip()?.flipPrev(), [getFlip]);

  const handleFlip = useCallback((event) => {
    setCurrentPage(event.data);
    setHasTurned(true);
  }, []);

  // Arrow keys only act once the notebook itself has focus, so they never
  // hijack normal page scrolling.
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        flipNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        flipPrev();
      }
    },
    [flipNext, flipPrev]
  );

  const spreadLabel = useMemo(() => {
    if (isClosed) return "Front cover";
    if (currentPage >= BACK_COVER_PAGE) return "Back cover";

    const projectIndex = Math.floor((currentPage - PROJECTS_START) / 2);
    const project = projects[projectIndex];
    return project
      ? `${pad(projectIndex + 1)} / ${pad(projects.length)} · ${project.title}`
      : `p. ${pad(currentPage)}`;
  }, [currentPage, isClosed]);

  const pages = [];

  pages.push(
    <CoverPage key="front-cover" variant="front">
      <span className="fieldbook-cover__eyebrow">Field Notes · No. 01</span>
      <div className="fieldbook-cover__label">
        <h3 className="fieldbook-cover__title">My Projects</h3>
        <p className="fieldbook-cover__subtitle">
          {projects.length} builds · Taylor DeVries
        </p>
      </div>
      <span className="fieldbook-cover__prompt">Click or drag cover to open →</span>
    </CoverPage>
  );

  projects.forEach((project, index) => {
    const storyPage = projectStoryPage(index);

    pages.push(
      <PaperPage key={`${project.title}-story`} side="left" folio={`p. ${pad(storyPage)}`}>
        <div className="fieldbook-case">
          <span className="fieldbook-kicker">
            Project {pad(index + 1)} / {pad(projects.length)}
          </span>
          <h3 className="fieldbook-heading">{project.title}</h3>
          <p className="fieldbook-case__role">{project.role}</p>
          <p className="fieldbook-lede">{project.description}</p>
          <div className="fieldbook-margin-note">{project.note}</div>
          <TagList items={project.technologies} />
        </div>
      </PaperPage>
    );

    pages.push(
      <PaperPage
        key={`${project.title}-visual`}
        side="right"
        folio={`p. ${pad(storyPage + 1)}`}
      >
        <div className="fieldbook-case">
          <span className="fieldbook-kicker">Taped in</span>
          <figure className="fieldbook-polaroid">
            <span className="fieldbook-washi fieldbook-washi--top" aria-hidden="true" />
            <div className="fieldbook-polaroid__window">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                width={project.width}
                height={project.height}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>{project.title}</figcaption>
          </figure>

          <p className="fieldbook-highlight">
            <span>Highlight</span>
            {project.highlight}
          </p>

          <a
            className="fieldbook-link"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            {...stopFlip}
          >
            Open project ↗
          </a>
        </div>
      </PaperPage>
    );
  });

  pages.push(
    <CoverPage key="back-cover" variant="back">
      <div className="fieldbook-cover__backmark">
        <span className="fieldbook-cover__eyebrow">End of projects</span>
        <p className="fieldbook-cover__subtitle">Taylor DeVries</p>
      </div>
    </CoverPage>
  );

  return (
    <section
      id="projects-section"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 md:px-6"
      style={{ backgroundColor: "transparent", zIndex: 1 }}
    >
      <h2 className="text-center font-serif text-4xl font-bold text-ink md:text-5xl">
        Projects
      </h2>
      <p className="mb-7 mt-4 max-w-xl text-center text-sm leading-6 text-muted md:mb-10 md:text-base">
        Drag a page corner to flip through the notebook.
      </p>

      <div
        className={`fieldbook-stage ${isClosed ? "is-closed" : "is-open"}`}
        tabIndex={0}
        role="group"
        aria-label="Project fieldbook"
        onKeyDown={handleKeyDown}
      >
        <div className="fieldbook-chassis">
          <span className="fieldbook-stack fieldbook-stack--left" aria-hidden="true" />
          <span className="fieldbook-stack fieldbook-stack--right" aria-hidden="true" />

          <HTMLFlipBook
            ref={bookRef}
            className="fieldbook-flipbook"
            width={460}
            height={620}
            size="stretch"
            minWidth={290}
            maxWidth={540}
            minHeight={430}
            maxHeight={700}
            showCover
            drawShadow
            maxShadowOpacity={0.35}
            flippingTime={800}
            usePortrait
            useMouseEvents
            swipeDistance={30}
            clickEventForward
            mobileScrollSupport
            startPage={0}
            onFlip={handleFlip}
          >
            {pages}
          </HTMLFlipBook>

          {!isClosed ? (
            <span className="fieldbook-spine" aria-hidden="true">
              {Array.from({ length: 9 }).map((_, ring) => (
                <i key={ring} />
              ))}
            </span>
          ) : null}

          {!hasTurned ? (
            <div className="fieldbook-curl" aria-hidden="true">
              <span className="fieldbook-curl__dogear" />
              <span className="fieldbook-curl__hint">drag corner to flip ↝</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:gap-5">
        <button
          type="button"
          onClick={flipPrev}
          disabled={isClosed}
          className="notebook-control"
        >
          ← Previous
        </button>
        <span className="font-mono text-xs text-muted md:text-sm">{spreadLabel}</span>
        <button
          type="button"
          onClick={flipNext}
          disabled={currentPage >= BACK_COVER_PAGE}
          className="notebook-control"
        >
          Next →
        </button>
      </div>
    </section>
  );
}
