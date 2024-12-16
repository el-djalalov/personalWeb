import projects from "@/collections/projects.json";
import { Project } from "./project";

export default function Projects() {
  return (
    <section className="relative max-w-5xl mx-auto">
      <div className="flex flex-col">
        <h1
          className="flex flex-row mb-5 text-6xl font-bold leading-tight md:text-5xl lg:text-[50px]
bg-gradient-to-r from-cyan-900 via-fuchsia-800 to-blue-700 bg-clip-text text-transparent transition-all duration-300 ease-in-out"
        >
          My Projects
        </h1>
        <p className="mb-6 text-base dark:text-muted-foreground">
          Here are <u>some</u> of my recent projects. I'm always working on
          something new, so check back often!
        </p>
      </div>

      <div
        className="card relative grid items-stretch w-full sm:grid-cols-2 md:grid-cols-3 gap-7 mt-7"
        id="projects"
      >
        {projects.map((project) => {
          return (
            <Project
              key={project.url}
              name={project.name}
              description={project.description}
              image={project.image}
              url={project.url}
            />
          );
        })}
      </div>
    </section>
  );
}
