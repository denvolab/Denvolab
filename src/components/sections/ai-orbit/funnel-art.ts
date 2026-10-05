// ---------------------------------------------------------------------------
// GENERATED from Figma node 572:1572 on Sept 27 2026 (exported with
// exportAsync SVG_STRING, values copied by script, not by hand). All paths
// are in "Workflow Canvas" coordinates: a 1635 x 680 box placed at (143, 422)
// in the 1920 x 1393 frame.
//
// FUNNEL_MASK_PATH   -> "Rectangle 5434" (574:1535), the VECTOR mask that
//                       clips the whole canvas to the funnel shape. Figma
//                       can't export a mask layer on its own, but it has the
//                       exact same vector network as the overlay below
//                       (573:1608), so this is that path, with Figma's
//                       per-corner radii (120 at the neck, 999 at the
//                       bottom) already baked in by the export.
// CANVAS_BG_PATH     -> "Rectangle 5432" (572:1834), the funnel's fill.
// OVERLAY            -> "Rectangle 5433" (573:1608), the top + bottom fade:
//                       solid at the top, fully transparent at ~350, solid
//                       again from ~511 down (so icons fade in at the mouth
//                       and fade out into the neck).
// HUB_LOGO_PATH      -> "Central Hub" (574:1541): 220 x 220 circle at
//                       (707, 442) with the lime Denvo mark.
// ---------------------------------------------------------------------------

export const CANVAS_W = 1635;
export const CANVAS_H = 680;
export const CANVAS_X = 143;
export const CANVAS_Y = 422;

export const FUNNEL_MASK_PATH =
  "M0 0H1635L971.94 420.707C963.776 425.887 958.556 434.637 957.877 444.282L949.989 556.326C945.084 625.991 887.139 680 817.301 680C747.628 680 689.76 626.236 684.645 556.751L677.108 454.375C676.437 445.264 671.547 436.989 663.89 432.006L0 0Z";

export const CANVAS_BG_PATH =
  "M0 0H1635L971.152 432.007C963.495 436.99 958.605 445.263 957.933 454.374L950.391 556.565C945.255 626.159 887.294 680 817.511 680C747.719 680 689.754 626.145 684.629 556.542L677.108 454.375C676.437 445.264 671.547 436.989 663.89 432.006L0 0Z";
export const CANVAS_BG_GRADIENT = { y2: 601.729, from: "#142030", to: "#1E2D42" };

export const OVERLAY_PATH = FUNNEL_MASK_PATH;
export const OVERLAY_GRADIENT = {
  y2: 511.5,
  stops: [
    { offset: 0, color: "#142030", opacity: 1 },
    { offset: 0.684561, color: "#1B293C", opacity: 0 },
    { offset: 1, color: "#1E2D42", opacity: 1 },
  ],
};

export const HUB = { x: 707, y: 442, size: 220, fill: "#142030", logoFill: "#DCE54E" };
export const HUB_LOGO_PATH =
  "M109.713 40.1758C82.743 40.1758 60.8651 72.0204 60.8651 111.296C60.8651 150.571 82.7294 182.409 109.699 182.409C136.669 182.409 158.554 150.565 158.554 111.296C158.554 72.0272 136.71 40.1758 109.713 40.1758ZM109.713 169.784C94.4842 166.494 94.5929 116.313 94.5997 110.956C94.5997 104.837 94.7153 56.0505 109.713 52.8008C122.474 50.0337 146.187 80.2467 146.187 111.269C146.187 142.291 122.488 172.544 109.713 169.784Z";
