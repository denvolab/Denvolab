// ---------------------------------------------------------------------------
// ServiceGlyph / ServiceIconTile: the Streamline icons of the service detail
// pages (Figma components "Icon / strategy", "Icon / layers", ...).
//
// In Figma an icon is a rounded 12px-radius tile with the glyph centred in
// it. The tile color and size change with the place it sits in (56px lime
// tile in lists, 72px grey tile in cards, white tile on tinted cards), so
// the tile is a prop here and the glyph art lives in glyphs.ts.
//
//   <ServiceIconTile name="layers" size={56} className="bg-brand-100" />
//   <ServiceGlyph name="check" />            // bare 32px glyph
//
// The glyph is always drawn in currentColor (text-primary by default).
// Decorative: the text next to an icon already says what it is, so the SVG
// is aria-hidden.
// ---------------------------------------------------------------------------
import { cn } from "@/lib/utils/cn";
import { GLYPH_BOX, SERVICE_GLYPHS, type ServiceGlyphName } from "./glyphs";

interface ServiceGlyphProps {
  name: ServiceGlyphName;
  /** Rendered glyph size in px (32 everywhere except the MVP wide cards: 48). */
  size?: number;
  className?: string;
}

export function ServiceGlyph({ name, size = GLYPH_BOX, className }: ServiceGlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${GLYPH_BOX} ${GLYPH_BOX}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0 overflow-hidden", className)}
    >
      <path fillRule="evenodd" clipRule="evenodd" d={SERVICE_GLYPHS[name]} />
    </svg>
  );
}

interface ServiceIconTileProps {
  name: ServiceGlyphName;
  /** Tile size in px: 56 or 72 in the designs. */
  size: 56 | 72;
  /** Glyph size in px (defaults to 32, the Figma glyph box). */
  glyphSize?: number;
  /** Tile background, e.g. "bg-brand-100" (Brand/100) or "bg-secondary-50". */
  className?: string;
}

export function ServiceIconTile({ name, size, glyphSize = GLYPH_BOX, className }: ServiceIconTileProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[12px] text-text-primary",
        size === 56 ? "size-14" : "size-18",
        className,
      )}
    >
      <ServiceGlyph name={name} size={glyphSize} />
    </span>
  );
}
