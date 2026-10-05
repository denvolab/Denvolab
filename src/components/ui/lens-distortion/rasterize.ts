// ---------------------------------------------------------------------------
// rasterize(): draws an element's own content onto a 2D canvas, so the lens
// shader has a picture to distort. It is not a general HTML renderer; it
// covers what the Conversation band contains:
//   - the element's background colour (the whole frame)
//   - solid backgrounds of descendants, with their border radius (buttons)
//   - text, in each element's real font, colour and position
//
// TEXT: every character is drawn at the spot the browser itself laid it
// out (measured with a DOM Range), so line breaks, letter-spacing and
// kerning come out exactly as in the live HTML; only the glyph is drawn by
// the canvas. Baseline = top of the character box + the font's ascent, the
// same metrics the browser used for the box.
// ---------------------------------------------------------------------------

// Canvas text can't take font-variation-settings. The one variation used on
// these pages is DM Sans' fixed opsz-14 cut (Display styles, see
// styles/tokens/typography.css), and that cut is exactly the site's default
// weight-only "DM Sans Variable" file, so the canvas draws those glyphs from
// that file instead.
function canvasFont(style: CSSStyleDeclaration) {
  let family = style.fontFamily;
  if (/"opsz" 14\b/.test(style.fontVariationSettings) && family.includes("DM Sans Opsz")) {
    family = family.replace(/"DM Sans Opsz"/, '"DM Sans Variable"');
  }
  return `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${family}`;
}

/** Loads every font rasterize() is about to use (call and await first). */
export async function loadCanvasFonts(root: HTMLElement) {
  const fonts = new Set<string>();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.parentElement && node.textContent?.trim()) fonts.add(canvasFont(getComputedStyle(node.parentElement)));
  }
  await Promise.all([...fonts].map((font) => document.fonts.load(font)));
}

function isTransparent(color: string) {
  return color === "transparent" || color === "rgba(0, 0, 0, 0)";
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  ctx.fill();
}

function applyTextTransform(text: string, transform: string) {
  if (transform === "uppercase") return text.toUpperCase();
  if (transform === "lowercase") return text.toLowerCase();
  return text;
}

export function rasterize(root: HTMLElement, canvas: HTMLCanvasElement | OffscreenCanvas, dpr: number) {
  const rootRect = root.getBoundingClientRect();
  const width = Math.max(1, Math.round(rootRect.width * dpr));
  const height = Math.max(1, Math.round(rootRect.height * dpr));
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const rootStyle = getComputedStyle(root);
  ctx.fillStyle = rootStyle.backgroundColor;
  ctx.fillRect(0, 0, rootRect.width, rootRect.height);

  const range = document.createRange();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  let node: Node | null = walker.nextNode();

  while (node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (el.tagName === "CANVAS") {
        node = walker.nextSibling() ?? walker.nextNode();
        continue;
      }
      const style = getComputedStyle(el);
      if (!isTransparent(style.backgroundColor)) {
        const r = el.getBoundingClientRect();
        ctx.fillStyle = style.backgroundColor;
        roundRect(ctx, r.left - rootRect.left, r.top - rootRect.top, r.width, r.height, parseFloat(style.borderTopLeftRadius) || 0);
      }
    } else if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
      const textNode = node as Text;
      const style = getComputedStyle(node.parentElement);
      ctx.font = canvasFont(style);
      ctx.fillStyle = style.color;
      ctx.textBaseline = "alphabetic";
      const ascent = ctx.measureText("H").fontBoundingBoxAscent;
      const data = textNode.data;

      for (let i = 0; i < data.length; i += 1) {
        // Skip whitespace and the low half of surrogate pairs.
        if (/\s/.test(data[i])) continue;
        const end = data.codePointAt(i)! > 0xffff ? i + 2 : i + 1;
        range.setStart(textNode, i);
        range.setEnd(textNode, end);
        const r = range.getBoundingClientRect();
        if (r.width > 0) {
          const ch = applyTextTransform(data.slice(i, end), style.textTransform);
          ctx.fillText(ch, r.left - rootRect.left, r.top - rootRect.top + ascent);
        }
        i = end - 1;
      }
    }
    node = walker.nextNode();
  }

  return { width, height };
}
