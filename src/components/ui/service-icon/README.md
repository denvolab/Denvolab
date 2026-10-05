# `service-icon/`

The Streamline icons of the service detail pages (Figma components "Icon / strategy", "Icon / layers", and so on, plus the FAQ plus/minus toggles).

| File | What it is |
|---|---|
| `service-icon.tsx` | `ServiceGlyph` (a bare glyph, 32px by default) and `ServiceIconTile` (glyph centred in a rounded 12px tile). |
| `glyphs.ts` | The glyph paths, generated from the Figma file by script. |
| `index.ts` | Barrel export. |

```tsx
<ServiceIconTile name="layers" size={56} className="bg-brand-100" />
<ServiceIconTile name="flow" size={72} glyphSize={48} className="bg-white" />
<ServiceGlyph name="check" />
```

**Where the art comes from:** every icon instance on the seven pages was exported with Figma's `exportAsync({ format: "SVG_STRING" })`. In all of them the glyph is a 32px square centred in its tile (12px in from a 56px tile, 20px from a 72px tile, scaled 1.5x in the MVP cards), filled with text/primary. The script checked that, cut the tile off and moved each glyph to a 0 0 32 32 box, so one path per icon covers every size. The tile colour is a prop because it changes with where the icon sits.

The icons are Streamline icons under CC BY 4.0. The credit line "Icons by Streamline · CC BY 4.0" is in the closing section of every service page (see `contact-cta/`); keep it there while these icons are used.
