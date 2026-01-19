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

interface Props {
  lang?: Language;
}

const Projects = ({ lang = "en" }: Props) => {
  const projects = getProjects(lang);
  const t = translations[lang] || translations.en;

  const [active, setActive] = useState<Project | null>(null);
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

  useOutsideClick(ref, () => setActive(null));

  return (
    <section className="relative max-w-5xl mx-auto py-8 px-4 lg:px-0" id="projects">
      <div className="flex flex-col">
        <h2
          className="flex flex-row mb-5 font-bold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl
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
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
            ></motion.button>
            <motion.div
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-slate-50 dark:bg-slate-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  loading="lazy"
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
        {projects.map((card) => (
          <motion.li
            whileHover={{ y: -5 }}
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="flex flex-col shadow-xl hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
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
              <div className="flex justify-center items-start flex-col p-4">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-slate-800 dark:text-slate-200 text-center md:text-left text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-slate-500 dark:text-slate-400 text-center md:text-left text-base"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
