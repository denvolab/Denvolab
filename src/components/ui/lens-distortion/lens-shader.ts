// ---------------------------------------------------------------------------
// GLSL port of Figma's "Lens distortion" shader effect (Figma community
// shader 1650660511777647690, version 607, file main.ts), the effect on the
// service pages' closing "Conversation" band.
//
// Only the path the designs use is ported: "Lateral" chromatic mode
// (chromaticMode 0), Quality "High" (0) and an Aberration below 0.08
// (Figma's aberration bucket 1). For that path Figma builds its kernel as:
//   base kernel = 64 / (quality + 1) = 64, scaled by 0.25 for bucket 1
//   -> 16 taps, INV_KERNEL_SIZE = 1/15, a triangle window per tap,
// and averages 4 jittered sub-samples (Halton offsets, 1.4px spread).
//
// What it does: every output pixel is sampled 16 times along the line to
// the centre, red pushed outwards, blue pulled inwards, green in between,
// more so the further the pixel is from the centre
// (lensDistort: p' = c + (p - c) * (1 + amount * (d2 + d2^2)), d2 = the
// squared distance from the centre over the half-diagonal). Text near the
// centre stays sharp, text near the edges smears into colour fringes.
// Samples that land outside the frame count as transparent with the channel
// forced to 1.0, which gives the bright yellow rim along the edges.
// Same maths as Figma; only the shading language differs (WGSL -> GLSL).
// ---------------------------------------------------------------------------

export const KERNEL_TAPS = 16;
export const INV_KERNEL_SIZE = 1 / (KERNEL_TAPS - 1);

/** Sum of the triangle window over the kernel (Figma's KERNEL_WEIGHT_SUM). */
export const KERNEL_WEIGHT_SUM = (() => {
  let sum = 0;
  for (let i = 0; i < KERNEL_TAPS; i += 1) {
    const fi = i * INV_KERNEL_SIZE - 0.5;
    sum += 1 - Math.abs(fi * 2);
  }
  return sum;
})();

/** Figma's per-pixel jitter spread, in CSS px (Figma renders at 1x). */
export const SAMPLE_SPREAD = 1.4;

export const VERTEX_SHADER = `#version 300 es
void main() {
  // One triangle that covers the whole canvas.
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

export const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform sampler2D uTex;
uniform vec2 uSize;       // frame size, device px
uniform vec2 uCenter;     // lens centre, device px
uniform float uRadius;    // half the frame diagonal, device px
uniform float uAmount;    // "Distortion"
uniform float uChroma;    // (1 + |distortion|) * "Aberration"
uniform float uSpread;    // jitter spread, device px
uniform float uWeightSum;

out vec4 outColor;

const int KERNEL_TAPS = ${KERNEL_TAPS};
const float INV_KERNEL_SIZE = ${INV_KERNEL_SIZE.toFixed(9)};

// Halton(2,3) 4-tap jitter, same order as Figma.
const vec2 JITTER[4] = vec2[4](
  vec2(0.0, 0.0),
  vec2(0.5, -0.333333),
  vec2(-0.25, 0.333333),
  vec2(0.25, -0.111111)
);

vec4 sampleZero(vec2 localPos) {
  vec2 uv = localPos / uSize;
  bool inBounds = uv.x >= 0.0 && uv.x <= 1.0 && uv.y >= 0.0 && uv.y <= 1.0;
  vec4 col = texture(uTex, clamp(uv, 0.0, 1.0));
  return inBounds ? col : vec4(0.0);
}

vec2 lensDistort(vec2 localPos, float amount) {
  vec2 centeredPos = localPos - uCenter;
  vec2 normPos = centeredPos / uRadius;
  float dist2 = dot(normPos, normPos);
  return centeredPos * (1.0 + amount * (dist2 + dist2 * dist2)) + uCenter;
}

void main() {
  // Figma's localPos: pixel centre, y down from the top edge.
  vec2 localPos = vec2(gl_FragCoord.x, uSize.y - gl_FragCoord.y);
  vec4 accumColor = vec4(0.0);

  for (int j = 0; j < 4; j++) {
    vec2 tapPos = localPos + JITTER[j] * uSpread;
    vec4 tapColor = vec4(0.0);

    for (int i = 0; i < KERNEL_TAPS; i++) {
      float fi = float(i) * INV_KERNEL_SIZE - 0.5;
      float window = 1.0 - abs(fi * 2.0);

      vec4 redSample = sampleZero(lensDistort(tapPos, uAmount + (fi + 0.5) * uChroma));
      vec4 greenSample = sampleZero(lensDistort(tapPos, uAmount + fi * uChroma));
      vec4 blueSample = sampleZero(lensDistort(tapPos, uAmount + (fi - 0.5) * uChroma));

      float r = redSample.a > 0.01 ? redSample.r / max(0.001, redSample.a) : 1.0;
      float g = greenSample.a > 0.01 ? greenSample.g / max(0.001, greenSample.a) : 1.0;
      float b = blueSample.a > 0.01 ? blueSample.b / max(0.001, blueSample.a) : 1.0;
      float alpha = max(max(redSample.a, greenSample.a), blueSample.a);
      tapColor += vec4(r * alpha, g * alpha, b * alpha, alpha) * window;
    }

    accumColor += tapColor / max(uWeightSum, 0.0001);
  }

  // Premultiplied output, like Figma's.
  outColor = accumColor / 4.0;
}`;
