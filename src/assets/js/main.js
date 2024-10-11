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
} );


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
      if (
        typeof localStorage !== "undefined" &&
        localStorage.getItem("theme")
      ) {
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
  window.addEventListener( "scroll", () => {
    evaluateHeaderPosition();
  });
};

window.evaluateHeaderPosition = () => {
  if (window.scrollY > 16) {
    headerElement.firstElementChild.classList.add(...stickyClassesContainer);
    headerElement.firstElementChild.classList.remove(
      ...unstickyClassesContainer
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
    }
  }
  //:class="{ 'text-slate-900 dark:text-white': window.location.pathname == '{menu.url}', 'text-slate-700 dark:text-slate-400': window.location.pathname != '{menu.url}' }"
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
  new TypeIt( "#typingElements", {
    loop: true,
    strings: [ "JavaScript", "React.js", "TypeScript", "Next js", "Astro js", "Redux js", "Redux Tool Kit", "AntD v5", "Material UI", "Shadcn", "Axios", "TanStack React Query v3", "Zustand", "TanStack Table v8", "ESLInt", "StoryBook"],
    lifeLike: true,
    breakLines: false,
    nextStringDelay: [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000]
  }).go();
} );

