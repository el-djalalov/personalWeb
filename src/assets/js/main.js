/* eslint-disable no-undef */

window.darkMode = false;

const stickyClasses = ["fixed", "h-14", "!top-0"];
const unstickyClasses = ["absolute", "!top-3"];
const stickyClassesContainer = [
  "navbar-glass",
];
const unstickyClassesContainer = ["border-transparent"];
let headerElement = null;

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
// Theme toggle logic
document.addEventListener("astro:page-load", () => {
  function showDay(animate) {
    document.getElementById("sun")?.classList.remove("setting");
    document.getElementById("moon")?.classList.remove("rising");

    let timeout = 0;

    if (animate) {
      timeout = 500;

      document.getElementById("moon")?.classList.add("setting");
    }

    setTimeout(() => {
      document.getElementById("moon")?.classList.add("hidden");
      document.getElementById("sun")?.classList.remove("hidden");

      if (animate) {
        document.documentElement.classList.remove("dark");
        document.getElementById("sun")?.classList.add("rising");
      }
    }, timeout);
  }

  function showNight(animate) {
    document.getElementById("moon")?.classList.remove("setting");
    document.getElementById("sun")?.classList.remove("rising");

    let timeout = 0;

    if (animate) {
      timeout = 500;

      document.getElementById("sun")?.classList.add("setting");
    }

    setTimeout(() => {
      document.getElementById("sun")?.classList.add("hidden");
      document.getElementById("moon")?.classList.remove("hidden");

      if (animate) {
        document.documentElement.classList.add("dark");
        document.getElementById("moon")?.classList.add("rising");
      }
    }, timeout);
  }

  const theme = (() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  })();

  if (theme === "light") {
    showDay(true);
    document.documentElement.classList.remove("dark");
  } else {
    showNight(true);
    document.documentElement.classList.add("dark");
  }

  window.localStorage.setItem("theme", theme === "dark" ? "dark" : "light");

  const handleToggleClick = () => {
    document.documentElement.classList.add("duration-300");
    const element = document.documentElement;

    element.classList.toggle("dark");
    const isDark = element.classList.contains("dark");
    if (isDark) {
      localStorage.setItem("theme", "dark");
      showNight(true);
    } else {
      localStorage.setItem("theme", "light");
      showDay(true);
    }
  };

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.onclick = handleToggleClick;
  }
});

//--------------------------------------------------------
// Animate on scroll fade in
document.addEventListener("astro:page-load", () => {
  const scrollElements = document.querySelectorAll(".elementAnimate");

  scrollElements.forEach((scrollTitle) => {
    scrollTitle.classList.add("elementAnimate");
  });
});

document.addEventListener("astro:page-load", () => {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3, // Trigger animation when 50% of the card is in the viewport
    },
  );

  // Observe all elements with the '.card' class
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    observer.observe(card);
  });
});

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
        window.scrollTo({ top: 0, behavior: "smooth" });
        history.pushState(null, "", url.pathname);
        return;
      }

      const targetElement = document.getElementById(url.hash.slice(1));
      history.pushState(null, "", url.pathname + url.hash);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
