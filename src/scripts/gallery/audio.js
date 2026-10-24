// Hallway ambience (seamless loop) and terminal key clicks, through Web Audio.
// Browsers only allow sound after a user gesture, so the ambience fades in on the first
// click, key or scroll. A mute toggle is remembered per browser.
import { fetchProgress } from "./load.js";

const MUTE_KEY = "gallery-muted";

export function createAudio(assets, onProgress = () => {}) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  const amb = ctx.createGain();
  const fx = ctx.createGain();
  amb.gain.value = 0;
  amb.connect(master);
  fx.connect(master);
  master.connect(ctx.destination);

  let ambBuf = null, keyBuf = null;
  const ready = Promise.all([
    fetchProgress(assets + "audio/ambience.m4a", onProgress).then((b) => ctx.decodeAudioData(b)),
    fetch(assets + "audio/key.m4a").then((r) => r.arrayBuffer()).then((b) => ctx.decodeAudioData(b)),
  ])
    .then(([a, k]) => { ambBuf = a; keyBuf = k; })
    .catch(() => onProgress(1));            // no sound is fine; the page works without it

  let muted = false;
  try { muted = localStorage.getItem(MUTE_KEY) === "1"; } catch {}
  let started = false, active = true;
  const volume = { ambience: 0.35, clicks: 0.45 };
  master.gain.value = muted ? 0 : 1;

  function start() {
    if (started) return;
    started = true;
    ctx.resume();
    ready.then(() => {
      if (!ambBuf) return;
      const src = ctx.createBufferSource();
      src.buffer = ambBuf;
      src.loop = true;
      src.connect(amb);
      src.start();
      amb.gain.setTargetAtTime(active ? volume.ambience : 0, ctx.currentTime, 1.2);   // slow fade in
    });
  }
  for (const ev of ["pointerdown", "keydown", "wheel", "touchstart"]) addEventListener(ev, start, { once: true, passive: true });
  // don't hum away in a background tab
  document.addEventListener("visibilitychange", () => {
    if (!started) return;
    if (document.hidden) ctx.suspend(); else ctx.resume();
  });

  return {
    ready,
    get muted() { return muted; },
    setMuted(m) {
      muted = m;
      try { localStorage.setItem(MUTE_KEY, m ? "1" : "0"); } catch {}
      master.gain.setTargetAtTime(m ? 0 : 1, ctx.currentTime, 0.08);
      if (!m) start();
    },
    setVolumes(ambience, clicks) {
      volume.ambience = ambience;
      volume.clicks = clicks;
      if (started && active) amb.gain.setTargetAtTime(ambience, ctx.currentTime, 0.1);
    },
    /** false while the gallery is scrolled out of view: the ambience fades out */
    setActive(on) {
      active = on;
      if (started) amb.gain.setTargetAtTime(on ? volume.ambience : 0, ctx.currentTime, 0.4);
    },
    /** one key click, slightly varied so repeats don't sound mechanical */
    click() {
      if (!keyBuf || muted) return;
      const src = ctx.createBufferSource();
      src.buffer = keyBuf;
      src.playbackRate.value = 0.92 + Math.random() * 0.16;
      const g = ctx.createGain();
      g.gain.value = volume.clicks * (0.75 + Math.random() * 0.25);
      src.connect(g).connect(fx);
      src.start();
    },
  };
}
