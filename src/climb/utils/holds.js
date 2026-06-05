// Builds the climbable graph of holds from the checkpoint list. The route now
// branches: a guaranteed "spine" always leads upward (and through every
// checkpoint), while optional side holds create choices and hide collectible
// gems. Movement helpers pick the best hold in a pressed direction.
//
// Hold: { id, x (0..100 %), y (0..1), color, size, shape,
//         checkpointId|null, gem:bool, kind: "start"|"step"|"checkpoint"|"summit" }

import { checkpoints, funFacts } from "../data/checkpoints";

export const HOLD_COLORS = ["#FF5D8F", "#FF8A5B", "#FFD166", "#06D6A0", "#2EC4F1", "#7C5CFC"];
const SHAPES = ["jug", "crimp", "pinch", "sloper"];

// Column grid (% across the wall). ~10% apart so adjacent columns are reachable.
const COLUMNS = [20, 30, 40, 50, 60, 70, 80];
const ROW_DY = 0.03;
const GEM_TARGET = 16;
const MYSTERY_TARGET = funFacts.length;

// lane (0,1,2) -> column index for checkpoints.
const LANE_COL = [1, 3, 5];

function makeRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export function buildHolds() {
  const rng = makeRng(20260605);
  const holds = [];
  let id = 0;
  let gemCount = 0;
  let mysteryCount = 0;

  const push = (h) => {
    const hold = {
      id: `h${id++}`,
      color: HOLD_COLORS[Math.floor(rng() * HOLD_COLORS.length)],
      size: 30 + Math.round(rng() * 10),
      shape: SHAPES[Math.floor(rng() * SHAPES.length)],
      gem: false,
      mystery: false,
      factIndex: null,
      checkpointId: null,
      kind: "step",
      ...h,
    };
    holds.push(hold);
    return hold;
  };

  // Optional side holds beside a spine hold (create choices + hide collectibles).
  const addBranches = (colIdx, y) => {
    const dirs = rng() < 0.7 ? [rng() < 0.5 ? -1 : 1] : rng() < 0.5 ? [-1, 1] : [];
    dirs.forEach((d) => {
      const c = colIdx + d;
      if (c < 0 || c >= COLUMNS.length) return;
      let gem = false;
      let mystery = false;
      let factIndex = null;
      const r = rng();
      if (gemCount < GEM_TARGET && r < 0.45) {
        gem = true;
        gemCount++;
      } else if (mysteryCount < MYSTERY_TARGET && r < 0.7) {
        mystery = true;
        factIndex = mysteryCount;
        mysteryCount++;
      }
      push({ x: COLUMNS[c], y: y + (rng() - 0.5) * 0.01, gem, mystery, factIndex });
    });
  };

  let curCol = 3; // start centered (column 52)
  let curY = 0.02;
  push({ x: COLUMNS[curCol], y: curY, kind: "start" });

  const ordered = [...checkpoints].sort((a, b) => a.y - b.y);

  const walkTo = (targetY, targetCol) => {
    while (curY + ROW_DY < targetY - 1e-6) {
      curY += ROW_DY;
      // Step toward the target column by at most one, with occasional wiggle.
      if (curCol < targetCol) curCol += rng() < 0.85 ? 1 : 0;
      else if (curCol > targetCol) curCol -= rng() < 0.85 ? 1 : 0;
      else if (rng() < 0.4) curCol = clamp(curCol + (rng() < 0.5 ? 1 : -1), 0, COLUMNS.length - 1);
      curCol = clamp(curCol, 0, COLUMNS.length - 1);
      push({ x: COLUMNS[curCol], y: curY });
      addBranches(curCol, curY);
    }
  };

  ordered.forEach((cp) => {
    const targetCol = LANE_COL[cp.lane];
    walkTo(cp.y, targetCol);
    curY = cp.y;
    curCol = targetCol;
    push({ x: COLUMNS[curCol], y: curY, checkpointId: cp.id, kind: "checkpoint" });
  });

  // Final stretch to the summit.
  walkTo(0.99, 3);
  push({ x: COLUMNS[3], y: 0.99, kind: "summit" });

  return holds;
}

// Decorative, non-climbable holds for wall texture.
export function buildDecorHolds() {
  const rng = makeRng(7);
  const items = [];
  for (let i = 0; i < 48; i++) {
    items.push({
      id: `d${i}`,
      x: 6 + rng() * 88,
      y: rng(),
      color: HOLD_COLORS[i % HOLD_COLORS.length],
      size: 14 + rng() * 14,
    });
  }
  return items;
}

const MAX_DX = 26; // % reachable horizontally
const MAX_DY = 0.12; // reachable vertically (fraction)

export function isReachable(from, to) {
  if (!from || !to || from.id === to.id) return false;
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);
  return dx <= MAX_DX && dy <= MAX_DY;
}

// Pick the best neighbouring hold in a given direction.
export function holdInDirection(holds, from, dir) {
  if (!from) return null;
  let best = null;
  let bestScore = Infinity;

  for (const h of holds) {
    if (h.id === from.id || !isReachable(from, h)) continue;
    const dx = h.x - from.x;
    const dy = h.y - from.y; // positive = up
    let score = Infinity;
    if (dir === "up" && dy > 0.004) score = dy * 100 + Math.abs(dx) * 1.1;
    else if (dir === "down" && dy < -0.004) score = -dy * 100 + Math.abs(dx) * 1.1;
    else if (dir === "left" && dx < -1 && Math.abs(dy) < 0.07) score = Math.abs(dx) + Math.abs(dy) * 120;
    else if (dir === "right" && dx > 1 && Math.abs(dy) < 0.07) score = Math.abs(dx) + Math.abs(dy) * 120;
    if (score < bestScore) {
      bestScore = score;
      best = h;
    }
  }
  return best;
}
