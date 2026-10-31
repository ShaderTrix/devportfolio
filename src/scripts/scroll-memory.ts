// Return to the same spot on a page: after the browser's Back / Reload, and after a link marked
// data-scroll-return (the project pages' "Back to Techart"), which is a fresh visit to the browser.
// The browser's own restore lands short on the long project lists (it runs before the filter has
// reordered and hidden rows), so each page keeps its scroll position in sessionStorage instead.

const KEY = "scroll:";
const RETURN_KEY = "scroll-return";
const path = (url: string) => new URL(url, location.href).pathname.replace(/\/+$/, "") || "/";

export function initScrollMemory() {
  const here = path(location.href);
  try {
    history.scrollRestoration = "manual";
  } catch (e) {}

  addEventListener("pagehide", () => {
    try {
      sessionStorage.setItem(KEY + here, String(Math.round(scrollY)));
    } catch (e) {}
  });

  document.addEventListener("click", (e) => {
    const link = (e.target as Element).closest<HTMLAnchorElement>("a[data-scroll-return]");
    if (!link) return;
    try {
      sessionStorage.setItem(RETURN_KEY, path(link.href));
    } catch (e) {}
  });

  let saved: string | null = null;
  let returning = false;
  try {
    saved = sessionStorage.getItem(KEY + here);
    returning = sessionStorage.getItem(RETURN_KEY) === here;
    sessionStorage.removeItem(RETURN_KEY);
  } catch (e) {}
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  const restore = returning || nav?.type === "back_forward" || nav?.type === "reload";
  if (!restore || saved === null) return;

  // Astro may inline this script, and an inline module can run after DOMContentLoaded, so don't wait
  // for it. Apply on the next frame (the list filters have run by then), and once more when the page
  // has loaded in case late content moved things, unless the visitor has started scrolling.
  const y = Number(saved);
  let touched = false;
  const touch = () => (touched = true);
  for (const ev of ["wheel", "touchstart", "keydown", "pointerdown"]) addEventListener(ev, touch, { once: true, passive: true });
  const apply = () => !touched && scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
  requestAnimationFrame(apply);
  if (document.readyState !== "complete") addEventListener("load", () => requestAnimationFrame(apply), { once: true });
}
