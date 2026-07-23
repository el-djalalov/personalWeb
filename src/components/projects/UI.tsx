import { useEffect, useId, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/lib/use-outside-click";
import { getProjects, type Project } from "@/i18n/projects";
import type { Language } from "@/content.config";

const translations = {
  en: {
    title: "My Projects",
    descriptionPrefix: "Here are ",
    descriptionHighlight: "some",
    descriptionSuffix: " of my recent projects. I'm always working on something new, so check back often!",
  },
  uz: {
    title: "Loyihalarim",
    descriptionPrefix: "Mana so'nggi loyihalarimdan ",
    descriptionHighlight: "ba'zilari",
    descriptionSuffix: ". Doimo yangi narsalar ustida ishlayapman, shuning uchun tez-tez qaytib keling!",
  },
  ru: {
    title: "Мои проекты",
    descriptionPrefix: "Вот ",
    descriptionHighlight: "некоторые",
    descriptionSuffix: " из моих последних проектов. Я всегда работаю над чем-то новым, так что заходите почаще!",
  },
};

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches,
  );

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

const Projects = ({ lang = "en" }: Props) => {
  const projects = getProjects(lang);
  const t = translations[lang] || translations.en;
  const isDesktop = useIsDesktop();

  // Desktop: expanded modal card. Mobile: inline accordion.
  const [active, setActive] = useState<Project | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setActive(null);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      active && typeof active === "object" ? "hidden" : "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, onKeyDown]);

  // Close desktop modal if viewport shrinks to mobile
  useEffect(() => {
    if (!isDesktop) setActive(null);
  }, [isDesktop]);

  useOutsideClick(ref, () => setActive(null));

  const onCardSelect = (card: Project) => {
    if (isDesktop) {
      setActive(card);
    } else {
      setExpanded((current) => (current === card.title ? null : card.title));
    }
  };

  return (
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

      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-50"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              onClick={() => setActive(null)}
              aria-label="Close project detail"
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white dark:bg-slate-800 rounded-full h-6 w-6 text-slate-600 dark:text-slate-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>
            <motion.div
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-slate-50 dark:bg-slate-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  loading="eager"
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>
              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-slate-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-slate-600 dark:text-slate-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-slate-900"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-slate-500 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-slate-300 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    <p>{active.content}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ul className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {projects.map((card) => {
          const isOpen = !isDesktop && expanded === card.title;
          return (
            <motion.li
              whileHover={{ y: -5 }}
              layoutId={`card-${card.title}-${id}`}
              key={card.title}
              role="button"
              tabIndex={0}
              aria-expanded={isDesktop ? undefined : isOpen}
              onClick={() => onCardSelect(card)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onCardSelect(card);
                }
              }}
              className="flex flex-col shadow-xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 rounded-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              <div className="flex gap-4 flex-col w-full">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <img
                    loading="lazy"
                    width={200}
                    height={200}
                    src={card.src}
                    alt={card.title}
                    className="h-60 w-full rounded-t-xl object-cover object-top"
                  />
                </motion.div>
                <div className="flex justify-between items-start gap-3 w-full p-4">
                  <div className="flex justify-center items-start flex-col">
                    <motion.h3
                      layoutId={`title-${card.title}-${id}`}
                      className="font-medium text-slate-800 dark:text-slate-200 text-left text-base"
                    >
                      {card.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${card.description}-${id}`}
                      className="text-slate-500 dark:text-slate-400 text-left text-base"
                    >
                      {card.description}
                    </motion.p>
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
                      <a
                        href={card.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="self-start px-4 py-2 text-sm rounded-full font-bold bg-green-500 hover:bg-green-400 text-slate-900 transition-colors"
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
  );
};

export default Projects;
