"use client";

// ---------------------------------------------------------------------------
// LensDistortion: applies Figma's "Lens distortion" shader effect to its
// children, the way Figma applies it to a frame (see lens-shader.ts).
//
//   <LensDistortion aberration={0.03} className="bg-brand-default">
//     ...real HTML content...
//   </LensDistortion>
//
// HOW: the children render as normal HTML (so the text is real, selectable
// by search engines and screen readers, and the links work). After the
// fonts load, rasterize() draws that HTML onto a canvas, WebGL runs the
// shader on it, and the result is shown on a canvas laid over the content,
// while the HTML itself is made invisible (opacity 0, still clickable).
// It re-renders when the size changes and after a hover/focus colour
// transition inside it ends.
//
// ACCESSIBILITY / FALLBACKS:
//   - keyboard focus inside the band hides the effect and shows the crisp
//     HTML, so the focus ring is visible
//   - no WebGL2, or any error: the effect simply never turns on and the
//     plain HTML stays visible
//   - the shader only runs when the band is near the screen
//   - desktop only (from xl, 1280px): on narrower screens the text is large
//     next to the band, so the edge smear would make the paragraph and the
//     button hard to read; there the plain HTML is shown
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { loadCanvasFonts, rasterize } from "./rasterize";
import { FRAGMENT_SHADER, KERNEL_WEIGHT_SUM, SAMPLE_SPREAD, VERTEX_SHADER } from "./lens-shader";

interface LensDistortionProps {
  /** Figma "Aberration" (0-1). The service pages use 0.02 and 0.03. */
  aberration: number;
  /** Figma "Distortion" (0-1). 0 on every service page. */
  distortion?: number;
  className?: string;
  children: ReactNode;
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("createShader failed");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "shader compile failed");
  }
  return shader;
}

function createRenderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl2", { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) return null;

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "program link failed");
  }

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const loc = (name: string) => gl.getUniformLocation(program, name);
  const uniforms = {
    size: loc("uSize"),
    center: loc("uCenter"),
    radius: loc("uRadius"),
    amount: loc("uAmount"),
    chroma: loc("uChroma"),
    spread: loc("uSpread"),
    weightSum: loc("uWeightSum"),
  };

  return {
    render(source: HTMLCanvasElement, dpr: number, distortion: number, aberration: number) {
      const { width, height } = source;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.useProgram(program);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      gl.uniform2f(uniforms.size, width, height);
      gl.uniform2f(uniforms.center, width / 2, height / 2);
      gl.uniform1f(uniforms.radius, Math.sqrt(width * width + height * height) / 2);
      gl.uniform1f(uniforms.amount, distortion);
      gl.uniform1f(uniforms.chroma, (1 + Math.abs(distortion)) * aberration);
      gl.uniform1f(uniforms.spread, SAMPLE_SPREAD * dpr);
      gl.uniform1f(uniforms.weightSum, KERNEL_WEIGHT_SUM);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}

export function LensDistortion({ aberration, distortion = 0, className, children }: LensDistortionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    let renderer: ReturnType<typeof createRenderer> = null;
    try {
      renderer = createRenderer(canvas);
    } catch {
      renderer = null;
    }
    if (!renderer) return;

    const source = document.createElement("canvas");
    const desktop = window.matchMedia("(min-width: 80rem)");
    let visible = false;
    let fontsReady = false;
    let frame = 0;
    let disposed = false;

    const draw = async () => {
      frame = 0;
      if (disposed || !visible || !fontsReady || !renderer) return;
      if (!desktop.matches) {
        setActive(false);
        return;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      try {
        await loadCanvasFonts(root);
        if (disposed || !rasterize(root, source, dpr)) return;
        renderer.render(source, dpr, distortion, aberration);
        setActive(true);
      } catch {
        setActive(false);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => void draw());
    };

    document.fonts.ready.then(() => {
      fontsReady = true;
      schedule();
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(root);

    const ro = new ResizeObserver(schedule);
    ro.observe(root);

    // Hover / press colours on the button: redraw once the transition ends.
    root.addEventListener("transitionend", schedule);
    desktop.addEventListener("change", schedule);

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      root.removeEventListener("transitionend", schedule);
      desktop.removeEventListener("change", schedule);
    };
  }, [aberration, distortion]);

  return (
    <div ref={rootRef} className={cn("group/lens relative", className)}>
      <div
        className={cn(
          active && "opacity-0 group-has-[:focus-visible]/lens:opacity-100",
        )}
      >
        {children}
      </div>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 size-full",
          active ? "group-has-[:focus-visible]/lens:hidden" : "hidden",
        )}
      />
    </div>
  );
}
