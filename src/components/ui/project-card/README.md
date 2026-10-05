# project-card

One project in a grid: a picture on top, and a label row under it that reads
**"Name -- Category"** (for example "Cartier -- Luxury"). Copied from the project cards on 14islands.com.

## What happens on hover

**On the picture** (WebGL, from `components/ui/ripple-image/`)

1. **Edge wobble.** The outline near the cursor jiggles like jelly where it crosses the edge.
2. **Water ripple.** The picture bends around the cursor and settles when the cursor stops.

**On the label** (plain CSS, in this folder)

3. The small **dash** stretches to 1.6x its length, growing from its left edge.
4. The **category** text slides 0.5em to the right.

Both label effects take 0.3 seconds with an ease-out curve.

```
+---------------------------+
|                           |
|          IMAGE            |   edge wobble + water ripple
|                           |
+---------------------------+
Cartier  --  Luxury            normal
Cartier  ---- Luxury           label hovered (dash longer, Luxury moved right)
```

## Files

| File | What it does |
| --- | --- |
| `project-card.tsx` | Builds the HTML (picture, name, dash, category). The picture is a `RippleImage`. |
| `project-card.module.css` | The label animation and the card layout. |
| `index.ts` | Lets you import with `@/components/ui/project-card`. |

The picture effect is not in this folder any more. It lives in `components/ui/ripple-image/`
so any other picture on the site can use it. Read that README to change how the ripple feels.

## How to use it

```tsx
import { ProjectCard } from "@/components/ui/project-card";

<ProjectCard
  href="/work/cartier"
  name="Cartier"
  category="Luxury"
  imageSrc="/images/cartier.jpg"
  imageAlt="Two hands wearing a gold ring"
/>
```

## How the label animation works

Three CSS ideas: `transform` (moves or resizes without disturbing the layout), `transition` (animate changes
smoothly), and `:hover` (the trigger). Read `project-card.module.css` from the top, every step is commented.

## How to change the label

The numbers are at the top of `project-card.module.css`, inside `.card`.

| I want to... | Change |
| --- | --- |
| Faster or slower | `--hover-duration` |
| Different feel of the motion | `--hover-easing` |
| Longer or shorter dash | `--dash-stretch` |
| Slide the category further | `--category-shift` |
| Use DenvoLab colors | `--title-color` and `--category-color` |
| Make the label also react when the cursor is on the picture | In section 6, change `.label:hover` to `.card:hover` (two places) |

## Good to know

- **"Reduce motion":** with reduce motion on, the label snaps straight to its hover state instead of animating,
  and the picture effect is off. Keyboard focus still triggers the label change.
- **The homepage portfolio grid does not use this card.** Its design (title, description, tag chips) is different,
  so it uses `RippleImage` directly for the picture and keeps its own text layout.

## Not included yet

The 14islands cards also fade and zoom the picture in (scale 1.1 to 1 over 1.2 seconds, with a blur to sharp reveal)
when they first scroll into view. That is a separate scroll animation, not part of the hover, so it is left for the next step.
