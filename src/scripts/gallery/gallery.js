// VR Art Gallery landing: lightmapped hallway (baked in Blender), rippling reflective pool,
// and a wall terminal you click to glide down the hallway and use.
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { TerminalScreen } from "./terminal.js";
import { createWater } from "./water.js";
import { createDust } from "./dust.js";
import { createAudio } from "./audio.js";
import { makeProgress, fetchProgress } from "./load.js";
import { GRADE, applyGrade, maybeGradePanel, makeGrain } from "./grade.js";

const FLY_SECONDS = 2.6;
const TOUCH_SCROLL = 3;              // finger drag px -> wheel px (terminal lines are small on a phone)
const SCREEN_MATERIAL = "blinn3";     // the CRT face in fallout_terminal.glb
const WATER_MATERIAL = "Water";
const STRIP_MATERIAL = "LightStrip";
const STRIP_GLOW = 3.0;             // pool-lip LED; the Blender value (12) reads as a thick bar without bloom
const SCREEN_FILL = 0.52;           // CRT height as a fraction of the view at the terminal
const TERMINAL_AMBIENT = 0.2;       // stands in for the bounce light the terminal gets in Cycles
// per-light multipliers so the real-time stand-ins match the Cycles render of the terminal
const LIGHT_SCALE = { Fill: 0.0004, Terminal_ScreenGlow: 0.4 };

// Blender is Z-up, glTF/three is Y-up: (x, y, z) -> (x, z, -y)
const fromBlender = ([x, y, z]) => new THREE.Vector3(x, z, -y);
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const CUE_PERIOD = 5;               // s between "click the terminal" callouts (hallway view)
const CUE_LENGTH = 2;               // s each callout stays up

export async function initGallery(root, data, { assets = "/gallery/", onProgress = () => {} } = {}) {
  const host = root.querySelector("[data-gallery-canvas]");
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;   // tone mapping / exposure: see grade.js
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // never meant to be seen from the camera path; dark so any sliver of gap reads as shadow
  scene.background = new THREE.Color(0x050505);

  const info = await (await fetch(assets + "lightmaps.json")).json();
  const camera = new THREE.PerspectiveCamera(info.camera.fovY, 1, 0.05, 200);
  const hero = { pos: fromBlender(info.camera.position), target: fromBlender(info.camera.target) };

  // ---------------------------------------------------------------- downloads
  // Scene, lightmap and sounds come down in parallel behind one progress bar (weights ~ MB);
  // the gallery only opens once all of them are in.
  const part = makeProgress(onProgress);
  const lightmapProgress = part(0.9), glbProgress = part(1.5);
  const audio = createAudio(assets, part(0.95));
  const texLoader = new THREE.TextureLoader();
  const lightmaps = {};
  const lightmapsReady = Promise.all(Object.entries(info.meshes).filter(([, m]) => m.lightmap).map(async ([name, m]) => {
    const url = URL.createObjectURL(new Blob([await fetchProgress(assets + m.lightmap, lightmapProgress)]));
    const t = await texLoader.loadAsync(url);
    URL.revokeObjectURL(url);
    t.flipY = false;                     // glTF UV convention
    t.colorSpace = THREE.SRGBColorSpace; // stored sRGB-encoded, scaled by m.scale
    t.channel = 1;                       // TEXCOORD_1
    // No mipmaps: thin faces seen edge-on from far away (the door jamb) would sample a tiny
    // mip where neighbouring atlas islands, e.g. the white sunlit wall, have bled in.
    // Baked light is smooth, so the full-res texture doesn't shimmer.
    t.generateMipmaps = false;
    t.minFilter = THREE.LinearFilter;
    lightmaps[name] = { tex: t, scale: m.scale };
  }));
  // geometry is meshopt-compressed (gltf-transform, see VRArtGallery/compress_web.sh)
  const gltfReady = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder)
    .loadAsync(assets + "gallery.glb", (e) => e.total && glbProgress(Math.min(0.99, e.loaded / e.total)));
  // sound is a nicety: if it hangs (an odd browser's decoder), open without it after 15 s
  const audioReady = Promise.race([audio.ready, new Promise((r) => setTimeout(r, 15000))]);
  const [, gltf] = await Promise.all([lightmapsReady, gltfReady, audioReady]);
  glbProgress(1);
  scene.add(gltf.scene);

  const terminalMeshes = [];
  const lightmapMaterials = [], terminalLights = [], decalMaterials = [];
  let screenMesh = null, waterMesh = null;
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  gltf.scene.traverse((o) => {
    if (!o.isMesh) return;
    const owner = info.meshes[o.name] ? o.name : o.parent?.name;
    if (owner === "Terminal") terminalMeshes.push(o);
    const lm = lightmaps[owner];
    const m = o.material;
    if (m.name === SCREEN_MATERIAL) screenMesh = o;
    if (m.name === WATER_MATERIAL) waterMesh = o;
    if (!lm) return;
    // Architecture is fully baked: an unlit material shows the lightmap and ignores the
    // real-time lights that only exist for the terminal.
    // texel = irradiance / scale; three divides diffuse by PI, Blender doesn't.
    const basic = new THREE.MeshBasicMaterial({
      name: m.name,
      color: m.color,
      map: m.map,
      aoMap: m.aoMap,
      lightMap: lm.tex,
      lightMapIntensity: Math.PI * lm.scale * (info.materialIntensity[m.name] ?? 1),
      transparent: m.transparent,     // the painted "02" decal
      alphaTest: m.alphaTest,
      alphaHash: m.alphaHash,
      depthWrite: m.depthWrite,
    });
    for (const t of [basic.map, basic.aoMap]) if (t) t.anisotropy = maxAniso;   // grazing walls stay sharp
    if (m.name === STRIP_MATERIAL) {
      basic.lightMap = null;
      basic.color.copy(m.emissive).multiplyScalar(STRIP_GLOW);
    }
    else lightmapMaterials.push({ material: basic, base: basic.lightMapIntensity });
    if (info.materialTint?.[m.name]) decalMaterials.push(basic);   // colour comes from the grade
    o.material = basic;
    m.dispose();
  });

  // ---------------------------------------------------------------- real-time light for the terminal only
  // The terminal is too detailed to lightmap crisply, so it gets the scene's actual
  // Blender lights (exported in lightmaps.json). Only its standard materials react.
  // Area lights become cheap stand-ins (RectAreaLight's lookup tables would double
  // the JS bundle): big panels -> directional, small panels -> a wide spot.
  const toThreeDir = ([x, y, z]) => new THREE.Vector3(x, z, -y);
  const termCenter = new THREE.Box3();
  for (const m of terminalMeshes) termCenter.expandByObject(m);
  const aim = termCenter.getCenter(new THREE.Vector3());
  for (const l of info.lights ?? []) {
    const color = new THREE.Color().setRGB(...l.color, THREE.LinearSRGBColorSpace);
    const pos = fromBlender(l.position), dir = toThreeDir(l.direction);
    const k = LIGHT_SCALE[l.name] ?? 1;
    let light = null;
    if (l.type === "AREA" && l.size[0] * (l.size[1] || l.size[0]) > 1) {
      light = new THREE.DirectionalLight(color, l.energy * k);
      light.position.copy(pos);
      light.target.position.copy(aim);
    } else if (l.type === "AREA") {
      // small glowing panel (the CRT): a point just in front of it washes the bezel and keys
      light = new THREE.PointLight(color, (l.energy / (4 * Math.PI)) * k, 0, 2);
      light.position.copy(pos.clone().addScaledVector(dir, 0.12));
    } else if (l.type === "SPOT") {
      light = new THREE.SpotLight(color, (l.energy / (4 * Math.PI)) * k, 0, THREE.MathUtils.degToRad(l.spotSize) / 2, 0.8, 2);
      light.position.copy(pos);
      light.target.position.copy(pos.clone().add(dir));
    } else if (l.type === "POINT") {
      light = new THREE.PointLight(color, (l.energy / (4 * Math.PI)) * k, 0, 2);
      light.position.copy(pos);
    }
    if (!light) continue;               // (the sun only washes one wall; that's in the lightmap)
    scene.add(light);
    if (light.target) scene.add(light.target);
    terminalLights.push({ light, base: light.intensity });
  }
  const ambient = new THREE.HemisphereLight(0xb8c2cf, 0x3a3631, TERMINAL_AMBIENT);
  scene.add(ambient);
  terminalLights.push({ light: ambient, base: ambient.intensity });

  // ---------------------------------------------------------------- terminal screen
  const terminal = new TerminalScreen(data);
  if (screenMesh) {
    // The model's CRT UVs are non-uniform (its texture was painted to match), which
    // squashes freshly drawn text. Re-project UVs straight-on instead: the tube faces +X,
    // so screen-right is -Z and screen-up is +Y. v runs bottom-up like glTF's flipped UVs.
    screenMesh.updateWorldMatrix(true, false);
    const g = screenMesh.geometry;
    const p = g.attributes.position, w = new THREE.Vector3();
    const pts = [];
    for (let i = 0; i < p.count; i++) pts.push(w.fromBufferAttribute(p, i).applyMatrix4(screenMesh.matrixWorld).clone());
    const zMin = Math.min(...pts.map((v) => v.z)), zMax = Math.max(...pts.map((v) => v.z));
    const yMin = Math.min(...pts.map((v) => v.y)), yMax = Math.max(...pts.map((v) => v.y));
    const uv = new Float32Array(p.count * 2);
    pts.forEach((v, i) => { uv[2 * i] = (zMax - v.z) / (zMax - zMin); uv[2 * i + 1] = (v.y - yMin) / (yMax - yMin); });
    g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    terminal.fitToUVs(0, 0, 1, 1);
    // unlit: the canvas is the light (and no specular smear from the terminal's lights)
    screenMesh.material.dispose();
    screenMesh.material = new THREE.MeshBasicMaterial({
      name: SCREEN_MATERIAL,
      map: terminal.texture,
    });
  }
  const termBox = new THREE.Box3();
  for (const m of terminalMeshes) termBox.expandByObject(m);

  // ---------------------------------------------------------------- "clickable" cue
  // Now and then corner brackets fade in around the terminal with a small "Click the
  // terminal" above them. Plain HTML fitted to the terminal's projected bounds each frame.
  const cueEl = root.querySelector("[data-gallery-cue]");
  // ~500 of the terminal's own vertices (world space): a tight fit, unlike a bounding box
  // whose depth spreads out in perspective. The flat backplate on the wall (within 10 cm of
  // it; the terminal faces +X) is left out: it's wider than the terminal and barely visible.
  const cueCorners = [];
  const wallX = termBox.min.x + 0.1;
  {
    const all = terminalMeshes.reduce((n, m) => n + m.geometry.attributes.position.count, 0);
    const step = Math.max(1, Math.floor(all / 500));
    for (const m of terminalMeshes) {
      m.updateWorldMatrix(true, false);
      const pos = m.geometry.attributes.position;
      for (let i = 0; i < pos.count; i += step) {
        const v = new THREE.Vector3().fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
        if (v.x > wallX) cueCorners.push(v);
      }
    }
  }
  const cueP = new THREE.Vector3();
  const CUE_PAD = 10;                 // px between the terminal and its brackets
  let cue = 0;
  function updateCue(dt, t) {
    const phase = (t % CUE_PERIOD) / CUE_LENGTH;
    const target = state === "hero" && phase < 1 ? Math.sin(Math.PI * phase) ** 2 : 0;
    cue += (target - cue) * (1 - Math.exp(-dt * 12));     // quick fade when you leave the hallway
    if (!cueEl) return;
    cueEl.style.opacity = String(cue);
    if (cue < 0.01) return;
    const r = renderer.domElement.getBoundingClientRect();
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const c of cueCorners) {
      cueP.copy(c).project(camera);
      const x = ((cueP.x + 1) / 2) * r.width, y = ((1 - cueP.y) / 2) * r.height;
      x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
    cueEl.style.transform = `translate(${x0 - CUE_PAD}px, ${y0 - CUE_PAD}px)`;
    cueEl.style.width = `${x1 - x0 + 2 * CUE_PAD}px`;
    cueEl.style.height = `${y1 - y0 + 2 * CUE_PAD}px`;
  }

  // ---------------------------------------------------------------- water
  // Rippled real-time mirror of the hall; its look is driven by the grade (grade.js).
  const water = waterMesh ? createWater(waterMesh, renderer) : null;
  if (water) scene.add(water.mesh);

  // ---------------------------------------------------------------- dust in the sun shaft
  const dust = info.sunShaft || info.room ? createDust(info.sunShaft, info.room, fromBlender) : null;
  if (dust) scene.add(dust.mesh);

  // ---------------------------------------------------------------- terminal reflections
  // The baked paint has bare-steel chips and brass screws; metal reflects nothing without an
  // environment. Capture the (lightmapped) hall from just in front of the terminal and
  // prefilter it for rough surfaces. Re-captured when the baked light level changes.
  const terminalMaterials = terminalMeshes.map((m) => m.material).filter((m) => m.isMeshStandardMaterial);
  // the baked paint has no metal map: one flat metalness for the whole body, set by the grade
  const bodyMaterials = terminalMaterials.filter((m) => m.name === "T_Baked");
  for (const m of bodyMaterials) { m.metalnessMap = null; m.needsUpdate = true; }
  const pmrem = new THREE.PMREMGenerator(renderer);
  let envTarget = null;
  const captureEnv = () => {
    const hide = [...terminalMeshes, water?.mesh, dust?.mesh].filter((o) => o && o.visible);
    hide.forEach((o) => (o.visible = false));
    const eye = aim.clone().add(new THREE.Vector3(0.6, 0, 0));   // the terminal faces +X
    gltf.scene.position.sub(eye);                                 // fromScene captures at the origin
    const rt = pmrem.fromScene(scene, 0, 0.05, 100);
    gltf.scene.position.add(eye);
    gltf.scene.updateMatrixWorld(true);   // or anything measured before the next frame sees the shifted hall
    hide.forEach((o) => (o.visible = true));
    envTarget?.dispose();
    envTarget = rt;
    for (const m of terminalMaterials) {
      if (!m.envMap) m.needsUpdate = true;
      m.envMap = rt.texture;
    }
  };

  // ---------------------------------------------------------------- grade
  const grainEl = root.querySelector(".gallery-grain");
  const grade = { renderer, scene, vignetteEl: root.querySelector(".gallery-vignette"), grainEl: grainEl && makeGrain(grainEl),
    lightmapMaterials, terminalLights, screenMaterial: screenMesh?.material, water, dust,
    terminalMaterials, bodyMaterials, decalMaterials, captureEnv, audio };
  const regrade = () => applyGrade(GRADE, grade);
  regrade();
  maybeGradePanel(root, GRADE, regrade);

  // ---------------------------------------------------------------- camera states
  // hero -> flying -> terminal -> flying -> hero
  let state = "hero";
  const pos = hero.pos.clone(), target = hero.target.clone();
  let flight = null;
  const setState = (s) => { state = s; root.dataset.state = s; root.dispatchEvent(new CustomEvent("gallery:state", { detail: s })); };

  // frame the CRT itself so the text is readable; the keyboard sits just below
  const screenBox = screenMesh ? new THREE.Box3().setFromObject(screenMesh) : termBox;
  function terminalPose() {
    const c = screenBox.getCenter(new THREE.Vector3());
    const size = screenBox.getSize(new THREE.Vector3());
    const tanY = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    const dist = Math.max((0.5 * size.y / SCREEN_FILL) / tanY, (0.5 * size.z / 0.86) / (tanY * camera.aspect));
    return { pos: new THREE.Vector3(screenBox.max.x + dist, c.y, c.z), target: c };
  }

  // mouse parallax is strong in the hallway and nearly off at the terminal; it blends across
  // the flight (switching it at the start made the camera jerk toward the cursor on the way back)
  const PARALLAX = { hero: 0.35, terminal: 0.04 };
  let parallaxAmount = PARALLAX.hero;
  function fly(to, next) {
    const toAmount = to === hero ? PARALLAX.hero : PARALLAX.terminal;
    flight = { from: { pos: pos.clone(), target: target.clone(), amount: parallaxAmount }, to, toAmount, t: 0, next };
    setState("flying");
    audio.swoosh();
  }
  const flyIn = () => { if (state === "hero") fly(terminalPose(), () => { setState("terminal"); terminal.boot(); }); };
  const flyOut = () => { if (state === "terminal") { terminal.idle(); fly(hero, () => setState("hero")); } };
  terminal.onExit = flyOut;

  // ---------------------------------------------------------------- input
  let onScreen = true;                 // false while scrolled out of view (see the loop below)
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const mouse = new THREE.Vector2();     // -1..1, for parallax
  const pick = (e, meshes) => {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    return ray.intersectObjects(meshes, false)[0];
  };
  // phones/tablets: swipe on the terminal to scroll long pages. Touch events (not pointer events,
  // which mobile browsers cancel once they start their own scrolling); touchmove is non-passive so
  // the page itself stays put. A swipe doesn't count as a tap on a line.
  let drag = null;
  renderer.domElement.addEventListener("touchstart", (e) => {
    drag = state === "terminal" && e.touches.length === 1 ? { y: e.touches[0].clientY, moved: 0 } : null;
  }, { passive: true });
  renderer.domElement.addEventListener("touchmove", (e) => {
    if (!drag || state !== "terminal") return;
    e.preventDefault();
    const y = e.touches[0].clientY;
    const dy = drag.y - y;                            // finger up = scroll down, like a phone list
    drag.y = y;
    drag.moved += Math.abs(dy);
    terminal.wheel(dy * TOUCH_SCROLL);
  }, { passive: false });
  renderer.domElement.addEventListener("touchcancel", () => { drag = null; });
  renderer.domElement.addEventListener("pointermove", (e) => {
    if (drag && e.pointerType !== "mouse") return;   // mid-swipe
    const r = renderer.domElement.getBoundingClientRect();
    mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    let pointer = false;
    if (state === "hero") pointer = true;            // anywhere in the hallway walks you to the terminal
    else if (state === "terminal" && screenMesh) {
      const hit = pick(e, [screenMesh]);
      pointer = hit ? terminal.pointer(hit.uv) : false;
    }
    renderer.domElement.style.cursor = pointer ? "pointer" : "";
  });
  renderer.domElement.addEventListener("click", (e) => {
    const dragged = drag && drag.moved > 8;
    drag = null;
    if (dragged) return;
    if (state === "hero") flyIn();
    else if (state === "terminal" && screenMesh) {
      const hit = pick(e, [screenMesh]);
      if (hit) { terminal.click(hit.uv); audio.click(); }
    }
  });
  renderer.domElement.addEventListener("wheel", (e) => {
    if (state === "terminal") { e.preventDefault(); terminal.wheel(e.deltaMode === 1 ? e.deltaY * 40 : e.deltaY); }   // deltaMode 1 = lines
  }, { passive: false });
  addEventListener("keydown", (e) => {
    if (state !== "terminal" || !onScreen) return;   // scrolled away: arrows scroll the page
    if (terminal.key(e)) { e.preventDefault(); audio.click(); }
  });

  // ---------------------------------------------------------------- resize + loop
  const resize = () => {
    const w = host.clientWidth || 1, h = host.clientHeight || 1;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    water?.resize(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    dust?.resize(camera, h * renderer.getPixelRatio(), renderer.getPixelRatio());
    if (state === "terminal") { const p = terminalPose(); pos.copy(p.pos); target.copy(p.target); }
  };
  new ResizeObserver(resize).observe(host);
  resize();

  const clock = new THREE.Clock();
  const look = new THREE.Vector3();
  const parallax = new THREE.Vector2();
  const frame = () => {
    const dt = Math.min(clock.getDelta(), 0.1);
    const t = clock.elapsedTime;
    if (flight) {
      flight.t = Math.min(1, flight.t + dt / FLY_SECONDS);
      const k = ease(flight.t);
      pos.lerpVectors(flight.from.pos, flight.to.pos, k);
      target.lerpVectors(flight.from.target, flight.to.target, k);
      parallaxAmount = THREE.MathUtils.lerp(flight.from.amount, flight.toAmount, k);
      if (flight.t >= 1) { const next = flight.next; flight = null; next(); }
    }
    // gentle mouse parallax (much smaller once you're at the terminal)
    parallax.lerp(mouse, 1 - Math.exp(-dt * 3));
    camera.position.copy(pos);
    look.copy(target).add(new THREE.Vector3(0, -parallax.y * parallaxAmount, parallax.x * parallaxAmount));
    camera.lookAt(look);
    camera.position.y += Math.sin(t * 0.6) * 0.01;     // a breath of handheld drift

    terminal.update(dt, t);
    updateCue(dt, t);
    water?.update(dt);
    dust?.update(dt);
    renderer.render(scene, camera);
  };
  // Embedded in a page, the gallery can scroll out of view: stop rendering and let the
  // ambience fall silent until it's back.
  renderer.setAnimationLoop(frame);
  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    renderer.setAnimationLoop(onScreen ? frame : null);
    audio.setActive(onScreen);
  }).observe(root);

  setState("hero");
  const api = { flyIn, flyOut, get state() { return state; }, renderer, scene, camera, terminal, water, dust, audio, GRADE, regrade, THREE };
  root.gallery = api;                 // handy for tuning from the console
  return api;
}
