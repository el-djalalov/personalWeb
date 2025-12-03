import InteractiveLink from "./InteractiveLink";

interface Props {
  logo: string;
  dates: string;
  role: string;
  company: string;
  description: string;
  website?: string | null;
}

export default function AboutExperience({
  logo,
  dates,
  role,
  company,
  description,
  website,
}: Props) {
  return (
    <div className="relative flex flex-col justify-start pl-12 bg-background">
      <div className="absolute pointer-events-none top-0 left-0 z-10 bg-white flex items-center justify-center -translate-x-1/2 border rounded-full dark:bg-background w-14 h-14 border-slate-400 dark:border-slate-500">
        <img
          src={logo}
          width={26}
          height={26}
          alt={company}
          loading="lazy"
          className="text-white"
        />
      </div>

      <span className="text-xs uppercase dark:text-muted-foreground trackign-widest text-slate-700 dark:text-slate-400">
        {dates}
      </span>

      <h3 className="my-1 text-lg font-bold text-slate-700 dark:text-slate-200">
        {role}
      </h3>

      {website ? (
        <InteractiveLink website={website} company={company} />
      ) : (
        <span className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
          {company}
        </span>
      )}

      <p className="text-sm font-light text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
