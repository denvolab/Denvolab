// ---------------------------------------------------------------------------
// isHydrated: has React taken over this element yet?
//
// The text line animation (motion/text-reveal) and the picture reveal
// (motion/image-reveal) change the page's DOM. Next.js streams a page in
// parts and React hydrates each part when it is ready, so on a slow phone or
// in production a part can still be plain server HTML when they run. If they
// split its text first, React finds DOM it didn't render, rebuilds that part
// and fails to remove nodes that were moved: "Failed to execute
// 'removeChild' on 'Node'" (Oct 8, 2026). They now leave an element alone
// until React has hydrated it, and try again a moment later.
//
// React marks every element it has hydrated or rendered with an own property
// whose name starts with "__reactFiber$".
// ---------------------------------------------------------------------------
export function isHydrated(el: Element): boolean {
  for (const key in el) {
    if (key.startsWith("__reactFiber$")) return true;
  }
  return false;
}
