// Dust motes. Two populations from the Blender export (lightmaps.json):
//  - beam: grid cells of the sun shaft ("sunShaft": cells whose sun ray lands on the sunlit
//    wall), bright, so the light reads as a shaft of glinting specks;
//  - room: open air the camera path can see ("room"), dim, so the whole hall feels dusty.
import * as THREE from "three";

const BEAM_MOTES = 3000;
const ROOM_MOTES = 6000;

const DustShader = {
  uniforms: {
    time: { value: 0 },
    size: { value: 0.035 },        // mote diameter, metres
    brightness: { value: 1 },
    color: { value: new THREE.Color(1, 0.93, 0.8) },
    pxPerMetre: { value: 800 },    // viewport height / (2 tan(fov / 2)): metres at 1 m -> pixels
    maxPx: { value: 6 },           // biggest a mote may get on screen (device pixels)
  },
  vertexShader: /* glsl */ `
    uniform float time, size, pxPerMetre, maxPx;
    attribute vec4 seed;
    attribute float lit;
    varying float vAlpha;
    void main() {
      // each mote wanders its own slow loop around where it spawned, and sinks a little
      vec3 p = position + 0.3 * vec3(
        sin(time * 0.11 * (0.6 + seed.x) + seed.y * 6.283),
        sin(time * 0.07 * (0.6 + seed.z) + seed.w * 6.283) - 0.4,
        sin(time * 0.09 * (0.6 + seed.y) + seed.x * 6.283));
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      float px = size * (0.4 + 1.2 * seed.w) * pxPerMetre / -mv.z;
      gl_PointSize = clamp(px, 1.5, maxPx);   // motes right at the lens would be big soft blobs
      // glint as the flake turns in the light; motes far away fade rather than shrink
      float glint = 0.35 + 0.65 * pow(0.5 + 0.5 * sin(time * (0.7 + 1.6 * seed.z) + seed.x * 40.0), 3.0);
      vAlpha = lit * glint * clamp(px / 1.5, 0.0, 1.0) * smoothstep(0.8, 2.5, -mv.z);
    }`,
  fragmentShader: /* glsl */ `
    uniform vec3 color;
    uniform float brightness;
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - 0.5) * 2.0;
      float a = exp(-d * d * 4.0) * (1.0 - d);
      if (a <= 0.0) discard;
      gl_FragColor = vec4(color * brightness * vAlpha * a, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
};

/** Scatter `count` motes through grid cells [x, y, z(, weight)...] (Blender coords),
 *  picking cells in proportion to their weight (how much of the cell is lit). */
function scatter(flat, stride, cellSize, count, fromBlender) {
  const cells = [];
  let total = 0;
  for (let i = 0; i < flat.length; i += stride) {
    const w = stride > 3 ? flat[i + 3] : 1;
    total += w;
    cells.push({ c: fromBlender(flat.slice(i, i + 3)), w, acc: total });
  }
  const pos = new Float32Array(count * 3), seed = new Float32Array(count * 4), lit = new Float32Array(count);
  for (let n = 0; n < count; n++) {
    const r = Math.random() * total;
    let lo = 0, hi = cells.length - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (cells[mid].acc < r) lo = mid + 1; else hi = mid; }
    const cell = cells[lo];
    for (let k = 0; k < 3; k++) pos[n * 3 + k] = cell.c.getComponent(k) + (Math.random() - 0.5) * cellSize;
    for (let k = 0; k < 4; k++) seed[n * 4 + k] = Math.random();
    lit[n] = cell.w;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("seed", new THREE.BufferAttribute(seed, 4));
  geo.setAttribute("lit", new THREE.BufferAttribute(lit, 1));
  const mat = new THREE.ShaderMaterial({
    ...DustShader,
    uniforms: THREE.UniformsUtils.clone(DustShader.uniforms),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  return points;
}

/** shaft: { cell, cells: [x, y, z, litFraction, ...], color }; room: { cell, cells: [x, y, z, ...] }. */
export function createDust(shaft, room, fromBlender) {
  const group = new THREE.Group();
  const beam = shaft ? scatter(shaft.cells, 4, shaft.cell, BEAM_MOTES, fromBlender) : null;
  const air = room ? scatter(room.cells, 3, room.cell, ROOM_MOTES, fromBlender) : null;
  const layers = [beam, air].filter(Boolean);
  for (const p of layers) {
    if (shaft?.color) p.material.uniforms.color.value.setRGB(...shaft.color, THREE.LinearSRGBColorSpace);
    group.add(p);
  }
  const each = (fn) => layers.forEach((p) => fn(p.material.uniforms, p));
  return {
    mesh: group,
    speed: 1,
    /** amount 0..1 (both layers), size in metres, brightness of the beam, room = room/beam ratio */
    set({ amount, size, brightness, room: roomGlow }) {
      each((u, p) => {
        const max = p === beam ? BEAM_MOTES : ROOM_MOTES;
        p.geometry.setDrawRange(0, Math.round(max * THREE.MathUtils.clamp(amount, 0, 1)));
        u.size.value = size;
        u.brightness.value = p === beam ? brightness : brightness * roomGlow;
      });
    },
    update(dt) { each((u) => (u.time.value += dt * this.speed)); },
    resize(camera, heightPx, pixelRatio = 1) {
      const k = heightPx / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
      each((u) => { u.pxPerMetre.value = k; u.maxPx.value = 6 * pixelRatio; });
    },
  };
}
