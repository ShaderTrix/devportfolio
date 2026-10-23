// Animated reflective pool: a Reflector (real-time mirror of the lightmapped hall)
// whose lookup is rippled by scrolling procedural noise. No textures to download.
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";

const WaterShader = {
  name: "GalleryWater",
  uniforms: {
    color: { value: null },
    tDiffuse: { value: null },
    textureMatrix: { value: null },
    time: { value: 0 },
    deep: { value: new THREE.Color(0.004, 0.012, 0.012) },   // linear; near-black teal
    bump: { value: 0.16 },          // ripple height (slope)
    distort: { value: 0.014 },      // how far ripples bend the reflection
    reflectBase: { value: 0.14 },   // reflection seen straight down
    fresnelAmt: { value: 1 },       // extra reflection at grazing angles
    rippleScale: { value: 1 },      // ripple size (higher = smaller, busier ripples)
  },
  vertexShader: /* glsl */ `
    uniform mat4 textureMatrix;
    varying vec4 vUv;
    varying vec3 vWorld;
    void main() {
      vUv = textureMatrix * vec4(position, 1.0);
      vec4 w = modelMatrix * vec4(position, 1.0);
      vWorld = w.xyz;
      gl_Position = projectionMatrix * viewMatrix * w;
    }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float time, bump, distort, reflectBase, fresnelAmt, rippleScale;
    uniform vec3 deep;
    varying vec4 vUv;
    varying vec3 vWorld;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
                 mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
    }
    // two layers drifting in different directions read as wind-ruffled water
    float height(vec2 p) {
      return noise(p * 1.2 + vec2(time * 0.20, time * 0.07)) * 0.65
           + noise(p * 2.7 + vec2(-time * 0.13, time * 0.22)) * 0.3
           + noise(p * 6.0 + vec2(time * 0.35, -time * 0.28)) * 0.05;
    }

    void main() {
      vec2 p = vWorld.xz * rippleScale;
      const float e = 0.04;
      vec2 g = vec2(height(p + vec2(e, 0.0)) - height(p - vec2(e, 0.0)),
                    height(p + vec2(0.0, e)) - height(p - vec2(0.0, e))) / (2.0 * e);
      vec3 n = normalize(vec3(-g.x * bump, 1.0, -g.y * bump));
      vec3 v = normalize(cameraPosition - vWorld);
      float fresnel = 0.02 + 0.98 * pow(1.0 - max(dot(n, v), 0.0), 5.0);

      vec4 uv = vUv;
      uv.xy += n.xz * distort * uv.w;
      vec3 reflection = texture2DProj(tDiffuse, uv).rgb;

      vec3 col = mix(deep, reflection, clamp(reflectBase + fresnel * fresnelAmt, 0.0, 1.0));
      gl_FragColor = vec4(col, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
};

/** Swap the baked water mesh for an animated mirror of the same footprint.
 *  Sits at floor level (the baked water is 3.5 cm lower), which closes the slit under
 *  the leaning mass where the background used to peek through as a bright line. */
export function createWater(waterMesh, renderer) {
  waterMesh.updateWorldMatrix(true, false);
  const box = new THREE.Box3().setFromObject(waterMesh);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const scale = Math.min(renderer.getPixelRatio(), 1.5) * 0.5;   // reflections can be soft
  const water = new Reflector(new THREE.PlaneGeometry(size.x, size.z), {
    shader: WaterShader,
    textureWidth: Math.round(innerWidth * scale),
    textureHeight: Math.round(innerHeight * scale),
    clipBias: 0.003,
    multisample: 0,
  });
  water.rotation.x = -Math.PI / 2;
  water.position.set(center.x, -0.002, center.z);
  waterMesh.visible = false;

  const u = water.material.uniforms;
  return {
    mesh: water,
    uniforms: u,
    speed: 1,
    update(dt) { u.time.value += dt * this.speed; },
    resize(w, h) {
      water.getRenderTarget().setSize(Math.round(w * scale), Math.round(h * scale));
    },
  };
}
