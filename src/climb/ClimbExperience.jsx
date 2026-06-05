import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";

import SkylineBackground from "./game/SkylineBackground";
import ClimbWall from "./game/ClimbWall";
import BaseCamp from "./components/BaseCamp";
import CheckpointCard from "./components/CheckpointCard";
import AchievementToast from "./components/AchievementToast";
import HUD from "./components/HUD";
import Summit from "./components/Summit";
import AvatarCustomizer from "./components/AvatarCustomizer";
import SecretsJournal from "./components/SecretsJournal";

import { useHoldClimber } from "./hooks/useHoldClimber";
import { useClimbProgress } from "./hooks/useClimbProgress";
import { useAvatar } from "./hooks/useAvatar";
import { checkpoints, funFacts, TOTAL_CHECKPOINTS } from "./data/checkpoints";
import { sfx } from "./utils/sound";

export default function ClimbExperience() {
  const reducedMotion = useReducedMotion();
  const { avatar, update: updateAvatar } = useAvatar();
  const progress = useClimbProgress(TOTAL_CHECKPOINTS);

  const [started, setStarted] = useState(false);
  const [activeCheckpoint, setActiveCheckpoint] = useState(null);
  const [summitReached, setSummitReached] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [toast, setToast] = useState(null);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);

  const checkpointsById = useMemo(() => Object.fromEntries(checkpoints.map((c) => [c.id, c])), []);

  const paused = !started || Boolean(activeCheckpoint) || summitReached || customizerOpen || journalOpen;

  const soundRef = useRef(soundOn);
  const toastTimer = useRef(null);
  useEffect(() => void (soundRef.current = soundOn), [soundOn]);

  const showToast = useCallback((badge) => {
    setToast(badge);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3400);
  }, []);

  const openCheckpoint = useCallback(
    (cp, earn) => {
      if (!cp) return;
      if (earn) {
        const added = progress.markReached(cp.id);
        if (added) {
          showToast(cp.badge);
          if (soundRef.current) sfx.achievement();
        }
      }
      if (soundRef.current) sfx.checkpoint();
      setActiveCheckpoint(cp);
    },
    [progress, showToast]
  );

  const triggerSummit = useCallback(() => {
    setSummitReached(true);
    if (soundRef.current) sfx.summit();
  }, []);

  // Arrival handler from the climber state machine.
  const handleArrive = useCallback(
    (hold) => {
      if (hold.gem) {
        const got = progress.collectGem(hold.id);
        if (got) {
          showToast({ emoji: "💎", name: "Gem found!", blurb: `${progress.gems.size + 1} collected` });
          if (soundRef.current) sfx.gem();
        }
      }
      if (hold.mystery) {
        const found = progress.collectSecret(hold.id);
        if (found) {
          const fact = funFacts[hold.factIndex % funFacts.length];
          showToast({ emoji: "🔮", name: "Secret unlocked!", blurb: fact });
          if (soundRef.current) sfx.gem();
        }
      }
      if (hold.kind === "summit") {
        triggerSummit();
      } else if (hold.checkpointId) {
        openCheckpoint(checkpointsById[hold.checkpointId], true);
      }
    },
    [triggerSummit, openCheckpoint, checkpointsById, progress, showToast]
  );

  const climber = useHoldClimber({ onArrive: handleArrive, reducedMotion });
  const {
    currentId,
    currentHold,
    avatarX,
    avatarY,
    ropeExtend,
    target,
    phase,
    facing,
    holds,
    moveDir,
    moveToHold,
    teleport,
    reset: resetClimber,
    setPaused,
  } = climber;

  const totalGems = useMemo(() => holds.filter((h) => h.gem).length, [holds]);
  const totalSecrets = useMemo(() => holds.filter((h) => h.mystery).length, [holds]);

  // Which fun facts have been uncovered (for the journal + summit list).
  const factsStatus = useMemo(() => {
    const foundIdx = new Set(
      holds.filter((h) => h.mystery && progress.secrets.has(h.id)).map((h) => h.factIndex)
    );
    return funFacts.map((text, i) => ({ text, found: foundIdx.has(i) }));
  }, [holds, progress.secrets]);

  // Sync pause state into the climber.
  useEffect(() => {
    setPaused(paused);
  }, [paused, setPaused]);

  // Apply saved theme (this route mounts independently of the portfolio App).
  useEffect(() => {
    if (localStorage.getItem("darkMode") === "true") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Lock page scroll while the experience is active.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // --- Handlers ---------------------------------------------------------
  const handleStart = useCallback(() => setStarted(true), []);

  const handleCloseCard = useCallback(() => {
    setActiveCheckpoint(null);
    if (soundRef.current) sfx.tick();
  }, []);

  const handleHoldClick = useCallback(
    (hold) => {
      if (hold.checkpointId && hold.id === currentId) {
        openCheckpoint(checkpointsById[hold.checkpointId], false);
      } else {
        moveToHold(hold);
      }
    },
    [currentId, openCheckpoint, checkpointsById, moveToHold]
  );

  const handleJump = useCallback(
    (cp) => {
      setStarted(true);
      const hold = holds.find((h) => h.checkpointId === cp.id);
      if (hold) teleport(hold);
      openCheckpoint(cp, true);
    },
    [holds, teleport, openCheckpoint]
  );

  const handleSkipToSummit = useCallback(() => {
    setStarted(true);
    setActiveCheckpoint(null);
    const top = holds.find((h) => h.kind === "summit");
    if (top) teleport(top);
    triggerSummit();
  }, [holds, teleport, triggerSummit]);

  const handleReset = useCallback(() => {
    progress.reset();
    resetClimber();
    setActiveCheckpoint(null);
    setSummitReached(false);
    setStarted(false);
  }, [progress, resetClimber]);

  const handleClimbAgain = useCallback(() => {
    progress.reset();
    resetClimber();
    setActiveCheckpoint(null);
    setSummitReached(false);
    setStarted(true);
  }, [progress, resetClimber]);

  const handleToggleSound = useCallback(() => {
    setSoundOn((s) => {
      const next = !s;
      if (next) sfx.tick();
      return next;
    });
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#241f2e] font-sans text-white">
      <SkylineBackground climbMV={avatarY} reducedMotion={reducedMotion} />

      <ClimbWall
        avatarX={avatarX}
        avatarY={avatarY}
        ropeExtend={ropeExtend}
        target={target}
        phase={phase}
        facing={facing}
        holds={holds}
        currentHold={currentHold}
        checkpointsById={checkpointsById}
        reached={progress.reached}
        collectedGems={progress.gems}
        foundSecrets={progress.secrets}
        reachableHint={started && !activeCheckpoint && !summitReached && !customizerOpen && !journalOpen}
        onHoldClick={handleHoldClick}
        avatar={avatar}
        reducedMotion={reducedMotion}
      />

      {started && !summitReached && (
        <HUD
          percent={progress.percent}
          climbMV={avatarY}
          checkpoints={checkpoints}
          reached={progress.reached}
          gemCount={progress.gemCount}
          totalGems={totalGems}
          secretCount={progress.secretCount}
          totalSecrets={totalSecrets}
          onOpenSecrets={() => setJournalOpen(true)}
          soundOn={soundOn}
          onToggleSound={handleToggleSound}
          onReset={handleReset}
          onCustomize={() => setCustomizerOpen(true)}
          onJump={handleJump}
          onSummit={handleSkipToSummit}
          onMove={(dir) => moveDir(dir)}
        />
      )}

      <AchievementToast badge={toast} reducedMotion={reducedMotion} />

      <CheckpointCard checkpoint={activeCheckpoint} onClose={handleCloseCard} reducedMotion={reducedMotion} />

      <AvatarCustomizer
        open={customizerOpen}
        avatar={avatar}
        update={updateAvatar}
        onClose={() => setCustomizerOpen(false)}
      />

      <SecretsJournal open={journalOpen} facts={factsStatus} onClose={() => setJournalOpen(false)} />

      <AnimatePresence>
        {!started && (
          <BaseCamp
            onStart={handleStart}
            onCustomize={() => setCustomizerOpen(true)}
            avatar={avatar}
            hasProgress={progress.count > 0}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {summitReached && (
          <Summit
            reached={progress.reached}
            percent={progress.percent}
            gemCount={progress.gemCount}
            totalGems={totalGems}
            secretCount={progress.secretCount}
            totalSecrets={totalSecrets}
            facts={factsStatus}
            onClimbAgain={handleClimbAgain}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
