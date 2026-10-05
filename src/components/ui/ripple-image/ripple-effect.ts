import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  ShaderMaterial,
  Texture,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";

import { fragmentShader, vertexShader } from "./ripple-shaders";

/**
 * ripple-effect.ts
 * ----------------
 * Draws ONE picture with WebGL (three.js) and makes it react to the cursor:
 *
 *   1. EDGE WOBBLE   when the cursor crosses the edge, the outline jiggles like jelly.
 *   2. WATER RIPPLE  while the cursor moves over the picture, it leaves soft
 *                    ripples that bend the picture and fade away.
 *
 * This file only DRAWS. attach-ripple-hover.ts decides WHEN to create it.
 *
 * How the parts fit together:
 *
 *      <div frame>                       <- the picture frame in the page
 *        <img>                           <- normal picture (hidden while this runs)
 *        <canvas>                        <- created here, sits on top of the frame
 *      </div>
 *
 * Coordinates: pointer positions come in as CSS pixels from the frame's
 * top-left corner (x to the right, y down). Inside, we convert them to "uv"
 * numbers from 0 to 1 with (0,0) at the bottom-left, which is what shaders use.
 */

/* --------------------------------------------------------------------------
   SETTINGS: every number you might want to tweak lives here.
   -------------------------------------------------------------------------- */
export const RIPPLE_SETTINGS = {
  // ---- Water ripple (while the cursor moves over the picture) ----
  maxDrops: 32,          // how many ripples can exist at the same time
  dropSize: 0.12,        // starting size of a ripple (fraction of the picture's shorter side)
  growSpeed: 2.3,        // how fast a ripple spreads (in starting sizes per second)
  fadeSpeed: 3.0,        // higher = ripples vanish sooner
  dropStrength: 0.22,    // how much one ripple bends the picture
  dropSpacing: 8,        // a new ripple every this many pixels of cursor movement
  warp: 0.12,            // how hard the picture bends at full cursor speed
  fullSpeed: 800,        // cursor speed (pixels per second) that counts as "full speed"

  // ---- Edge wobble (when the cursor crosses the edge) ----
  edgeDepth: 0.8,        // how far the edge moves (1.0 is roughly 9% of the picture width)
  edgeReach: 0.3,        // how far the wobble spreads (fraction of the shorter side)
  edgeWavelength: 0.22,  // distance between wobble peaks (fraction of the shorter side)
  edgeWaveSpeed: 14,     // how fast the wobble travels
  edgeCooldown: 0.4,     // seconds to wait before another wobble can start

  // ---- Canvas ----
  room: 60,              // extra pixels around the picture so the edge can bulge outwards
} as const;

const S = RIPPLE_SETTINGS;

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);

export class RippleEffect {
  private readonly canvas: HTMLCanvasElement;
  private readonly renderer: WebGLRenderer;
  private readonly scene = new Scene();
  private readonly camera = new OrthographicCamera(-1, 1, 1, -1, -1000, 1000);
  private readonly texture: Texture;
  private readonly material: ShaderMaterial;
  private readonly mesh: Mesh<PlaneGeometry, ShaderMaterial>;

  /** Size of the picture frame in CSS pixels. */
  private width = 1;
  private height = 1;

  /** Seconds since this effect was created. Every animation is driven by it. */
  private time = 0;
  private lastFrame = performance.now();
  private frameId = 0;

  /** The ripples. Each one is (x, y, birth time). We reuse them in a circle. */
  private readonly drops: Vector3[] = [];
  private nextDrop = 0;
  private lastDropAt = new Vector2(-9999, -9999); // pixels

  /** Cursor state. */
  private pointer = new Vector2(0.5, 0.5);        // uv (0..1)
  private previousPx = new Vector2(0, 0);         // pixels
  private movedThisFrame = 0;                     // pixels
  private warp = 0;                               // current bend strength
  private lastEdgeWobble = -10;                   // time of the last wobble

  /**
   * @param frame    the picture frame the canvas is added to
   * @param image    the visible <img> (only used to copy its rounded corners)
   * @param picture  a plain, fully loaded copy of the same picture. This is what gets
   *                 drawn. See attach-ripple-hover.ts for why it is a separate copy.
   */
  constructor(
    private readonly frame: HTMLElement,
    private readonly image: HTMLImageElement,
    private readonly picture: HTMLImageElement,
    /**
     * Matches the <img>'s CSS `object-position` (RippleImage's `objectPosition`
     * prop) so the picture crops from the same spot at rest and while hovering.
     * "center" (default): a normal centered crop. "top": matches `object-top`,
     * keeps the top of the picture and crops from the bottom instead.
     */
    objectPosition: "center" | "top" = "center",
  ) {
    // --- 1. The canvas: a transparent layer on top of the picture frame ---
    this.canvas = document.createElement("canvas");
    Object.assign(this.canvas.style, {
      position: "absolute",
      pointerEvents: "none", // clicks and hovers pass straight through to what is underneath
      zIndex: "2",           // above neighbouring content, so a bulge is not cut off
    });
    frame.appendChild(this.canvas);

    // --- 2. The renderer: three.js's way of drawing onto the canvas ---
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,      // transparent background
      antialias: true,  // smooth edges while the outline wobbles
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    // --- 3. The picture as a texture (the copy is already loaded, so this is instant) ---
    this.texture = new Texture(picture);
    // Browser images are sRGB; decode before shading so hover keeps their colors.
    this.texture.colorSpace = SRGBColorSpace;
    this.texture.anisotropy = 4; // keeps the picture sharp when it is bent
    this.texture.needsUpdate = true;

    // --- 4. The ripples start "unborn": born long ago, so they are invisible ---
    for (let i = 0; i < S.maxDrops; i++) this.drops.push(new Vector3(0, 0, -1000));

    // --- 5. The material: connects the shaders to our numbers ---
    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      defines: { MAX_DROPS: S.maxDrops },
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTexture: { value: this.texture },
        uPlaneSize: { value: new Vector2(1, 1) },
        uCoverScale: { value: new Vector2(1, 1) },
        uAnchorY: { value: objectPosition === "top" ? 1 : 0.5 },
        uBorderRadius: { value: 0 },
        uTime: { value: 0 },
        // ripples
        uDrops: { value: this.drops },
        uDropSize: { value: 1 },
        uGrowSpeed: { value: 1 },
        uFadeSpeed: { value: S.fadeSpeed },
        uDropStrength: { value: S.dropStrength },
        uWarp: { value: 0 },
        // edge wobble
        uEnterPoint: { value: new Vector2(0.5, 0.5) },
        uEnterTime: { value: -10 },
        uEnterDirection: { value: 1 },
        uEdgeDepth: { value: S.edgeDepth },
        uEdgeReach: { value: 1 },
        uEdgeWavelength: { value: 1 },
        uEdgeWaveSpeed: { value: S.edgeWaveSpeed },
      },
    });

    // --- 6. The flat sheet the picture is drawn on (a 128 x 128 grid of points) ---
    this.mesh = new Mesh(new PlaneGeometry(1, 1, 128, 128), this.material);
    this.scene.add(this.mesh);

    // --- 7. Measure, draw one frame right away, then keep animating ---
    this.resize();
    this.renderer.render(this.scene, this.camera);
    this.frameId = requestAnimationFrame(this.tick);
  }

  /* ------------------------------------------------------------------------
     PUBLIC: called by attach-ripple-hover.ts
     ------------------------------------------------------------------------ */

  /** The cursor came onto the picture. (x, y) are pixels inside the frame. */
  enter(x: number, y: number) {
    this.resize(); // the page may have changed size since last time
    this.setPointer(x, y);
    this.previousPx.set(x, y);
    this.startEdgeWobble(1); // +1 = coming in
  }

  /** The cursor moved over the picture. */
  move(x: number, y: number) {
    this.setPointer(x, y);

    // How far did it travel? Used to decide how hard the picture bends.
    this.movedThisFrame += Math.hypot(x - this.previousPx.x, y - this.previousPx.y);
    this.previousPx.set(x, y);

    // Leave a new ripple every few pixels of movement.
    if (Math.hypot(x - this.lastDropAt.x, y - this.lastDropAt.y) >= S.dropSpacing) {
      this.drops[this.nextDrop].set(this.pointer.x, this.pointer.y, this.time);
      this.nextDrop = (this.nextDrop + 1) % S.maxDrops;
      this.lastDropAt.set(x, y);
    }
  }

  /** The cursor left the picture. The wobble starts where it was last seen. */
  leave() {
    this.startEdgeWobble(-1); // -1 = going out
  }

  /** Stop everything and give the graphics memory back. */
  dispose() {
    cancelAnimationFrame(this.frameId);
    this.mesh.geometry.dispose();
    this.material.dispose();
    this.texture.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss(); // browsers only allow ~16 WebGL contexts at once
    this.canvas.remove();
  }

  /* ------------------------------------------------------------------------
     PRIVATE
     ------------------------------------------------------------------------ */

  /** Turn pixels (from the top-left, y down) into uv (0..1, from the bottom-left, y up). */
  private setPointer(x: number, y: number) {
    this.pointer.set(clamp01(x / this.width), clamp01(1 - y / this.height));
  }

  /** Start the edge wobble at the current pointer position. */
  private startEdgeWobble(direction: 1 | -1) {
    if (this.time - this.lastEdgeWobble < S.edgeCooldown) return; // too soon after the last one
    this.lastEdgeWobble = this.time;

    const u = this.material.uniforms;
    u.uEnterPoint.value.copy(this.pointer);
    u.uEnterTime.value = this.time;
    u.uEnterDirection.value = direction;
  }

  /** Measure the frame and tell the shaders about sizes. */
  private resize() {
    const rect = this.frame.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    const shorter = Math.min(this.width, this.height);

    // The canvas is a little bigger than the frame, so the edge has room to bulge.
    // On the right it never goes past the edge of the page. A frame near the right edge
    // (a grid's second column) would otherwise make the page wider for a moment, and the
    // horizontal scroll bar would appear and disappear on every hover, which looks like blinking.
    // (Whole numbers only, so the canvas lines up with the screen's pixels.)
    const roomRight = Math.min(S.room, Math.max(0, Math.floor(document.documentElement.clientWidth - rect.right)));
    const canvasWidth = Math.ceil(this.width) + S.room + roomRight;
    const canvasHeight = Math.ceil(this.height) + S.room * 2;
    Object.assign(this.canvas.style, { left: `${-S.room}px`, top: `${-S.room}px` });
    this.renderer.setSize(canvasWidth, canvasHeight); // also sets the CSS size

    // A camera that maps 1 unit to 1 CSS pixel, and the picture as a sheet of that size.
    this.camera.left = -canvasWidth / 2;
    this.camera.right = canvasWidth / 2;
    this.camera.top = canvasHeight / 2;
    this.camera.bottom = -canvasHeight / 2;
    this.camera.updateProjectionMatrix();
    this.mesh.scale.set(this.width, this.height, 1);

    // Put the sheet exactly where the <img> is (its size can have decimals).
    // In the camera's world, x goes right and y goes UP, the opposite of the page.
    this.mesh.position.set(
      S.room + this.width / 2 - canvasWidth / 2,
      canvasHeight / 2 - (S.room + this.height / 2),
      0,
    );

    // Crop the picture like CSS "object-fit: cover" does.
    const frameAspect = this.width / this.height;
    const imageAspect = this.picture.naturalWidth / this.picture.naturalHeight;
    const cover =
      imageAspect > frameAspect
        ? new Vector2(frameAspect / imageAspect, 1) // picture is wider: crop the sides
        : new Vector2(1, imageAspect / frameAspect); // picture is taller: crop top and bottom

    // Match the rounded corners set in CSS on the <img>.
    const radius = parseFloat(getComputedStyle(this.image).borderTopLeftRadius) || 0;

    const u = this.material.uniforms;
    u.uPlaneSize.value.set(this.width, this.height);
    u.uCoverScale.value.copy(cover);
    u.uBorderRadius.value = radius;
    u.uDropSize.value = S.dropSize * shorter;
    u.uGrowSpeed.value = S.dropSize * shorter * S.growSpeed;
    u.uEdgeReach.value = S.edgeReach * shorter;
    u.uEdgeWavelength.value = S.edgeWavelength * shorter;
  }

  /** Runs about 60 times a second while the effect is alive. */
  private tick = (now: number) => {
    const dt = Math.min((now - this.lastFrame) / 1000, 1 / 30); // seconds, capped after tab switches
    this.lastFrame = now;
    this.time += dt;

    // The bend follows cursor speed: fast cursor = strong bend, stopped = it settles flat.
    const speed = this.movedThisFrame / Math.max(dt, 0.001); // pixels per second
    const target = Math.min(speed / S.fullSpeed, 1) * S.warp;
    this.warp += (target - this.warp) * (1 - Math.exp(-dt * 10)); // ease towards the target
    this.movedThisFrame = 0;

    this.material.uniforms.uTime.value = this.time;
    this.material.uniforms.uWarp.value = this.warp;

    this.renderer.render(this.scene, this.camera);
    this.frameId = requestAnimationFrame(this.tick);
  };
}
