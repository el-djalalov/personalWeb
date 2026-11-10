/* eslint-disable no-undef */

// Same-page section links (header, bottom bar, hero buttons, menu, footer)
// scroll smoothly, or jump for users who prefer reduced motion, and keep the
// address bar in sync. One delegated listener: this module runs once per full
// page load, and ClientRouter swaps pages without running it again.
// Capture phase, so it runs before ClientRouter's own link handling.

const scrollBehavior = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

const normalizePath = path =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

document.addEventListener(
  "click",
  event => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    const anchor = event.target.closest?.("a[href]");
    if (!anchor || anchor.target === "_blank") return;

    const url = new URL(anchor.getAttribute("href"), window.location.href);
    const samePage =
      url.origin === window.location.origin &&
      normalizePath(url.pathname) === normalizePath(window.location.pathname);
    // Another page (a blog post, or the home page from a post): let it navigate
    if (!samePage) return;

    if (!url.hash) {
      // Only the bars' home links scroll to the top; other links behave as usual
      if (!anchor.closest("#header, #bottomNav")) return;
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
      history.pushState(null, "", url.pathname);
      return;
    }

    let id = url.hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch {
      // Malformed %-escape: use the raw hash
    }
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const oldURL = window.location.href;
    history.pushState(null, "", url.pathname + url.hash);
    target.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    // pushState does not fire hashchange; sections such as the case files listen for it
    window.dispatchEvent(
      new HashChangeEvent("hashchange", { oldURL, newURL: window.location.href }),
    );
  },
  { capture: true },
);
