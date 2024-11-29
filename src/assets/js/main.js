/* eslint-disable no-undef */
// Add your javascript here
import TypeIt from "typeit";

window.darkMode = false;

const stickyClasses = ["fixed", "h-14"];
const unstickyClasses = ["absolute", "h-20"];
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
  applyMenuItemClasses();
  evaluateHeaderPosition();
  mobileMenuFunctionality();
});

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
    document.getElementById("menu").classList.add("top-[56px]");
    document.getElementById("menu").classList.remove("top-[75px]");
  } else {
    headerElement.firstElementChild.classList.remove(...stickyClassesContainer);
    headerElement.firstElementChild.classList.add(...unstickyClassesContainer);
    headerElement.classList.add(...unstickyClasses);
    headerElement.classList.remove(...stickyClasses);
    document.getElementById("menu").classList.remove("top-[56px]");
    document.getElementById("menu").classList.add("top-[75px]");
  }
};

/* Mobile view */

window.applyMenuItemClasses = () => {
  const menuItems = document.querySelectorAll("#menu a");
  for (let i = 0; i < menuItems.length; i++) {
    if (menuItems[i].pathname === window.location.pathname) {
      menuItems[i].classList.add("text-slate-900", "dark:text-white");
    } else {
      menuItems[i].classList.remove("text-slate-900", "dark:text-white");
    }
  }
};

function mobileMenuFunctionality() {
  document.getElementById("openMenu").addEventListener("click", () => {
    openMobileMenu();
  });

  document.getElementById("closeMenu").addEventListener("click", () => {
    closeMobileMenu();
  });
}

window.openMobileMenu = () => {
  document.getElementById("openMenu").classList.add("hidden");
  document.getElementById("closeMenu").classList.remove("hidden");
  document.getElementById("menu").classList.remove("hidden");
  document.getElementById("mobileMenuBackground").classList.add("opacity-0");
  document.getElementById("mobileMenuBackground").classList.remove("hidden");

  setTimeout(() => {
    document
      .getElementById("mobileMenuBackground")
      .classList.remove("opacity-0");
  }, 1);
};

window.closeMobileMenu = () => {
  document.getElementById("closeMenu").classList.add("hidden");
  document.getElementById("openMenu").classList.remove("hidden");
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("mobileMenuBackground").classList.add("hidden");
};

document.addEventListener("astro:page-load", function () {
  new TypeIt("#typingElements", {
    loop: true,
    strings: [
      "JavaScript",
      "React.js",
      "TypeScript",
      "Next js",
      "Astro js",
      "Redux js",
      "Redux Tool Kit",
      "AntD v5",
      "Material UI",
      "Shadcn",
      "Axios",
      "TanStack React Query v3",
      "Zustand",
      "TanStack Table v8",
      "ESLInt",
      "StoryBook",
    ],
    lifeLike: true,
    breakLines: false,
    nextStringDelay: [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000],
  }).go();
});

// Animate on scroll

// Include the scroll handling JS logic here
document.addEventListener("astro:page-load", () => {
  // Just make sure all elements with scrollTitle animate in on page load
  const scrollElements = document.querySelectorAll(".elementAnimate");

  // Ensure all scrollTitle elements are visible on load (in case they start with the class).
  scrollElements.forEach((scrollTitle) => {
    scrollTitle.classList.add("elementAnimate"); // Apply the animation when the page loads
  });
});

document.addEventListener("astro:page-load", () => {
  // Create an IntersectionObserver to detect when cards come into view
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        // If the card is in the viewport, add the 'visible' class
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Stop observing once the card is in view
        }
      });
    },
    {
      threshold: 0.5, // Trigger animation when 50% of the card is in the viewport
    },
  );

  // Observe all elements with the '.card' class
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    observer.observe(card);
  });
});
