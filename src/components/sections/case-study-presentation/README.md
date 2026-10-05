# Shared case study presentation

All eleven `/case-studies/[slug]` routes render the same updated Job Sea
template from Figma `557:9828`. Change project content in
`src/lib/data/case-study/presentation-data.ts`; do not fork the renderer.

The shared order is editorial hero and facts, introduction with product overview,
challenge with campaign banner and three solution cards, six-tile branding collage,
typography and original vector logo grid, palette, six responsive showcases,
and the existing closing CTA. The layout adapts at 1280px and 640px using the
approved tablet and mobile type scales. Case study sections use the updated Figma content heights, padding and gaps,
without the site-wide 100vh minimum. Introduction/overview and
challenge/banner/solution each share one section with an 80px desktop gap.
The closing CTA retains its previously approved content height.

Media is stored locally under `public/images/case-studies/<slug>/current`.
Original 8K landscape/portrait Figma assets retain their source dimensions.
Some Job Sea detail illustrations were supplied at lower resolutions; their
recorded intrinsic dimensions are accurate. All image and video slots use `object-fit: cover` to fill their frames
without letterboxing, with cropping determined by the existing frame ratios. SVG logos retain native Figma paths and grids.

Add a real walkthrough to a project's optional `video` property:

```ts
video: { src: "/videos/project-walkthrough.mp4", type: "video/mp4",
         captions: "/videos/project-walkthrough.en.vtt" }
```

The overview image serves as its poster. Without a video source, the image
renders without a non-functional play button. Image/video/text content changes
do not require template edits. `CaseStudyPresentation` provides compile-time
checks for every project's content.
