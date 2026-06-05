import { useCallback, useEffect, useState } from "react";
import { DEFAULT_AVATAR, AVATAR_STORAGE_KEY } from "../data/avatar";

// Persists the player's avatar customization to localStorage.
export function useAvatar() {
  const [avatar, setAvatar] = useState(() => {
    try {
      const raw = localStorage.getItem(AVATAR_STORAGE_KEY);
      if (raw) return { ...DEFAULT_AVATAR, ...JSON.parse(raw) };
    } catch {
      // ignore malformed storage
    }
    return DEFAULT_AVATAR;
  });

  useEffect(() => {
    try {
      localStorage.setItem(AVATAR_STORAGE_KEY, JSON.stringify(avatar));
    } catch {
      // storage unavailable — keep in-memory only
    }
  }, [avatar]);

  const update = useCallback((patch) => setAvatar((a) => ({ ...a, ...patch })), []);

  return { avatar, update };
}
