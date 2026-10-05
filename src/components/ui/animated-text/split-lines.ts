// ---------------------------------------------------------------------------
// splitLines: cuts a heading's text into its rendered lines, for AnimatedText.
//
// Each line becomes <span class="line"><span class="line-inner">...</span>
// </span>, the markup zypsy.com's line animation uses (SplitType there): the
// outer span clips, the inner one moves.
//
// Why not GSAP's SplitText: on the case study intro (a lead in one colour, the
// rest in a nested <span>) it put two rendered lines into one, so the text
// wrapped differently after the split. This reads where every word already
// is, with Range boxes on the untouched text, before changing anything, so
// the lines are exactly the lines the browser drew. Nested elements (a span
// with its own colour) are copied into each line they appear in, and
// `white-space: pre-line` breaks are read like any other line break.
//
// revert() puts the original nodes back (the same nodes, so React's
// references to them stay valid).
// ---------------------------------------------------------------------------

export interface LineSplit {
  /** The moving `.line-inner` spans, top to bottom. */
  lines: HTMLElement[];
  revert: () => void;
}

interface Piece {
  text: string;
  /** Elements between the root and this text, outermost first. */
  path: Element[];
  /** Top of the piece's first character, or null for white space. */
  top: number | null;
  height: number;
  /** A <br>: the line ends here. */
  br?: boolean;
}

/** White space runs, and words cut after hyphens (a browser can wrap there). */
const TOKENS = /\s+|[^\s-]+-?|-/g;

export function splitLines(root: HTMLElement): LineSplit {
  const originals = Array.from(root.childNodes);
  const pieces: Piece[] = [];
  const range = document.createRange();

  const walk = (node: Node, path: Element[]) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? "";
        let offset = 0;
        for (const token of text.match(TOKENS) ?? []) {
          const start = offset;
          offset += token.length;
          if (/^\s+$/.test(token)) {
            pieces.push({ text: token, path, top: null, height: 0 });
            continue;
          }
          range.setStart(child, start);
          range.setEnd(child, start + 1);
          const box = range.getClientRects()[0] ?? range.getBoundingClientRect();
          pieces.push({ text: token, path, top: box.top, height: box.height });
        }
      } else if (child instanceof HTMLBRElement) {
        pieces.push({ text: "", path, top: null, height: 0, br: true });
      } else if (child instanceof Element) {
        walk(child, [...path, child]);
      }
    }
  };
  walk(root, []);

  // Group into lines: a piece starts a new line when it sits clearly lower
  // than the line's first piece.
  const groups: Piece[][] = [[]];
  let lineTop: number | null = null;
  for (const piece of pieces) {
    if (piece.br) {
      groups.push([]);
      lineTop = null;
      continue;
    }
    if (piece.top !== null) {
      if (lineTop !== null && piece.top > lineTop + piece.height * 0.5) groups.push([]);
      if (lineTop === null || groups[groups.length - 1].every((p) => p.top === null)) lineTop = piece.top;
    }
    groups[groups.length - 1].push(piece);
  }

  const masks: HTMLElement[] = [];
  const lines: HTMLElement[] = [];
  for (const group of groups) {
    // White space at either end of a line isn't drawn: leave it out.
    while (group.length && group[0].top === null) group.shift();
    while (group.length && group[group.length - 1].top === null) group.pop();
    if (!group.length) continue;

    const mask = document.createElement("span");
    mask.className = "line";
    const inner = document.createElement("span");
    inner.className = "line-inner";
    mask.appendChild(inner);

    // Rebuild the element path of each piece with shallow copies, reusing
    // the open copies while consecutive pieces share their elements.
    let openPath: Element[] = [];
    let openCopies: Element[] = [];
    for (const piece of group) {
      let shared = 0;
      while (shared < openPath.length && shared < piece.path.length && openPath[shared] === piece.path[shared]) {
        shared++;
      }
      openPath = openPath.slice(0, shared);
      openCopies = openCopies.slice(0, shared);
      for (let depth = shared; depth < piece.path.length; depth++) {
        const copy = piece.path[depth].cloneNode(false) as Element;
        (depth === 0 ? inner : openCopies[depth - 1]).appendChild(copy);
        openPath.push(piece.path[depth]);
        openCopies.push(copy);
      }
      (openCopies[openCopies.length - 1] ?? inner).appendChild(document.createTextNode(piece.text));
    }

    masks.push(mask);
    lines.push(inner);
  }

  root.replaceChildren(...masks);
  return {
    lines,
    revert: () => root.replaceChildren(...originals),
  };
}
