// VR Art Gallery landing: lightmapped hallway (baked in Blender), animated pool,
// and a wall terminal you click to glide down the hallway and use.
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createWater } from "./water.js";
import { TerminalScreen } from "./terminal.js";

// Look of the page. Exposure goes into AgX; contrast/brightness are a CSS filter on
// the canvas (free on the GPU compositor, no post-processing pass).
const GRADE = { exposure: 0.6, contrast: 1.16, brightness: 0.94 };
const FLY_SECONDS = 2.6;
const SCREEN_MATERIAL = "blinn3";     // the CRT face in fallout_terminal.glb
const WATER_MATERIAL = "Water";
const SCREEN_GLOW = 2.6;
const SCREEN_FILL = 0.52;           // CRT height as a fraction of the view at the terminal

// Blender is Z-up, glTF/three is Y-up: (x, y, z) -> (x, z, -y)
const fromBlender = ([x, y, z]) => new THREE.Vector3(x, z, -y);
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export async function initGallery(root, data, { assets = "/gallery/", onProgress = () => {} } = {}) {
  const host = root.querySelector("[data-gallery-canvas]");
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.AgXToneMapping;          // matches the Blender view transform
  renderer.toneMappingExposure = GRADE.exposure;
  renderer.domElement.style.filter = `contrast(${GRADE.contrast}) brightness(${GRADE.brightness})`;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color().setRGB(0.7 * 4, 0.75 * 4, 0.82 * 4, THREE.LinearSRGBColorSpace);

  const info = await (await fetch(assets + "lightmaps.json")).json();
  const camera = new THREE.PerspectiveCamera(info.camera.fovY, 1, 0.05, 200);
  const hero = { pos: fromBlender(info.camera.position), target: fromBlender(info.camera.target) };

  // ---------------------------------------------------------------- load + lightmaps
  const texLoader = new THREE.TextureLoader();
  const lightmaps = {};
  await Promise.all(Object.entries(info.meshes).map(([name, m]) => texLoader.loadAsync(assets + m.lightmap).then((t) => {
    t.flipY = false;                     // glTF UV convention
    t.colorSpace = THREE.SRGBColorSpace; // stored sRGB-encoded, scaled by m.scale
    t.channel = 1;                       // TEXCOORD_1
    lightmaps[name] = { tex: t, scale: m.scale };
  })));
  const gltf = await new GLTFLoader().loadAsync(assets + "gallery.glb", (e) => e.total && onProgress(e.loaded / e.total));
  scene.add(gltf.scene);

  const terminalMeshes = [];
  let screenMesh = null, waterMesh = null;
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  gltf.scene.traverse((o) => {
    if (!o.isMesh) return;
    const owner = info.meshes[o.name] ? o.name : o.parent?.name;
    if (owner === "Terminal") terminalMeshes.push(o);
    const lm = lightmaps[owner];
    for (const m of [].concat(o.material)) {
      for (const t of [m.map, m.aoMap]) if (t) t.anisotropy = maxAniso;   // grazing walls stay sharp
      if (lm) {
        // texel = irradiance / scale; three divides diffuse by PI, Blender doesn't
        m.lightMap = lm.tex;
        m.lightMapIntensity = Math.PI * lm.scale * (info.materialIntensity[m.name] ?? 1);
      }
      if (m.name === SCREEN_MATERIAL) screenMesh = o;
      if (m.name === WATER_MATERIAL) waterMesh = o;
    }
  });

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
    const m = screenMesh.material;            // pure emissive: the canvas is the light
    m.map = null;
    m.lightMap = null;
    m.color.setRGB(0, 0, 0);
    m.emissive.setRGB(1, 1, 1);
    m.emissiveMap = terminal.texture;
    m.emissiveIntensity = SCREEN_GLOW;
    m.needsUpdate = true;
  }
  const termBox = new THREE.Box3();
  for (const m of terminalMeshes) termBox.expandByObject(m);

  // ---------------------------------------------------------------- water
  const water = waterMesh ? createWater(waterMesh, renderer) : null;
  if (water) scene.add(water.mesh);

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
    water?.update(t);
    renderer.render(scene, camera);
  });

  setState("hero");
  const api = { flyIn, flyOut, get state() { return state; }, renderer, scene, camera, terminal, water, GRADE };
  root.gallery = api;                 // handy for tuning from the console
  return api;
}
