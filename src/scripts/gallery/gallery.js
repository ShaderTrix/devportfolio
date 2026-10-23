// VR Art Gallery landing: lightmapped hallway (baked in Blender), rippling reflective pool,
// and a wall terminal you click to glide down the hallway and use.
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TerminalScreen } from "./terminal.js";
import { createWater } from "./water.js";
import { GRADE, applyGrade, maybeGradePanel } from "./grade.js";

const FLY_SECONDS = 2.6;
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

  // ---------------------------------------------------------------- load + lightmaps
  const texLoader = new THREE.TextureLoader();
  const lightmaps = {};
  await Promise.all(Object.entries(info.meshes).filter(([, m]) => m.lightmap).map(([name, m]) => texLoader.loadAsync(assets + m.lightmap).then((t) => {
    t.flipY = false;                     // glTF UV convention
    t.colorSpace = THREE.SRGBColorSpace; // stored sRGB-encoded, scaled by m.scale
    t.channel = 1;                       // TEXCOORD_1
    lightmaps[name] = { tex: t, scale: m.scale };
  })));
  const gltf = await new GLTFLoader().loadAsync(assets + "gallery.glb", (e) => e.total && onProgress(e.loaded / e.total));
  scene.add(gltf.scene);

  const terminalMeshes = [];
  const lightmapMaterials = [], terminalLights = [];
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
    });
    for (const t of [basic.map, basic.aoMap]) if (t) t.anisotropy = maxAniso;   // grazing walls stay sharp
    if (m.name === STRIP_MATERIAL) {
      basic.lightMap = null;
      basic.color.copy(m.emissive).multiplyScalar(STRIP_GLOW);
    }
    else lightmapMaterials.push({ material: basic, base: basic.lightMapIntensity });
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

  // ---------------------------------------------------------------- water
  // Rippled real-time mirror of the hall; its look is driven by the grade (grade.js).
  const water = waterMesh ? createWater(waterMesh, renderer) : null;
  if (water) scene.add(water.mesh);

  // ---------------------------------------------------------------- grade
  const grade = { renderer, scene, vignetteEl: root.querySelector(".gallery-vignette"),
    lightmapMaterials, terminalLights, screenMaterial: screenMesh?.material, water };
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

  function fly(to, next) {
    flight = { from: { pos: pos.clone(), target: target.clone() }, to, t: 0, next };
    setState("flying");
  }
  const flyIn = () => { if (state === "hero") fly(terminalPose(), () => { setState("terminal"); terminal.boot(); }); };
  const flyOut = () => { if (state === "terminal") { terminal.idle(); fly(hero, () => setState("hero")); } };
  terminal.onExit = flyOut;

  // ---------------------------------------------------------------- input
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const mouse = new THREE.Vector2();     // -1..1, for parallax
  const pick = (e, meshes) => {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    return ray.intersectObjects(meshes, false)[0];
  };
  renderer.domElement.addEventListener("pointermove", (e) => {
    const r = renderer.domElement.getBoundingClientRect();
    mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    let pointer = false;
    if (state === "hero") pointer = !!pick(e, terminalMeshes);
    else if (state === "terminal" && screenMesh) {
      const hit = pick(e, [screenMesh]);
      pointer = hit ? terminal.pointer(hit.uv) : false;
    }
    renderer.domElement.style.cursor = pointer ? "pointer" : "";
  });
  renderer.domElement.addEventListener("click", (e) => {
    if (state === "hero" && pick(e, terminalMeshes)) flyIn();
    else if (state === "terminal" && screenMesh) {
      const hit = pick(e, [screenMesh]);
      if (hit) terminal.click(hit.uv);
    }
  });
  renderer.domElement.addEventListener("wheel", (e) => {
    if (state === "terminal") { e.preventDefault(); terminal.wheel(e.deltaY); }
  }, { passive: false });
  addEventListener("keydown", (e) => {
    if (state !== "terminal") return;
    if (terminal.key(e)) e.preventDefault();
  });

  // ---------------------------------------------------------------- resize + loop
  const resize = () => {
    const w = host.clientWidth || 1, h = host.clientHeight || 1;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    water?.resize(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    if (state === "terminal") { const p = terminalPose(); pos.copy(p.pos); target.copy(p.target); }
  };
  new ResizeObserver(resize).observe(host);
  resize();

  const clock = new THREE.Clock();
  const look = new THREE.Vector3();
  const parallax = new THREE.Vector2();
  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), 0.1);
    const t = clock.elapsedTime;
    if (flight) {
      flight.t = Math.min(1, flight.t + dt / FLY_SECONDS);
      const k = ease(flight.t);
      pos.lerpVectors(flight.from.pos, flight.to.pos, k);
      target.lerpVectors(flight.from.target, flight.to.target, k);
      if (flight.t >= 1) { const next = flight.next; flight = null; next(); }
    }
    // gentle mouse parallax (much smaller once you're at the terminal)
    parallax.lerp(mouse, 1 - Math.exp(-dt * 3));
    const amount = state === "terminal" ? 0.04 : 0.35;
    camera.position.copy(pos);
    look.copy(target).add(new THREE.Vector3(0, -parallax.y * amount, parallax.x * amount));
    camera.lookAt(look);
    camera.position.y += Math.sin(t * 0.6) * 0.01;     // a breath of handheld drift

    terminal.update(dt, t);
    water?.update(dt);
    renderer.render(scene, camera);
  });

  setState("hero");
  const api = { flyIn, flyOut, get state() { return state; }, renderer, scene, camera, terminal, water, GRADE, regrade, THREE };
  root.gallery = api;                 // handy for tuning from the console
  return api;
}
