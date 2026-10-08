"use client";
import Image, { getImageProps, type ImageProps } from "next/image";
import mobileSources from "./mobile-sources.json";

/** Keep 8K desktop masters; phones request a smaller source with the same crop. */
export default function ResponsiveImage(props: ImageProps) {
  const mobile = typeof props.src === "string" ? (mobileSources as Record<string, string>)[props.src] : undefined;
  if (!mobile || props.unoptimized) return <Image {...props} alt={props.alt} />;
  const { props: image } = getImageProps({ ...props, src: mobile, priority: false, preload: false });
  const srcSet = image.srcSet?.split(", ").filter(candidate => Number(candidate.match(/(\d+)w$/)?.[1] ?? 0) <= 1280).join(", ");
  return <picture style={{ display: "contents" }}><source media="(max-width: 767px)" srcSet={srcSet} sizes={props.sizes ?? "100vw"} /><Image {...props} alt={props.alt} /></picture>;
}
