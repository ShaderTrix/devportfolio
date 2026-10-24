// Dust motes drifting in the sun shaft. The shaft's volume comes from the Blender export
// (lightmaps.json "sunShaft": grid cells that see the sun and whose sun ray lands on the
// sunlit wall), so motes only ever glow where the light actually is.
import * as THREE from "three";

const MAX_MOTES = 3000;

const DustShader = {
  uniforms: {
    time: { value: 0 },
    size: { value: 0.035 },        // mote diameter, metres
    brightness: { value: 1 },
    color: { value: new THREE.Color(1, 0.93, 0.8) },
    pxPerMetre: { value: 800 },    // viewport height / (2 tan(fov / 2)): metres at 1 m -> pixels
  },
  vertexShader: /* glsl */ `
    uniform float time, size, pxPerMetre;
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
      gl_PointSize = max(px, 1.5);
      // glint as the flake turns in the light; motes far away fade rather than shrink
      float glint = 0.35 + 0.65 * pow(0.5 + 0.5 * sin(time * (0.7 + 1.6 * seed.z) + seed.x * 40.0), 3.0);
      vAlpha = lit * glint * clamp(px / 1.5, 0.0, 1.0) * smoothstep(0.2, 0.8, -mv.z);
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

/** shaft: { cell, cells: [x, y, z, litFraction, ...] (Blender coords), color }. */
export function createDust(shaft, fromBlender) {
  const cells = [];
  let total = 0;
  for (let i = 0; i < shaft.cells.length; i += 4) {
    total += shaft.cells[i + 3];
    cells.push({ c: fromBlender(shaft.cells.slice(i, i + 3)), lit: shaft.cells[i + 3], acc: total });
  }
  // spread motes by volume: pick cells weighted by how much of each is lit
  const pos = new Float32Array(MAX_MOTES * 3), seed = new Float32Array(MAX_MOTES * 4), lit = new Float32Array(MAX_MOTES);
  for (let n = 0; n < MAX_MOTES; n++) {
    const r = Math.random() * total;
    let lo = 0, hi = cells.length - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (cells[mid].acc < r) lo = mid + 1; else hi = mid; }
    const cell = cells[lo];
    for (let k = 0; k < 3; k++) pos[n * 3 + k] = cell.c.getComponent(k) + (Math.random() - 0.5) * shaft.cell;
    for (let k = 0; k < 4; k++) seed[n * 4 + k] = Math.random();
    lit[n] = cell.lit;
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
  if (shaft.color) mat.uniforms.color.value.setRGB(...shaft.color, THREE.LinearSRGBColorSpace);
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  const u = mat.uniforms;
  return {
    mesh: points,
    uniforms: u,
    speed: 1,
    setAmount(a) { geo.setDrawRange(0, Math.round(MAX_MOTES * THREE.MathUtils.clamp(a, 0, 1))); },
    update(dt) { u.time.value += dt * this.speed; },
    resize(camera, heightPx) {
      u.pxPerMetre.value = heightPx / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
    },
  };
}
