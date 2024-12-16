import { Data } from "./data";
import FooterIcon from "./FooterIcon.tsx";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10 dark:bg-background border-slate-200 dark:border-slate-800">
      <div className="container flex items-center py-8 mx-auto px-4 md:px-7 w-full md:max-w-7xl justify-between">
        <div className="flex gap-4 justify-center items-center">
          <a
            href="/"
            className="h-5 text-base group relative z-30 flex items-center space-x-1.5 text-black dark:text-white font-semibold"
          >
            <span className="text-xl -translate-y-0.5 group-hover:-rotate-12 group-hover:scale-[1.2] ease-in-out duration-300 text-muted-foreground">
              ✦
            </span>

            <span className="-translate-y-0.5 dark:text-slate-400 text-slate-700">
              ED
            </span>
          </a>

          <p className="text-sm  text-slate-700 dark:text-slate-400 dark:text-muted-foreground sm:ml-4 sm:pl-4 sm:border-l sm:border-slate-300 dark:sm:border-slate-700 sm:mt-0">
            © {new Date().getFullYear()} Elyor Djalalov
          </p>
        </div>

        <div className="flex gap-4">
          {Data.map((icon, index) => {
            return (
              <FooterIcon
                key={index}
                title={icon.title}
                link={icon.link}
                svg={icon.svg}
              />
            );
          })}
        </div>
      </div>
    </footer>
  );
}
