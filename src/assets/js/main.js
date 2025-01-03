/* eslint-disable no-undef */

window.darkMode = false;

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
// Active menu item
document.addEventListener("astro:page-load", () => {
  document.querySelectorAll("a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .querySelectorAll("a")
        .forEach((item) => item.classList.remove("active"));
      anchor.classList.add("active");
      const targetId = anchor.getAttribute("data-target");
      if (targetId === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        history.pushState(null, "", "/");
      } else if (targetId) {
        const targetElement = document.querySelector(targetId);

        history.pushState(null, "", targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
});
