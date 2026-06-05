// Avatar customization options. No personal photo and no skin-tone selector —
// a friendly chibi climber the visitor styles with fun, modern colors.

// Fixed skin tone (not user-selectable).
export const SKIN = "#E8B58F";

export const SUIT_COLORS = [
  "#7C5CFC", // violet
  "#FF5D8F", // pink
  "#FF8A5B", // coral
  "#FFD166", // sunny yellow
  "#06D6A0", // teal
  "#2EC4F1", // sky
  "#111827", // charcoal
];

export const HELMET_COLORS = [
  "#FFD166",
  "#FF5D8F",
  "#2EC4F1",
  "#06D6A0",
  "#7C5CFC",
  "#F5F4F2",
];

export const FACES = ["😀", "😎", "🤠", "🙂", "😄", "😼", "🤩", "😤"];

export const DEFAULT_AVATAR = {
  skin: SKIN,
  suit: SUIT_COLORS[0],
  helmet: HELMET_COLORS[0],
  face: FACES[1],
  helmetOn: true,
};

export const AVATAR_STORAGE_KEY = "climb-avatar-v2";
