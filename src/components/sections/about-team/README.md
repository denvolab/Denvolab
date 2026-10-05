# `about-team/` — "We care about the craft..."

Figma: "About us" frame, node `431:6464`. The closing statement over a list of the eight people on the left and a tall portrait on the right.

- `about-team.tsx` — the section (Server Component; fetches content from `lib/data/about.ts`)
- `team-roster.tsx` — the interactive list + portrait pairing (Client Component; see "Hover-to-swap portrait" below)
- `index.ts` — barrel export

## Layout

The portrait is 592 x 720 with 16px corners, 32px from the list. Each row has a 1px top border, 16px side padding and 24px top and bottom. The name (28/36, semibold) takes the left part and the role (18/28, gray) takes 40% of the row on the right. The list also has a bottom border.

Below `lg` (1024px) the portrait moves above the list, and below `md` the role sits under the name.

## Hover-to-swap portrait

Each `AboutTeamMember` now carries its own `imageSrc: string | null` (`types/about.ts`) instead of the section having one fixed `portrait`. `team-roster.tsx` is a small Client Component that tracks which row is active and shows that member's photo in the portrait slot — this is Figma's own intent for the "Team Row" component (its Hover variant is described in `claude/team-section.md`, a project doc, as "meant for the member whose portrait is showing"), it just couldn't be wired up until real per-person photos existed.

- Default (nothing hovered yet): the first member in the list with a photo. Today that's Abdur Razzak (founder), since he's listed first.
- Hovering a row swaps the portrait to that member. As of Sept 24, 2026 all 8 members have a photo, so this now works for every row.
- The `imageSrc: null` fallback still exists in the code (leaves the portrait as it was rather than going blank) in case a future member is added before their photo is ready — it just isn't exercised by anyone in `TEAM.members` right now.
- Moving the mouse off the whole list (not just between rows) reverts to the default photo.

`about-team.tsx` stays an `async` Server Component and does the data fetch; it passes `team.members` down to `TeamRoster` as a prop. This is the same split used by `about-story/` for `ScrollTextReveal` — keep the page-level data fetching on the server, push only the interactive fragment to the client.

## Team photos (added Sept 23, 2026; completed Sept 24, 2026)

The user supplied headshots for all 8 people in `lib/data/about.ts`'s `TEAM.members` (7 on Sept 23, the 8th — Mehedi Joy — on Sept 24), at `public/images/about/team/`. File-to-person mapping:

| File | Member | Note |
|---|---|---|
| `abdur-razzak.png` | Abdur Razzak (Founder/CEO) | Exact name match |
| `tanshen-mahmud.png` | Tanshen Mahmud (Co-founder/COO) | Exact name match |
| `abdur-rakib.png` | Abdur Rakib (Full Stack Developer) | Exact name match |
| `h-r-sohen.png` | H.R Sohen (Full Stack Developer) | **Uploaded as `Shohel.png`** — matched by inference (a common alternate spelling of the same name), not an exact filename match. Worth a quick confirm with the user that this is the right person. |
| `tashdik-ahmed.png` | Tashdik Ahmed (Frontend Developer) | Uploaded as `Tashdik.png` (no surname in the file name, matched on first name — only one Tashdik on the team) |
| `rex-shadhin.png` | Rex Shadhin (Graphic Designer) | Exact name match |
| `ripa.png` | Ripa (Motion Designer) | Exact name match |
| `mehedi-joy.png` | Mehedi Joy (Designer) | Added Sept 24, 2026 (uploaded as `Mehedi Joy.png`, exact name match). All 8 members now have a real photo. |
| `abdur-razzak.png` | Abdur Razzak (Founder/CEO) | Replaced Sept 24, 2026 — the user swapped in a new/updated version of his photo at the same path, no filename or data change needed. |

Originals were all 1086x1448 (3:4 portrait). The first 7 were uploaded to `public/images/About/Team memeber/` (the user's own folder, kept as-is aside from moving the files out) and renamed to kebab-case in `public/images/about/team/`; Mehedi Joy's was uploaded straight into `public/images/about/team/` and just needed the same kebab-case rename (`Mehedi Joy.png` → `mehedi-joy.png`), matching the site's existing image-folder convention (see `about-values/README.md`). The old upload folder is left empty rather than deleted.

## Judgment calls

- Figma spells two roles "Full Stake Developer". They are "Full Stack Developer" in `lib/data/about.ts`.
- The portrait aspect (592 x 720, Figma) doesn't exactly match the photos' native aspect (1086 x 1448) — both are portrait-oriented, so `object-cover` crops a small amount off the top/bottom with no visible distortion.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Pictures rise into place (from 5em lower, fading in, 0.8s) the first time they reach 70% of the screen: `data-image-reveal` is on the portrait frame (the hover photo swap is unchanged). See `components/motion/image-reveal/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
