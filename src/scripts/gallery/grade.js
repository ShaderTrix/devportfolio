// Colour grade for the gallery + a tuning panel (open the page with ?grade).
// Tone mapping and exposure run in three.js; contrast/brightness/saturation/hue/sepia
// are a CSS filter on the canvas and the vignette is a CSS overlay, so the whole
// grade costs no extra render pass.
import * as THREE from "three";

// Paste values from the panel's "Copy values" here to make them the defaults.
export const GRADE = {
  toneMapping: "AgX",
  exposure: 1.13,
  contrast: 0.98,
  brightness: 1.4,
  saturation: 2,
  hue: -20,
  sepia: 0,
  vignette: 1,
  vignetteSize: 40,
  noise: 0.1,          // film grain strength (overlay blend)
  bakedLight: 0.15,     // multiplies every lightmap
  terminalFill: 0.42,   // multiplies the terminal's real-time lights
  screenGlow: 1.5,     // CRT brightness
  water: "#1a2323",     // deep water colour
  waterReflect: 0.5,   // reflection seen straight down
  waterFresnel: 1,      // extra reflection at grazing angles
  waterRipple: 0.53,    // ripple height
  waterRippleSize: 1.45,   // higher = smaller, busier ripples
  waterDistort: 0.029,  // how far ripples bend the reflection
  waterSpeed: 2,        // ripple animation speed
  terminalReflect: 1,   // how much the terminal's metal reflects the hall
  terminalMetal: 0,     // one flat metalness for the terminal body (no metal map)
  decal: "#b9ad7e",     // the "02" paint tint (multiplies the white stencil image)
  decalBright: 1,
  dust: 0.37,           // share of the dust motes shown (beam and room)
  dustSize: 0.014,      // mote size, metres (the shaft is 20-40 m from the hero camera)
  dustBright: 0.75,
  dustRoom: 0.2,        // brightness of the room dust relative to the sun-shaft dust
  dustSpeed: 1,
  ambience: 0.35,       // hallway ambience volume
  clicks: 0.45,         // terminal key-click volume
};

const TONE_MAPPINGS = {
  None: THREE.NoToneMapping,
  Linear: THREE.LinearToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  Cineon: THREE.CineonToneMapping,
  ACES: THREE.ACESFilmicToneMapping,
  AgX: THREE.AgXToneMapping,
  Neutral: THREE.NeutralToneMapping,
};

const FIELDS = [
  ["toneMapping", "Tone map", { options: Object.keys(TONE_MAPPINGS) }],
  ["exposure", "Exposure", { min: 0, max: 3, step: 0.01 }],
  ["contrast", "Contrast", { min: 0.5, max: 2, step: 0.01 }],
  ["brightness", "Brightness", { min: 0.3, max: 2, step: 0.01 }],
  ["saturation", "Saturation", { min: 0, max: 2, step: 0.01 }],
  ["hue", "Hue (deg)", { min: -180, max: 180, step: 1 }],
  ["sepia", "Sepia", { min: 0, max: 1, step: 0.01 }],
  ["vignette", "Vignette", { min: 0, max: 1, step: 0.01 }],
  ["vignetteSize", "Vignette size", { min: 0, max: 90, step: 1 }],
  ["noise", "Noise", { min: 0, max: 1, step: 0.01 }],
  ["bakedLight", "Baked light", { min: 0, max: 3, step: 0.01 }],
  ["terminalFill", "Terminal light", { min: 0, max: 4, step: 0.01 }],
  ["screenGlow", "Screen glow", { min: 0, max: 8, step: 0.05 }],
  ["water", "Water colour", { color: true }],
  ["waterReflect", "Reflection", { min: 0, max: 1, step: 0.01 }],
  ["waterFresnel", "Edge reflect", { min: 0, max: 1, step: 0.01 }],
  ["waterRipple", "Ripple height", { min: 0, max: 1, step: 0.01 }],
  ["waterRippleSize", "Ripple size", { min: 0.1, max: 4, step: 0.05 }],
  ["waterDistort", "Distortion", { min: 0, max: 0.1, step: 0.001 }],
  ["waterSpeed", "Ripple speed", { min: 0, max: 4, step: 0.05 }],
  ["terminalReflect", "Terminal reflect", { min: 0, max: 3, step: 0.01 }],
  ["terminalMetal", "Terminal metal", { min: 0, max: 1, step: 0.01 }],
  ["decal", "02 colour", { color: true }],
  ["decalBright", "02 bright", { min: 0, max: 3, step: 0.01 }],
  ["dust", "Dust amount", { min: 0, max: 1, step: 0.01 }],
  ["dustSize", "Dust size", { min: 0.002, max: 0.05, step: 0.001 }],
  ["dustBright", "Dust bright", { min: 0, max: 6, step: 0.05 }],
  ["dustRoom", "Room dust", { min: 0, max: 1, step: 0.01 }],
  ["dustSpeed", "Dust speed", { min: 0, max: 4, step: 0.05 }],
  ["ambience", "Ambience vol", { min: 0, max: 1, step: 0.01 }],
  ["clicks", "Click vol", { min: 0, max: 1, step: 0.01 }],
];

/**
 * hooks: { renderer, scene, vignetteEl, grainEl, lightmapMaterials: [{material, base}],
 *          terminalLights: [{light, base}], screenMaterial, water, dust,
 *          terminalMaterials, bodyMaterials, decalMaterials, captureEnv, audio }
 */
export function applyGrade(g, hooks) {
  const { renderer, scene } = hooks;
  const tm = TONE_MAPPINGS[g.toneMapping] ?? THREE.AgXToneMapping;
  if (renderer.toneMapping !== tm) {
    renderer.toneMapping = tm;
    scene.traverse((o) => { if (o.material) [].concat(o.material).forEach((m) => (m.needsUpdate = true)); });
  }
  renderer.toneMappingExposure = g.exposure;
  const f = [];
  if (g.contrast !== 1) f.push(`contrast(${g.contrast})`);
  if (g.brightness !== 1) f.push(`brightness(${g.brightness})`);
  if (g.saturation !== 1) f.push(`saturate(${g.saturation})`);
  if (g.hue) f.push(`hue-rotate(${g.hue}deg)`);
  if (g.sepia) f.push(`sepia(${g.sepia})`);
  renderer.domElement.style.filter = f.join(" ");
  if (hooks.grainEl) hooks.grainEl.style.opacity = g.noise;
  if (hooks.vignetteEl) {
    hooks.vignetteEl.style.setProperty("--vig", g.vignette);
    hooks.vignetteEl.style.setProperty("--vig-size", `${g.vignetteSize}%`);
  }
  for (const { material, base } of hooks.lightmapMaterials ?? []) material.lightMapIntensity = base * g.bakedLight;
  for (const { light, base } of hooks.terminalLights ?? []) light.intensity = base * g.terminalFill;
  hooks.screenMaterial?.color.setScalar(g.screenGlow);
  if (hooks.water) {
    const u = hooks.water.uniforms;
    u.deep.value.set(g.water);
    u.reflectBase.value = g.waterReflect;
    u.fresnelAmt.value = g.waterFresnel;
    u.bump.value = g.waterRipple;
    u.rippleScale.value = g.waterRippleSize;
    u.distort.value = g.waterDistort;
    hooks.water.speed = g.waterSpeed;
  }
  if (hooks.dust) {
    hooks.dust.set({ amount: g.dust, size: g.dustSize, brightness: g.dustBright, room: g.dustRoom });
    hooks.dust.speed = g.dustSpeed;
  }
  hooks.audio?.setVolumes(g.ambience, g.clicks);
  for (const m of hooks.terminalMaterials ?? []) m.envMapIntensity = g.terminalReflect;
  for (const m of hooks.bodyMaterials ?? []) m.metalness = g.terminalMetal;
  for (const m of hooks.decalMaterials ?? []) m.color.set(g.decal).multiplyScalar(g.decalBright);
  // the terminal's reflections are a capture of the lightmapped hall: redo it when that changes
  if (hooks.captureEnv && hooks.envBakedLight !== g.bakedLight) {
    hooks.envBakedLight = g.bakedLight;
    hooks.captureEnv();
  }
}

/** Fill the grain overlay with a tiling 256px grey-noise texture (mean 0.5, so the overlay
 *  blend leaves average brightness alone). The CSS jitters it a few times a second. */
export function makeGrain(el) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d");
  const img = ctx.createImageData(256, 256);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 128 + (Math.random() + Math.random() + Math.random() - 1.5) * 120;   // soft bell curve
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  el.firstElementChild.style.backgroundImage = `url(${c.toDataURL()})`;
  return el;
}

/** Bottom-right tuning panel. Only built when the URL has ?grade. */
export function maybeGradePanel(root, g, apply) {
  if (!new URLSearchParams(location.search).has("grade")) return;
  const defaults = { ...g };
  const panel = document.createElement("div");
  panel.className = "grade-panel";
  panel.innerHTML = `<div class="grade-head"><b>Colour grade</b><button type="button" data-collapse>–</button></div><div class="grade-body"></div>
    <div class="grade-actions"><button type="button" data-reset>Reset</button><button type="button" data-copy>Copy values</button></div>`;
  const body = panel.querySelector(".grade-body");
  for (const [key, label, opt] of FIELDS) {
    const row = document.createElement("label");
    row.className = "grade-row";
    row.innerHTML = `<span>${label}</span>`;
    if (opt.options) {
      const sel = document.createElement("select");
      sel.innerHTML = opt.options.map((o) => `<option${o === g[key] ? " selected" : ""}>${o}</option>`).join("");
      sel.oninput = () => { g[key] = sel.value; apply(); };
      row.append(sel);
    } else if (opt.color) {
      const c = document.createElement("input");
      c.type = "color"; c.value = g[key];
      c.oninput = () => { g[key] = c.value; apply(); };
      row.append(c);
    } else {
      const range = document.createElement("input");
      const num = document.createElement("input");
      Object.assign(range, { type: "range", ...opt, value: g[key] });
      Object.assign(num, { type: "number", ...opt, value: g[key] });
      range.oninput = () => { num.value = range.value; g[key] = Number(range.value); apply(); };
      num.oninput = () => { range.value = num.value; g[key] = Number(num.value); apply(); };
      row.append(range, num);
    }
    body.append(row);
  }
  panel.querySelector("[data-collapse]").onclick = (e) => {
    panel.classList.toggle("is-collapsed");
    e.currentTarget.textContent = panel.classList.contains("is-collapsed") ? "+" : "–";
  };
  panel.querySelector("[data-reset]").onclick = () => {
    Object.assign(g, defaults);
    panel.remove();
    apply();
    maybeGradePanel(root, g, apply);
  };
  panel.querySelector("[data-copy]").onclick = async (e) => {
    const text = JSON.stringify(g, null, 2);
    try { await navigator.clipboard.writeText(text); e.currentTarget.textContent = "Copied!"; }
    catch { prompt("Copy these values:", text); }
    setTimeout(() => (e.currentTarget.textContent = "Copy values"), 1500);
  };
  // keep the panel's clicks/keys/wheel away from the 3D view and the terminal
  for (const ev of ["pointerdown", "click", "wheel", "keydown"]) panel.addEventListener(ev, (e) => e.stopPropagation());
  root.append(panel);
}
