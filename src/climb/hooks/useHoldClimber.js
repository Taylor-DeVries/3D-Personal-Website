import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useMotionValue, animate } from "framer-motion";
import { buildHolds, holdInDirection, isReachable } from "../utils/holds";

// Hold-to-hold climbing controller. The avatar grapples to a target hold, then
// pulls itself up. Movement is driven by keyboard, on-screen D-pad, or by
// clicking/tapping a reachable hold. Position is exposed as motion values so
// the camera and grapple rope can follow smoothly.
export function useHoldClimber({ onArrive, reducedMotion } = {}) {
  const holds = useMemo(() => buildHolds(), []);
  const start = holds[0];

  const [currentId, setCurrentId] = useState(start.id);
  const [phase, setPhase] = useState("idle"); // idle | fire | pull
  const [target, setTarget] = useState(null);
  const [facing, setFacing] = useState(1);

  const avatarX = useMotionValue(start.x);
  const avatarY = useMotionValue(start.y);
  const ropeExtend = useMotionValue(0);

  const currentRef = useRef(start);
  const movingRef = useRef(false);
  const pausedRef = useRef(false);
  const onArriveRef = useRef(onArrive);
  const reducedRef = useRef(reducedMotion);
  useEffect(() => void (onArriveRef.current = onArrive), [onArrive]);
  useEffect(() => void (reducedRef.current = reducedMotion), [reducedMotion]);

  const setPaused = useCallback((v) => {
    pausedRef.current = v;
  }, []);

  const currentHold = useMemo(() => holds.find((h) => h.id === currentId), [holds, currentId]);
  useEffect(() => {
    currentRef.current = currentHold;
  }, [currentHold]);

  const moveToHold = useCallback(
    (hold) => {
      const from = currentRef.current;
      if (!hold || movingRef.current || pausedRef.current) return;
      if (!isReachable(from, hold)) return;

      movingRef.current = true;
      setTarget(hold);
      if (hold.x !== from.x) setFacing(hold.x > from.x ? 1 : -1);

      const reduced = reducedRef.current;
      const fireDur = reduced ? 0.001 : 0.18;
      setPhase("fire");
      ropeExtend.set(0);

      animate(ropeExtend, 1, {
        duration: fireDur,
        ease: "easeOut",
        onComplete: () => {
          setPhase("pull");
          const spring = reduced
            ? { duration: 0.001 }
            : { type: "spring", stiffness: 170, damping: 19 };
          animate(avatarX, hold.x, spring);
          animate(avatarY, hold.y, {
            ...spring,
            onComplete: () => {
              setPhase("idle");
              ropeExtend.set(0);
              movingRef.current = false;
              currentRef.current = hold;
              setCurrentId(hold.id);
              setTarget(null);
              if (onArriveRef.current) onArriveRef.current(hold);
            },
          });
        },
      });
    },
    [avatarX, avatarY, ropeExtend]
  );

  const moveDir = useCallback(
    (dir) => {
      const next = holdInDirection(holds, currentRef.current, dir);
      if (next) moveToHold(next);
    },
    [holds, moveToHold]
  );

  const moveToId = useCallback(
    (id) => {
      const hold = holds.find((h) => h.id === id);
      if (hold) moveToHold(hold);
    },
    [holds, moveToHold]
  );

  // Teleport (recruiter jump / reset) without animation gating.
  const teleport = useCallback(
    (hold) => {
      movingRef.current = false;
      setPhase("idle");
      ropeExtend.set(0);
      avatarX.set(hold.x);
      avatarY.set(hold.y);
      currentRef.current = hold;
      setCurrentId(hold.id);
      setTarget(null);
    },
    [avatarX, avatarY, ropeExtend]
  );

  const reset = useCallback(() => teleport(start), [teleport, start]);

  // Keyboard bindings (bound once; uses refs internally so they stay fresh).
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      let dir = null;
      if (k === "arrowup" || k === "w") dir = "up";
      else if (k === "arrowdown" || k === "s") dir = "down";
      else if (k === "arrowleft" || k === "a") dir = "left";
      else if (k === "arrowright" || k === "d") dir = "right";
      if (dir) {
        e.preventDefault();
        moveDir(dir);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moveDir]);

  return {
    holds,
    currentHold,
    currentId,
    avatarX,
    avatarY,
    ropeExtend,
    target,
    phase,
    facing,
    moving: phase !== "idle",
    moveDir,
    moveToId,
    moveToHold,
    teleport,
    reset,
    setPaused,
  };
}
