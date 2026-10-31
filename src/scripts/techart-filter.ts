// All / Unity / Unreal switch for the Techart project list (src/components/TechartList.astro),
// used on the Techart page and, capped to a few rows, in the home page's Projects section.

// row order under the Unity / Unreal filters (slugs); unlisted projects follow in their usual
// order, and "All projects" keeps the page order
export const FILTER_ORDER: Record<string, string[]> = {
  unity: ["flow-field-agents", "gpu-pixelizer", "mass-spring-cloth", "rendering-optimization", "jump-flood-sdf"],
  unreal: ["gpu-rain-system", "pcg-forest"],
};

// shared by both lists, so "View all projects" opens the Techart page on the same filter
export const FILTER_STORAGE_KEY = "techart-engine-filter";

/** `root` holds the .filter-btn buttons and the .tx-list; `limit` caps how many rows each filter
 *  shows (the list gets .has-more when the filter has rows beyond it), and the `peek` rows after
 *  those are shown too, marked .is-peek. */
export function initTechartFilter(root: HTMLElement, limit = Infinity, peek = 0) {
  const buttons = root.querySelectorAll<HTMLButtonElement>(".filter-btn");
  const list = root.querySelector<HTMLElement>(".tx-list");
  if (!list) return;
  const rows = [...list.querySelectorAll<HTMLElement>(".project-card")];
  const order: Record<string, string[]> = JSON.parse(list.dataset.order || "{}");

  // Put the rows in this filter's order and return the ones it shows.
  function pick(filter: string) {
    const rank = order[filter] ?? [];
    const pos = (r: HTMLElement) => {
      const i = rank.indexOf(r.dataset.slug ?? "");
      return i < 0 ? rank.length + rows.indexOf(r) : i;
    };
    const sorted = [...rows].sort((a, b) => pos(a) - pos(b));
    sorted.forEach((r) => list!.append(r));
    const matching = sorted.filter((r) => filter === "all" || r.dataset.engine === filter);
    list!.classList.toggle("has-more", matching.length > limit);
    rows.forEach((r) => r.classList.toggle("is-peek", matching.indexOf(r) >= limit));
    return new Set(matching.slice(0, limit + peek));
  }

  // After filtering, renumber the visible rows (in their current order) and keep their sides alternating.
  function relayout() {
    [...list!.querySelectorAll<HTMLElement>(".project-card")].filter((r) => r.style.display !== "none").forEach((r, i) => {
      r.classList.toggle("is-flip", i % 2 === 1);
      const num = r.querySelector(".tx-num");
      if (num) num.textContent = String(i + 1).padStart(2, "0");
    });
  }

  // `animate` = false skips the fade so applying the saved filter on load doesn't flash.
  function applyFilter(filter: string, animate = true) {
    const swap = () => {
      const shown = pick(filter);
      rows.forEach((r) => (r.style.display = shown.has(r) ? "" : "none"));
      relayout();
      requestAnimationFrame(() => rows.forEach((r) => shown.has(r) && r.classList.remove("card-hidden")));
    };
    if (!animate) {
      swap();
      return;
    }
    rows.forEach((r) => r.classList.add("card-hidden"));
    setTimeout(swap, 250);
  }

  function setActive(filter: string) {
    buttons.forEach((b) => b.classList.toggle("active", b.dataset.filter === filter));
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter || "all";
      setActive(filter);
      applyFilter(filter, true);
      try {
        sessionStorage.setItem(FILTER_STORAGE_KEY, filter);
      } catch (e) {}
    });
  });

  // Restore the last-used filter (e.g. after going back from a project page).
  let saved = "all";
  try {
    saved = sessionStorage.getItem(FILTER_STORAGE_KEY) || "all";
  } catch (e) {}
  setActive(saved);
  applyFilter(saved, false);
}
