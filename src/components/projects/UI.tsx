import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { getProjects, type Project } from "@/i18n/projects";
import type { Language } from "@/content.config";

const translations = {
  en: {
    title: "My Projects",
    descriptionPrefix: "Here are ",
    descriptionHighlight: "some",
    descriptionSuffix: " of my recent projects. I'm always working on something new, so check back often!",
    close: "Close project details",
  },
  uz: {
    title: "Loyihalarim",
    descriptionPrefix: "Mana so'nggi loyihalarimdan ",
    descriptionHighlight: "ba'zilari",
    descriptionSuffix: ". Doimo yangi narsalar ustida ishlayapman, shuning uchun tez-tez qaytib keling!",
    close: "Loyiha tafsilotlarini yopish",
  },
  ru: {
    title: "Мои проекты",
    descriptionPrefix: "Вот ",
    descriptionHighlight: "некоторые",
    descriptionSuffix: " из моих последних проектов. Я всегда работаю над чем-то новым, так что заходите почаще!",
    close: "Закрыть описание проекта",
  },
};

const useIsDesktop = () => {
  // Start as the server rendered (mobile) and correct it after hydration, so
  // the markup matches and React applies the desktop attributes on re-render
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    setIsDesktop(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
};

interface Props {
  lang?: Language;
}

// Whether the browser can keep a dialog visible while `display` transitions to
// none (Firefox can't yet, even though it parses allow-discrete)
let supportsDisplayTransition: boolean | undefined;
function canTransitionDisplay() {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
  if (!window.CSS?.supports?.("transition-behavior", "allow-discrete")) {
    return (supportsDisplayTransition = false);
  }
  const probe = document.createElement("div");
  probe.style.cssText = "transition: display 1s allow-discrete !important; display: block;";
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = "none";
  supportsDisplayTransition = getComputedStyle(probe).display === "block";
  probe.remove();
  return supportsDisplayTransition;
}

// Close with the exit animation. Where the browser can't animate a dialog out
// of the top layer natively, play the exit via [data-closing] first.
async function closeDialog(dialog: HTMLDialogElement) {
  if (!dialog.open || dialog.hasAttribute("data-closing")) return;

  const nativeExit = window.CSS?.supports?.("overlay", "auto") && canTransitionDisplay();
  if (!nativeExit) {
    dialog.setAttribute("data-closing", "");
    // The dialog and its ::backdrop share a duration, so waiting on the dialog is enough
    const animations = dialog.getAnimations();
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);
    }
    dialog.removeAttribute("data-closing");
  }
  dialog.close();
}

const Projects = ({ lang = "en" }: Props) => {
  const projects = getProjects(lang);
  const t = translations[lang] || translations.en;
  const isDesktop = useIsDesktop();

  // Desktop: modal dialog. Mobile: inline accordion.
  const [active, setActive] = useState<Project | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (active && dialog && !dialog.open) dialog.showModal();
  }, [active]);

  // Close the desktop dialog if the viewport shrinks to mobile
  useEffect(() => {
    if (!isDesktop) dialogRef.current?.close();
  }, [isDesktop]);

  useEffect(() => {
    const dialog = dialogRef.current;
    // Light-dismiss fallback for browsers without <dialog closedby> (Safari)
    if (!dialog || "closedBy" in HTMLDialogElement.prototype) return;

    const onClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isDialogContent) closeDialog(dialog);
    };

    dialog.addEventListener("click", onClick);
    return () => dialog.removeEventListener("click", onClick);
  }, []);

  const onCardSelect = (card: Project) => {
    if (isDesktop) {
      setActive(card);
    } else {
      setExpanded((current) => (current === card.title ? null : card.title));
    }
  };

  return (
    // reducedMotion="user": skip transform/layout animations for reduced motion
    <MotionConfig reducedMotion="user">
    <section className="relative max-w-5xl mx-auto py-8 px-4 lg:px-0" id="projects">
      <div className="flex flex-col">
        <h2
          className="flex flex-row mb-3 pb-2 font-bold !leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                    bg-gradient-to-r from-cyan-900 via-fuchsia-800 to-blue-700 bg-clip-text text-transparent transition-all duration-300 ease-in-out"
        >
          {t.title}
        </h2>
        <p className="mb-6 text-base dark:text-muted-foreground">
          {t.descriptionPrefix}<u>{t.descriptionHighlight}</u>{t.descriptionSuffix}
        </p>
      </div>

      <dialog
        ref={dialogRef}
        // closedby="any": close on backdrop click as well as Esc
        {...({ closedby: "any" } as object)}
        aria-labelledby={`${id}-dialog-title`}
        // Route Esc / light dismiss through closeDialog so they animate too
        onCancel={(event) => {
          event.preventDefault();
          closeDialog(event.currentTarget);
        }}
        onClose={() => setActive(null)}
        className="project-dialog w-full max-w-[500px] max-h-[90%] p-0 bg-slate-50 dark:bg-slate-900 rounded-3xl"
      >
        {active && (
          <div className="flex flex-col">
            <img
              width={200}
              height={200}
              src={active.src}
              alt=""
              className="w-full h-80 rounded-t-3xl object-cover object-top"
            />
            <div className="flex justify-between items-start gap-4 p-4">
              <div>
                <h3
                  id={`${id}-dialog-title`}
                  className="font-medium text-slate-700 dark:text-neutral-200 text-base"
                >
                  {active.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-base">
                  {active.description}
                </p>
              </div>
              <a
                href={active.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-slate-900"
              >
                {active.ctaText}
              </a>
            </div>
            <p className="px-4 pt-4 pb-6 text-slate-500 dark:text-slate-300 text-sm lg:text-base">
              {active.content}
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={() => dialogRef.current && closeDialog(dialogRef.current)}
          aria-label={t.close}
          className="absolute top-3 right-3 flex items-center justify-center bg-white/90 dark:bg-slate-800/90 rounded-full h-8 w-8 text-slate-600 dark:text-slate-300 shadow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </dialog>

      <ul className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {projects.map((card) => {
          const isOpen = !isDesktop && expanded === card.title;
          const contentId = `${id}-${card.title.replace(/\W+/g, "-")}`;
          return (
            <motion.li
              whileHover={{ y: -5 }}
              key={card.title}
              className="relative flex flex-col shadow-xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 rounded-xl has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-violet-500 has-[button:focus-visible]:ring-offset-2 dark:has-[button:focus-visible]:ring-offset-slate-900"
            >
              <div className="flex gap-4 flex-col w-full">
                <img
                  loading="lazy"
                  width={200}
                  height={200}
                  src={card.src}
                  alt=""
                  className="h-60 w-full rounded-t-xl object-cover object-top"
                />
                <div className="flex justify-between items-start gap-3 w-full p-4">
                  <div className="flex justify-center items-start flex-col">
                    <h3 className="font-medium text-slate-800 dark:text-slate-200 text-left text-base">
                      {/* The ::after overlay makes the whole card the click target */}
                      <button
                        type="button"
                        onClick={() => onCardSelect(card)}
                        aria-expanded={isDesktop ? undefined : isOpen}
                        aria-controls={isDesktop ? undefined : contentId}
                        aria-haspopup={isDesktop ? "dialog" : undefined}
                        className="text-left outline-none after:absolute after:inset-0 after:rounded-xl after:content-['']"
                      >
                        {card.title}
                      </button>
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-left text-base">
                      {card.description}
                    </p>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-1 shrink-0 text-slate-400 dark:text-slate-500 md:hidden"
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </motion.span>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    id={contentId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden md:hidden"
                  >
                    <div className="px-4 pb-4 flex flex-col gap-4">
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        {card.content}
                      </p>
                      {/* Above the card's click overlay so it stays clickable */}
                      <a
                        href={card.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 self-start px-4 py-2 text-sm rounded-full font-bold bg-green-500 hover:bg-green-400 text-slate-900 transition-colors"
                      >
                        {card.ctaText} ↗
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>
    </section>
    </MotionConfig>
  );
};

export default Projects;
