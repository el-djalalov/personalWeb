/* eslint-disable no-undef */

const stickyClasses = ["fixed", "h-14", "!top-0"];
const unstickyClasses = ["absolute", "!top-3"];
const stickyClassesContainer = [
  "navbar-glass",
];
const unstickyClassesContainer = ["border-transparent"];
let headerElement = null;

// Jump instead of smooth-scrolling for users who prefer reduced motion
const scrollBehavior = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

document.addEventListener("astro:page-load", () => {
  headerElement = document.getElementById("header");
  evaluateHeaderPosition();
});

// Added once: this module runs once per full page load, while
// astro:page-load fires again on every client-side navigation
window.addEventListener("scroll", () => evaluateHeaderPosition(), {
  passive: true,
});

window.evaluateHeaderPosition = () => {
  if (!headerElement) return;

  const isDesktop = window.innerWidth >= 768;

  if (isDesktop) {
    // Desktop behavior: apply blur background on scroll
    if (window.scrollY > 16) {
      headerElement.firstElementChild.classList.add(...stickyClassesContainer);
      headerElement.firstElementChild.classList.remove(...unstickyClassesContainer);
      headerElement.classList.add(...stickyClasses);
      headerElement.classList.remove(...unstickyClasses);
    } else {
      headerElement.firstElementChild.classList.remove(...stickyClassesContainer);
      headerElement.firstElementChild.classList.add(...unstickyClassesContainer);
      headerElement.classList.add(...unstickyClasses);
      headerElement.classList.remove(...stickyClasses);
    }
  } else {
    // Mobile behavior: no blur background, keep fixed position
    headerElement.firstElementChild.classList.remove(...stickyClassesContainer);
    headerElement.firstElementChild.classList.add(...unstickyClassesContainer);
  }
};

//--------------------------------------------------------
// Nav links: smooth-scroll for same-page section links (desktop nav + mobile bottom nav)
document.addEventListener("astro:page-load", () => {
  const normalizePath = (path) =>
    path.length > 1 ? path.replace(/\/+$/, "") : path;

  const navAnchors = document.querySelectorAll(
    "#header nav a, #bottomNav a",
  );

  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = anchor.getAttribute("href");
      if (!href) return;

      const url = new URL(href, window.location.origin);
      const samePage =
        normalizePath(url.pathname) === normalizePath(window.location.pathname);

      // Different page (e.g. /blog, or homepage link from a blog post): let it navigate
      if (!samePage) return;

      e.preventDefault();

      // Desktop nav active state
      document
        .querySelectorAll("#header nav a")
        .forEach((item) => item.classList.remove("active"));
      if (anchor.closest("#header")) anchor.classList.add("active");

      if (!url.hash) {
        window.scrollTo({ top: 0, behavior: scrollBehavior() });
        history.pushState(null, "", url.pathname);
        return;
      }

      const targetElement = document.getElementById(url.hash.slice(1));
      history.pushState(null, "", url.pathname + url.hash);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: scrollBehavior(),
          block: "start",
        });
      }
    });
  });
});
