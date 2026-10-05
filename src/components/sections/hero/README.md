# Home hero

The homepage follows Figma 230:4043 and its 768px/390px variants. Layout and typography are scoped in `src/app/home.css`. Only the hero has `min-height:100svh`; the remaining sections use their design padding and content height.

Desktop uses a 340px bold wordmark, a services list, the cursor-following showreel, and the headline/CTA. Tablet uses the exported vector wordmark with a two-column headline and video. Mobile uses the navigation wordmark and a stacked headline, CTA, video and wrapped services. Typography uses DM Sans with optical size 14, capital/alphabetic text-box trimming and Figma letter spacing.

`moving-visual.tsx` retains GSAP cursor tracking on hover-enabled desktop devices. Below 1024px, touch screens and reduced-motion devices keep the card stationary and visible. `showreel-dialog.tsx` opens the original video with sound, then resumes the muted preview when closed.

The original asset remains `public/videos/hero-showreel.mp4`.
