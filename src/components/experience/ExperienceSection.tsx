import experiences from "@/collections/experiences.json";
import AboutExperience from "./AboutExperience";

export default function ExperienceSection() {
  return (
    <section
      className="relative z-20 max-w-5xl mx-auto my-12 px-4 lg:px-0"
      id="experience"
    >
      <h2 className="flex flex-row mb-5 font-bold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-cyan-900 via-fuchsia-800 to-blue-700 bg-clip-text text-transparent transition-all duration-300 ease-in-out">
        Experience
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
