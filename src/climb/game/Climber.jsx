import { DEFAULT_AVATAR } from "../data/avatar";

// A customizable chibi climber drawn as a static SVG (no photo, no animation).
// `facing` flips the sprite left/right based on travel direction.
export default function Climber({ avatar = DEFAULT_AVATAR, facing = 1, scale = 1 }) {
  const { skin, suit, helmet, face, helmetOn } = avatar;
  const uid = suit.replace("#", "") + helmet.replace("#", "");

  return (
    <div style={{ transform: `scaleX(${facing}) scale(${scale})`, transformOrigin: "center" }}>
      <svg
        width="92"
        height="120"
        viewBox="0 0 92 120"
        fill="none"
        style={{ filter: "drop-shadow(0 10px 12px rgba(0,0,0,0.45))", overflow: "visible" }}
      >
        <defs>
          <linearGradient id={`suit-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="0.35" stopColor={suit} />
            <stop offset="1" stopColor="#000000" stopOpacity="0.35" />
          </linearGradient>
          <radialGradient id={`head-${uid}`} cx="0.38" cy="0.32" r="0.85">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="0.35" stopColor={skin} />
            <stop offset="1" stopColor={skin} />
          </radialGradient>
          <linearGradient id={`helmet-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="0.45" stopColor={helmet} />
            <stop offset="1" stopColor={helmet} />
          </linearGradient>
        </defs>

        {/* Legs */}
        <rect x="39" y="80" width="9" height="30" rx="4.5" fill={suit} transform="rotate(7 43 82)" />
        <rect x="50" y="80" width="9" height="30" rx="4.5" fill={suit} transform="rotate(-7 54 82)" />
        {/* Shoes */}
        <rect x="34" y="106" width="14" height="8" rx="4" fill="#1f2937" transform="rotate(7 41 110)" />
        <rect x="50" y="106" width="14" height="8" rx="4" fill="#111827" transform="rotate(-7 57 110)" />

        {/* Back arm reaching down to a hold */}
        <g transform="rotate(36 36 52)">
          <rect x="30" y="48" width="8" height="26" rx="4" fill={suit} />
          <circle cx="34" cy="74" r="5" fill={skin} />
        </g>

        {/* Body */}
        <rect x="32" y="46" width="28" height="37" rx="12" fill={`url(#suit-${uid})`} />
        {/* Harness */}
        <rect x="32" y="68" width="28" height="6" rx="3" fill="#facc15" />
        <rect x="43" y="68" width="6" height="10" rx="2" fill="#eab308" />
        {/* Chest zip detail */}
        <rect x="45" y="50" width="2" height="16" rx="1" fill="#ffffff" opacity="0.5" />

        {/* Head */}
        <circle cx="46" cy="34" r="16.5" fill={`url(#head-${uid})`} stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
        <text x="46" y="40" textAnchor="middle" fontSize="18" style={{ userSelect: "none" }}>
          {face}
        </text>

        {/* Helmet */}
        {helmetOn && (
          <>
            <path d="M29 31 A17.5 17.5 0 0 1 63 31 Z" fill={`url(#helmet-${uid})`} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
            <rect x="28" y="29.5" width="36" height="4.5" rx="2.2" fill={helmet} stroke="rgba(0,0,0,0.12)" />
            <circle cx="46" cy="16" r="2.6" fill="#ffffff" opacity="0.85" />
          </>
        )}

        {/* Front arm reaching up to the next hold */}
        <g transform="rotate(-148 58 50)">
          <rect x="54" y="46" width="8" height="28" rx="4" fill={suit} />
          <circle cx="58" cy="74" r="5.2" fill={skin} />
        </g>
      </svg>
    </div>
  );
}
