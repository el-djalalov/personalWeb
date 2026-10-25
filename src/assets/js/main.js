/* eslint-disable no-undef */

const stickyClasses = ["fixed", "h-14"];
const unstickyClasses = ["absolute"];
const stickyClassesContainer = [
  "border-slate-300/50",
  "bg-white/80",
  "dark:border-slate-600/40",
  "dark:bg-slate-900/60",
  "backdrop-blur-xl",
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
  stickyHeaderFuncionality();
  evaluateHeaderPosition();
});

window.stickyHeaderFuncionality = () => {
  window.addEventListener("scroll", () => {
    evaluateHeaderPosition();
  });
};

window.evaluateHeaderPosition = () => {
  if (window.scrollY > 16) {
    headerElement.firstElementChild.classList.add(...stickyClassesContainer);
    headerElement.firstElementChild.classList.remove(
      ...unstickyClassesContainer,
    );
    headerElement.classList.add(...stickyClasses);
    headerElement.classList.remove(...unstickyClasses);
  } else {
    headerElement.firstElementChild.classList.remove(...stickyClassesContainer);
    headerElement.firstElementChild.classList.add(...unstickyClassesContainer);
    headerElement.classList.add(...unstickyClasses);
    headerElement.classList.remove(...stickyClasses);
  }
};

//--------------------------------------------------------
// Active menu item
document.addEventListener("astro:page-load", () => {
  document.querySelectorAll("a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = anchor.getAttribute("data-target");
      const href = anchor.getAttribute("href");

      // Only prevent default for hash links or data-target links
      // Allow normal navigation for page links like /blog
      if (targetId && (targetId.startsWith("#") || targetId === "/")) {
        e.preventDefault();

        document
          .querySelectorAll("a")
          .forEach((item) => item.classList.remove("active"));
        anchor.classList.add("active");

        if (targetId === "/") {
          window.scrollTo({ top: 0, behavior: scrollBehavior() });
          history.pushState(null, "", "/");
        } else {
          const targetElement = document.querySelector(targetId);

          history.pushState(null, "", targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: scrollBehavior(),
              block: "start",
            });
          }
        }
      }
      // If href starts with # but no data-target, handle as hash link
      else if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: scrollBehavior(),
            block: "start",
          });
          history.pushState(null, "", href);
        }
      }
      // Otherwise, let the browser handle normal navigation (like /blog)
    });
  });
});
