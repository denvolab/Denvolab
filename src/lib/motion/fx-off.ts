// ---------------------------------------------------------------------------
// fxOff: a test switch for finding which effect makes scrolling shake
// (Oct 7, 2026). Development only (npm run dev); on the live site it is
// always false.
//
//   http://localhost:3000/services?fx-off=lenis          smooth scroll off
//   http://localhost:3000/services?fx-off=reveal         image corner reveal off
//   http://localhost:3000/services?fx-off=text           text line animation off
//   http://localhost:3000/services?fx-off=ripple         picture ripple off
//   http://localhost:3000/services?fx-off=carousel       carousel motion off
//   http://localhost:3000/services?fx-off=all            all of the above
//   http://localhost:3000/services?fx-off=               back to normal
//
// Several at once: ?fx-off=lenis,reveal. The choice is kept for the browser
// tab (sessionStorage), so moving between pages keeps it. Remove this file
// and its callers once the cause is found.
// ---------------------------------------------------------------------------
export type Fx = "lenis" | "reveal" | "text" | "ripple" | "carousel";

const KEY = "denvo-fx-off";

function current(): string[] {
  if (process.env.NODE_ENV === "production" || typeof window === "undefined") return [];
  try {
    const param = new URLSearchParams(window.location.search).get("fx-off");
    if (param !== null) window.sessionStorage.setItem(KEY, param);
    return (param ?? window.sessionStorage.getItem(KEY) ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  } catch {
    return [];
  }
}

export function fxOff(name: Fx): boolean {
  const off = current();
  return off.includes(name) || off.includes("all");
}
