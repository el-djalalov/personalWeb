import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { projects } from "./data";

type Project = (typeof projects)[number];

const ProjectContent = ({ content }: { content: () => React.ReactNode }) => {
  return typeof content === "function" ? content() : content;
};

const Projects = () => {
  const [active, setActive] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (active && dialog && !dialog.open) dialog.showModal();
  }, [active]);

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
      if (!isDialogContent) dialog.close();
    };

    dialog.addEventListener("click", onClick);
    return () => dialog.removeEventListener("click", onClick);
  }, []);

  return (
    <section className="relative max-w-5xl mx-auto" id="projects">
      <div className="flex flex-col">
        <h1
          className="flex flex-row mb-5 font-bold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                    bg-gradient-to-r from-cyan-900 via-fuchsia-800 to-blue-700 bg-clip-text text-transparent transition-all duration-300 ease-in-out"
        >
          My Projects
        </h1>
        <p className="mb-6 text-base dark:text-muted-foreground">
          Here are <u>some</u> of my recent projects. I'm always working on
          something new, so check back often!
        </p>
      </div>

      <dialog
        ref={dialogRef}
        // closedby="any": close on backdrop click as well as Esc
        {...({ closedby: "any" } as object)}
        aria-labelledby={titleId}
        onClose={() => setActive(null)}
        className="project-dialog w-full max-w-[500px] max-h-full md:max-h-[90%] p-0 bg-slate-50 dark:bg-slate-900 sm:rounded-3xl"
      >
        {active && (
          <div className="flex flex-col">
            <img
              width={200}
              height={200}
              src={active.src}
              alt=""
              className="w-full h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
            />
            <div className="flex justify-between items-start gap-4 p-4">
              <div>
                <h3
                  id={titleId}
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
                <span className="sr-only"> {active.title} (opens in a new tab)</span>
              </a>
            </div>
            <div className="text-slate-500 text-xs md:text-sm lg:text-base px-4 pt-4 pb-6 flex flex-col items-start gap-4 dark:text-slate-300">
              <ProjectContent content={active.content} />
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close project details"
          className="absolute top-3 right-3 flex items-center justify-center bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 rounded-full h-8 w-8 shadow"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </dialog>

      <ul className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {projects.map((card) => (
          <li
            key={card.title}
            className="relative flex flex-col shadow-xl hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 rounded-xl has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-violet-700"
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
              <div className="flex justify-center items-start flex-col p-4">
                <h3 className="font-medium text-slate-800 dark:text-slate-200 text-center md:text-left text-base">
                  {/* The ::after overlay makes the whole card the click target */}
                  <button
                    type="button"
                    onClick={() => setActive(card)}
                    className="text-left outline-none after:absolute after:inset-0 after:rounded-xl after:content-['']"
                  >
                    {card.title}
                  </button>
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-center md:text-left text-base">
                  {card.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
