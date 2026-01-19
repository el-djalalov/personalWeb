import { getExperiences } from "@/i18n/experiences";
import AboutExperience from "./AboutExperience";
import type { Language } from "@/content.config";

const translations = {
  en: "Experience",
  uz: "Tajriba",
  ru: "Опыт",
};

interface Props {
  lang?: Language;
}

export default function ExperienceSection({ lang = "en" }: Props) {
  const experiences = getExperiences(lang);
  const title = translations[lang] || translations.en;

  return (
    <section
      className="relative z-20 max-w-5xl mx-auto py-8 px-4 lg:px-0"
      id="experience"
    >
      <h2 className="flex flex-row mb-5 font-bold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-cyan-900 via-fuchsia-800 to-blue-700 bg-clip-text text-transparent transition-all duration-300 ease-in-out">
        {title}
      </h2>

      <div className="px-6 py-10 card">
        {experiences.map((exp, idx) =>
          idx !== experiences.length - 1 ? (
            <div
              key={exp.company}
              className="pb-10 border-l border-slate-300 dark:border-slate-500"
            >
              <AboutExperience {...exp} />
            </div>
          ) : (
            <AboutExperience key={exp.company} {...exp} />
          ),
        )}
      </div>
    </section>
  );
}
