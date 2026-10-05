// ---------------------------------------------------------------------------
// TEMPORARY preview page for the ProjectCard hover effects.
//
// Open http://localhost:3000/project-card-preview while `npm run dev` runs.
// Move the mouse over a picture to see the edge wobble and water ripple.
// Move it over the label under a picture to see the dash and category slide.
//
// It is not linked from the site and search engines are told to skip it.
// When you are done, delete this folder and public/images/demo/.
// ---------------------------------------------------------------------------
import type { Metadata } from "next";
import { ProjectCard } from "@/components/ui/project-card";

export const metadata: Metadata = {
  title: "ProjectCard preview",
  robots: { index: false, follow: false },
};

const projects = [
  {
    href: "#",
    name: "Cartier",
    category: "Luxury",
    imageSrc: "/images/demo/sample-cartier.jpg",
    imageAlt: "Sample picture with concentric rings and the word Cartier",
  },
  {
    href: "#",
    name: "Cogent",
    category: "AI Technologies",
    imageSrc: "/images/demo/sample-cogent.jpg",
    imageAlt: "Sample picture with a grid and the word Cogent",
  },
  {
    href: "#",
    name: "Multiply",
    category: "Business Solutions",
    imageSrc: "/images/demo/sample-multiply.jpg",
    imageAlt: "Sample picture with diagonal stripes and the word Multiply",
  },
  {
    href: "#",
    name: "Xtend Health",
    category: "Health Tech",
    imageSrc: "/images/demo/sample-xtend.jpg",
    imageAlt: "Sample picture with a checkerboard and the word Xtend",
  },
];

export default function ProjectCardPreviewPage() {
  return (
    <section className="w-full bg-background py-16">
      <div className="mx-auto w-full max-w-[1920px] px-5 md:px-10">
        <p className="mb-12 font-mono text-caption-md text-foreground-subtle">
          Temporary preview. Hover a picture, then hover a label.
        </p>

        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
