/**
 * ripple-shaders.ts
 * -----------------
 * Two tiny programs that run on the graphics card (GPU), written in GLSL.
 *
 *   VERTEX shader   = moves the corners of a flat grid.   (the "edge wobble")
 *   FRAGMENT shader = decides the colour of every pixel.  (the "water ripple")
 *
 * The picture is drawn on a flat sheet made of a 128 x 128 grid of points.
 * The vertex shader can nudge those points, which bends the outline.
 * The fragment shader can look up the picture at a slightly different place,
 * which bends what is inside the outline.
 *
 * You do not need to know GLSL to change the look. Every number you might
 * want to tweak comes in from RIPPLE_SETTINGS in ripple-effect.ts.
 */

/* ==========================================================================
   VERTEX SHADER: the edge wobble
   Runs once per grid point. When the cursor crosses the edge of the picture,
   the outline near that spot jiggles like jelly and settles in one second.
   ========================================================================== */
export const vertexShader = /* glsl */ `
  uniform vec2  uPlaneSize;        // picture size in CSS pixels
  uniform float uTime;             // seconds since the effect started
  uniform vec2  uEnterPoint;       // where the cursor crossed the edge (0..1)
  uniform float uEnterTime;        // the moment it crossed
  uniform float uEnterDirection;   // +1 = cursor came in, -1 = cursor left
  uniform float uEdgeDepth;        // how far the edge moves
  uniform float uEdgeReach;        // how far from the entry point it spreads (px)
  uniform float uEdgeWavelength;   // distance between wobble peaks (px)
  uniform float uEdgeWaveSpeed;    // how fast the wobble travels

  varying vec2 vUv;                // hand the position on the picture to the fragment shader

  void main() {
    vUv = uv;

    // Seconds since the cursor crossed the edge.
    float t = uTime - uEnterTime;

    // How strong the wobble is right now.
    // 0 at the start, a quick swell, then it dies out completely at t = 1 second.
    float strength = pow(clamp(t, 0.0, 1.0), 2.0) * pow(1.33 * max(0.0, 1.0 - t), 11.0);

    // Only points close to the entry spot move. "nearby" is 1 at the spot, 0 far away.
    float dist   = length((uv - uEnterPoint) * uPlaneSize);
    float nearby = 1.0 - smoothstep(0.0, uEdgeReach, dist);

    // A wave that travels away from the entry spot (or towards it when leaving).
    float wave = cos(dist / uEdgeWavelength * 6.2831853 - t * uEdgeWaveSpeed * uEnterDirection);

    // Push each point towards the centre of the picture (coming in = a dent)
    // or away from it (leaving = a bulge).
    vec3 pos = position;
    pos.xy -= position.xy * 2.0 * wave * strength * nearby * uEdgeDepth * uEnterDirection;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

/* ==========================================================================
   FRAGMENT SHADER: the water ripple
   Runs once per pixel. It answers one question: "how wet is this pixel?"
   Wet pixels read the picture from a slightly different spot, so the picture
   looks bent, like looking through water.
   ========================================================================== */
export const fragmentShader = /* glsl */ `
  #define PI 3.14159265

  uniform sampler2D uTexture;      // the picture
  uniform vec2  uPlaneSize;        // picture size in CSS pixels
  uniform vec2  uCoverScale;       // crops the picture to fill the frame (like object-fit: cover)
  uniform float uAnchorY;          // vertical crop anchor: 0.5 = centered (default), 1 = top, like CSS object-position
  uniform float uBorderRadius;     // rounded corner size in CSS pixels
  uniform float uTime;             // seconds since the effect started
  uniform vec3  uDrops[MAX_DROPS]; // the ripples: x, y = where (0..1), z = birth time
  uniform float uDropSize;         // starting size of a ripple (px)
  uniform float uGrowSpeed;        // how fast a ripple spreads (px per second)
  uniform float uFadeSpeed;        // how fast a ripple disappears
  uniform float uDropStrength;     // how much one ripple adds to the wetness
  uniform float uWarp;             // how hard the picture bends right now (follows cursor speed)

  varying vec2 vUv;

  void main() {
    // STEP 1: add up the "wetness" left by every ripple.
    float wet = 0.0;
    for (int i = 0; i < MAX_DROPS; i++) {
      float age = uTime - uDrops[i].z;         // how old this ripple is (seconds)
      if (age < 0.0 || age > 3.0) continue;    // unused or already gone

      float radius = uDropSize + age * uGrowSpeed;             // ripples spread as they age
      float dist   = length((vUv - uDrops[i].xy) * uPlaneSize);

      // A soft ring: strongest about half way out from the centre, empty in the middle.
      float x    = dist / radius;
      float ring = 1.0 - smoothstep(0.0, 0.3, abs(x - 0.5));

      wet += ring * exp(-age * uFadeSpeed) * uDropStrength;    // older = weaker
    }
    wet = clamp(wet, 0.0, 1.0);

    // STEP 2: bend the picture.
    // The wetter the pixel, the more we turn the direction we look in.
    // Going from a ring's edge to its middle turns it a full circle, which
    // gives the swirly look of water.
    float angle = wet * 2.0 * PI;
    vec2 push   = vec2(sin(angle), cos(angle)) * wet * uWarp;

    // STEP 3: read the picture at the shifted spot (cropped to fit the frame).
    // X always stays centered; Y uses uAnchorY so a top-anchored crop (CSS
    // object-position: top, see RippleImage's objectPosition prop) samples
    // the exact same part of the picture the resting <img> shows. Using a
    // fixed 0.5 here regardless of the <img>'s own object-position is what
    // made the picture's framing visibly jump the instant a hover starts.
    vec2 uv = vec2(
      (vUv.x + push.x - 0.5) * uCoverScale.x + 0.5,
      (vUv.y + push.y - uAnchorY) * uCoverScale.y + uAnchorY
    );
    vec4 color = texture2D(uTexture, uv);

    // STEP 4: cut rounded corners (a distance-to-rounded-box formula).
    vec2 fromCentre = (vUv - 0.5) * uPlaneSize;
    vec2 q = abs(fromCentre) - uPlaneSize * 0.5 + uBorderRadius;
    float outside = length(max(q, 0.0)) - uBorderRadius;      // below 0 = inside the box
    float mask = 1.0 - clamp(outside + 0.5, 0.0, 1.0);        // +0.5 gives a smooth 1px edge

    gl_FragColor = vec4(color.rgb, color.a * mask);
  }
`;
