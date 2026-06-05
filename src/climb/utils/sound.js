// Lightweight, asset-free sound effects using the Web Audio API.
// No audio files needed, so nothing 404s. All effects are subtle and gated
// behind a user-controlled mute toggle (sound is OFF by default).

let ctx = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
  }
  // Browsers may suspend the context until a user gesture occurs.
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

function blip({ freq = 440, duration = 0.12, type = "sine", gain = 0.06 } = {}) {
  const audio = getCtx();
  if (!audio) return;
  const osc = audio.createOscillator();
  const vol = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audio.currentTime);
  vol.gain.setValueAtTime(0.0001, audio.currentTime);
  vol.gain.exponentialRampToValueAtTime(gain, audio.currentTime + 0.01);
  vol.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
  osc.connect(vol);
  vol.connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + duration + 0.02);
}

export const sfx = {
  // Soft click when a checkpoint hold is reached.
  checkpoint() {
    blip({ freq: 523.25, duration: 0.14, type: "triangle", gain: 0.07 });
    setTimeout(() => blip({ freq: 783.99, duration: 0.16, type: "triangle", gain: 0.06 }), 90);
  },
  // Rising chime for an unlocked achievement.
  achievement() {
    [523.25, 659.25, 783.99].forEach((f, i) =>
      setTimeout(() => blip({ freq: f, duration: 0.18, type: "sine", gain: 0.06 }), i * 90)
    );
  },
  // Tiny tick for UI interactions.
  tick() {
    blip({ freq: 320, duration: 0.06, type: "square", gain: 0.03 });
  },
  // Sparkle for collecting a gem.
  gem() {
    blip({ freq: 880, duration: 0.1, type: "triangle", gain: 0.06 });
    setTimeout(() => blip({ freq: 1318.5, duration: 0.14, type: "triangle", gain: 0.05 }), 70);
  },
  // Triumphant arpeggio at the summit.
  summit() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      setTimeout(() => blip({ freq: f, duration: 0.22, type: "triangle", gain: 0.07 }), i * 120)
    );
  },
};
