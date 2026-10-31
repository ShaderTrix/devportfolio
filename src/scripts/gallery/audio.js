// Hallway ambience (looped, see AMBIENCE_LOOP), terminal key clicks and the camera swoosh, through Web Audio.
// Browsers only allow sound after a user gesture, so the ambience fades in on the first
// click, key or scroll. A mute toggle is remembered per browser.
import { fetchProgress } from "./load.js";

const MUTE_KEY = "gallery-muted";
// The ambience recording swells in from silence and fades out at the end, so looping the whole
// file goes quiet for a while every pass. Loop a cut from its middle instead (seconds), with the
// cut's tail crossfaded into its head so the seam can't be heard.
const AMBIENCE_LOOP = { start: 12, end: 96, fade: 6 };

function makeLoop(ctx, buf) {
  const sr = buf.sampleRate;
  const s = Math.round(AMBIENCE_LOOP.start * sr);
  const e = Math.min(Math.round(AMBIENCE_LOOP.end * sr), buf.length);
  const f = Math.round(AMBIENCE_LOOP.fade * sr);
  const len = e - s - f;
  if (len <= f) return buf;                 // file shorter than expected: loop it as it is
  const out = ctx.createBuffer(buf.numberOfChannels, len, sr);
  for (let c = 0; c < buf.numberOfChannels; c++) {
    const src = buf.getChannelData(c);
    const dst = out.getChannelData(c);
    dst.set(src.subarray(s, s + len));
    // equal-power crossfade: the audio after the loop's end fades into its head, so the last
    // sample flows on into the first
    for (let i = 0; i < f; i++) {
      const x = (i / f) * Math.PI * 0.5;
      dst[i] = src[s + i] * Math.sin(x) + src[s + len + i] * Math.cos(x);
    }
  }
  return out;
}

export function createAudio(assets, onProgress = () => {}) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  const amb = ctx.createGain();
  const fx = ctx.createGain();
  amb.gain.value = 0;
  amb.connect(master);
  fx.connect(master);
  master.connect(ctx.destination);

  let ambBuf = null, keyBuf = null, swooshBuf = null;
  const small = (name) => fetch(assets + "audio/" + name).then((r) => r.arrayBuffer()).then((b) => ctx.decodeAudioData(b));
  const ready = Promise.all([
    fetchProgress(assets + "audio/ambience.m4a", onProgress).then((b) => ctx.decodeAudioData(b)),
    small("key.m4a"),
    small("swoosh.m4a"),
  ])
    .then(([a, k, s]) => { ambBuf = makeLoop(ctx, a); keyBuf = k; swooshBuf = s; })
    .catch(() => onProgress(1));            // no sound is fine; the page works without it

  let muted = false;
  try { muted = localStorage.getItem(MUTE_KEY) === "1"; } catch {}
  let started = false, active = true;
  const volume = { ambience: 0.35, clicks: 0.45, swoosh: 0.5 };
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
    setVolumes(ambience, clicks, swoosh = volume.swoosh) {
      volume.ambience = ambience;
      volume.clicks = clicks;
      volume.swoosh = swoosh;
      if (started && active) amb.gain.setTargetAtTime(ambience, ctx.currentTime, 0.1);
    },
    /** false while the gallery is scrolled out of view: the ambience fades out */
    setActive(on) {
      active = on;
      if (started) amb.gain.setTargetAtTime(on ? volume.ambience : 0, ctx.currentTime, 0.4);
    },
    /** the camera rushing to or from the terminal */
    swoosh() {
      if (!swooshBuf || muted) return;
      const src = ctx.createBufferSource();
      src.buffer = swooshBuf;
      const g = ctx.createGain();
      g.gain.value = volume.swoosh;
      src.connect(g).connect(fx);
      src.start();
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
