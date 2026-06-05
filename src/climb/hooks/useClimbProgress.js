import { useState, useEffect, useCallback } from "react";
import { STORAGE_KEY } from "../utils/constants";

// Persists reached checkpoints, collected gems and found secrets to
// localStorage so progress survives refreshes.
export function useClimbProgress(total) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        return {
          reached: new Set(p.reached || []),
          gems: new Set(p.gems || []),
          secrets: new Set(p.secrets || []),
        };
      }
    } catch {
      // ignore malformed storage
    }
    return { reached: new Set(), gems: new Set(), secrets: new Set() };
  });

  const { reached, gems, secrets } = state;

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ reached: [...reached], gems: [...gems], secrets: [...secrets] })
      );
    } catch {
      // storage may be unavailable (private mode) — fail silently
    }
  }, [reached, gems, secrets]);

  const addTo = useCallback((key, id) => {
    let added = false;
    setState((prev) => {
      if (prev[key].has(id)) return prev;
      added = true;
      const next = new Set(prev[key]);
      next.add(id);
      return { ...prev, [key]: next };
    });
    return added;
  }, []);

  const markReached = useCallback((id) => addTo("reached", id), [addTo]);
  const collectGem = useCallback((id) => addTo("gems", id), [addTo]);
  const collectSecret = useCallback((id) => addTo("secrets", id), [addTo]);

  const reset = useCallback(
    () => setState({ reached: new Set(), gems: new Set(), secrets: new Set() }),
    []
  );

  const percent = total ? Math.round((reached.size / total) * 100) : 0;

  return {
    reached,
    gems,
    secrets,
    markReached,
    collectGem,
    collectSecret,
    reset,
    percent,
    count: reached.size,
    gemCount: gems.size,
    secretCount: secrets.size,
  };
}
