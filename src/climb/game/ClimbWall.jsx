import { useEffect, useMemo, useState } from "react";
import { motion, useTransform } from "framer-motion";
import Hold from "./Hold";
import Climber from "./Climber";
import Grapple from "./Grapple";
import { WORLD_VH, CLIMBER_ANCHOR } from "../utils/constants";
import { buildDecorHolds, isReachable } from "../utils/holds";

// Edge fade reveals the mountain backdrop on either side of the cliff face.
const EDGE_MASK =
  "linear-gradient(90deg, transparent 0%, rgba(0,0,0,1) 13%, rgba(0,0,0,1) 87%, transparent 100%)";

export default function ClimbWall({
  avatarX,
  avatarY,
  ropeExtend,
  target,
  phase,
  facing,
  holds,
  currentHold,
  checkpointsById,
  reached,
  collectedGems,
  foundSecrets,
  reachableHint,
  onHoldClick,
  avatar,
  reducedMotion,
}) {
  const decor = useMemo(() => buildDecorHolds(), []);
  const [size, setSize] = useState(() => ({
    vw: typeof window !== "undefined" ? window.innerWidth : 1024,
    vh: typeof window !== "undefined" ? window.innerHeight : 800,
  }));

  useEffect(() => {
    const onResize = () => setSize({ vw: window.innerWidth, vh: window.innerHeight });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  const { vw, vh } = size;
  const isMobile = vw < 640;
  const holdScale = isMobile ? 0.78 : 1;
  const avatarScale = isMobile ? 0.78 : 1;
  const worldPx = (WORLD_VH / 100) * vh;
  const anchorPx = CLIMBER_ANCHOR * vh;

  const wallY = useTransform(avatarY, (y) => Math.max(0, y * worldPx - anchorPx));

  // Avatar's screen height from the bottom. Mirrors the (clamped) camera so the
  // climber always sits on its current hold — near the bottom at the start,
  // then pinned to the anchor line once the camera begins to follow.
  const avatarBottom = useTransform(avatarY, (y) => Math.min(y * worldPx, anchorPx));

  const reachableIds = useMemo(() => {
    if (!reachableHint || !currentHold) return new Set();
    return new Set(holds.filter((h) => isReachable(currentHold, h)).map((h) => h.id));
  }, [holds, currentHold, reachableHint]);

  // Fewer decorative holds on small screens to keep things light and uncluttered.
  const decorShown = isMobile ? decor.slice(0, 22) : decor;

  const avatarLeft = useTransform(avatarX, (x) => `${x}%`);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: 1500 }}>
      {/* The scrolling cliff face. Height is in px (derived from the same vh
          value as the camera/avatar) so holds stay perfectly aligned with the
          climber — CSS `vh` and window.innerHeight differ on mobile browsers. */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: `${worldPx}px`,
          y: wallY,
          backgroundColor: "#574f63",
          backgroundImage:
            "radial-gradient(circle at 25% 12%, rgba(255,255,255,0.07) 0 2px, transparent 3px)," +
            "radial-gradient(circle at 68% 30%, rgba(0,0,0,0.18) 0 3px, transparent 5px)," +
            "radial-gradient(circle at 45% 60%, rgba(255,255,255,0.05) 0 2px, transparent 4px)," +
            "linear-gradient(115deg, rgba(255,255,255,0.06) 0 8%, transparent 8% 14%, rgba(0,0,0,0.12) 14% 16%, transparent 16%)," +
            "linear-gradient(180deg, #6a6075 0%, #4d4658 55%, #3c3647 100%)",
          backgroundSize: "120px 120px, 170px 170px, 90px 90px, 240px 240px, 100% 100%",
          boxShadow: "inset 0 0 180px rgba(0,0,0,0.55)",
          maskImage: EDGE_MASK,
          WebkitMaskImage: EDGE_MASK,
        }}
      >
        {/* Decorative holds */}
        {decorShown.map((d) => (
          <span
            key={d.id}
            aria-hidden="true"
            className="absolute -translate-x-1/2 translate-y-1/2 rounded-[42%_58%_60%_40%/45%_45%_55%_55%]"
            style={{
              left: `${d.x}%`,
              bottom: `${d.y * 100}%`,
              width: d.size * holdScale,
              height: d.size * holdScale,
              background: `radial-gradient(circle at 34% 28%, #ffffff55, ${d.color}99 55%, #00000055)`,
              boxShadow: "0 4px 6px rgba(0,0,0,0.35)",
              opacity: 0.4,
            }}
          />
        ))}

        {/* Climbable + checkpoint holds */}
        {holds.map((h) => (
          <Hold
            key={h.id}
            hold={h}
            checkpoint={h.checkpointId ? checkpointsById[h.checkpointId] : null}
            reached={h.checkpointId ? reached.has(h.checkpointId) : false}
            isCurrent={currentHold?.id === h.id}
            reachable={reachableIds.has(h.id)}
            gemCollected={collectedGems.has(h.id)}
            mysteryFound={foundSecrets.has(h.id)}
            scale={holdScale}
            onClick={() => onHoldClick(h)}
            reducedMotion={reducedMotion}
          />
        ))}
      </motion.div>

      {/* Foreground rock ledge for depth */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16"
        style={{ background: "linear-gradient(to top, rgba(20,16,28,0.8), transparent)" }}
      />

      {/* Grapple rope (screen space) */}
      <Grapple
        avatarX={avatarX}
        avatarY={avatarY}
        ropeExtend={ropeExtend}
        target={target}
        vw={vw}
        vh={vh}
        visible={phase !== "idle"}
      />

      {/* Avatar (screen space, sits on its current hold) */}
      <motion.div
        className="pointer-events-none absolute z-30"
        style={{ left: avatarLeft, bottom: avatarBottom, x: "-50%", y: "50%" }}
      >
        <Climber avatar={avatar} facing={facing} scale={avatarScale} />
      </motion.div>
    </div>
  );
}
