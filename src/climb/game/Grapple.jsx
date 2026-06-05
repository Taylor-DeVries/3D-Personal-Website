import { motion, useTransform } from "framer-motion";
import { WORLD_VH, CLIMBER_ANCHOR } from "../utils/constants";

// Screen-space grapple rope + hook that connects the climber to the target
// hold. Endpoints are derived from the avatar's live motion values so the rope
// shoots out, anchors, then reels the climber in as the camera follows. The
// avatar's on-screen height is clamped to match the camera (so it sits low at
// the start), and the target stays at its true offset above/below the avatar.
export default function Grapple({ avatarX, avatarY, ropeExtend, target, vw, vh, visible }) {
  const worldPx = (WORLD_VH / 100) * vh;
  const anchorPx = CLIMBER_ANCHOR * vh;
  const handOffset = 14; // grapple leaves from the raised hand
  const handLift = 34; // hand sits this far above the avatar's hold

  const tx = target ? (target.x / 100) * vw : 0;

  // Avatar hand origin (top-based screen coords).
  const ax = useTransform(avatarX, (x) => (x / 100) * vw + handOffset);
  const ay = useTransform(avatarY, (y) => vh - Math.min(y * worldPx, anchorPx) - handLift);

  // Hook tip = hand + (target - hand) * extend.
  const hookX = useTransform([avatarX, ropeExtend], ([x, e]) => {
    const a = (x / 100) * vw + handOffset;
    return a + (tx - a) * e;
  });
  const hookY = useTransform([avatarY, ropeExtend], ([y, e]) => {
    const avatarCenterTop = vh - Math.min(y * worldPx, anchorPx);
    const handTop = avatarCenterTop - handLift;
    const targetTop = target ? avatarCenterTop - (target.y - y) * worldPx : handTop;
    return handTop + (targetTop - handTop) * e;
  });

  if (!visible || !target) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-20"
      width={vw}
      height={vh}
      viewBox={`0 0 ${vw} ${vh}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ropeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {/* rope */}
      <motion.line x1={ax} y1={ay} x2={hookX} y2={hookY} stroke="url(#ropeGrad)" strokeWidth={3} strokeLinecap="round" />
      {/* hook tip */}
      <motion.circle cx={hookX} cy={hookY} r={6} fill="#9ca3af" stroke="#4b5563" strokeWidth={1.5} />
      <motion.circle cx={hookX} cy={hookY} r={2.5} fill="#e5e7eb" />
    </svg>
  );
}
