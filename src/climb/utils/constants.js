// Shared layout + movement constants for the interactive climb experience.

// How tall the climbing "world" is, expressed in viewport heights.
// Larger = more scrolling between checkpoints.
export const WORLD_VH = 780;

// Where the climber sits on screen, measured as a fraction of the viewport
// height from the bottom (0 = bottom edge, 1 = top edge).
export const CLIMBER_ANCHOR = 0.42;

// Horizontal lane positions (percentage from the left edge of the wall).
export const LANE_X = [28, 50, 72];

// How fast the climber ascends/descends while a key is held (fraction/second).
export const CLIMB_SPEED = 0.16;

// Climb progress at which the summit experience unlocks.
export const SUMMIT_AT = 0.985;

// localStorage key for saved progress.
export const STORAGE_KEY = "climb-progress-v1";

// Brand palette (mirrors the existing portfolio's lilac theme).
export const BRAND = {
  lilac: "#BC86F7",
  lilacDeep: "#9B4DCA",
  magenta: "#BF40BF",
};
