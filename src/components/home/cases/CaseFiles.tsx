import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CASE_IDS, isCaseId, type CaseFile, type CaseId, type CasesCopy, type DemoCopy, type Result } from "@/i18n/cases";
import MapDemo from "./demos/MapDemo";
import { useReducedMotion } from "./ui";

// The map demo ships with the island (first tab). The others load on demand,
// and start loading early when their tab is hovered or focused.
const loaders = {
  topqir: () => import("./demos/QuizDemo"),
  tallinja: () => import("./demos/BusDemo"),
  anzel: () => import("./demos/BriefDemo"),
  planner: () => import("./demos/PlannerDemo"),
  cimp: () => import("./demos/ModulesDemo"),
} as const;

const QuizDemo = lazy(loaders.topqir);
const BusDemo = lazy(loaders.tallinja);
const BriefDemo = lazy(loaders.anzel);
const PlannerDemo = lazy(loaders.planner);
const ModulesDemo = lazy(loaders.cimp);

const preload = (id: CaseId) => {
  if (id === "agro") return;
  loaders[id]().catch((error: unknown) => console.error(`[case-files] could not load the ${id} demo`, error));
};

function Demo({ id, label, demo }: { id: Exclude<CaseId, "agro">; label: string; demo: DemoCopy }) {
  switch (id) {
    case "topqir":
      return <QuizDemo label={label} t={demo.quiz} />;
    case "tallinja":
      return <BusDemo label={label} t={demo.bus} />;
    case "anzel":
      return <BriefDemo label={label} t={demo.brief} />;
    case "planner":
      return <PlannerDemo label={label} t={demo.planner} />;
    case "cimp":
      return <ModulesDemo label={label} t={demo.modules} />;
  }
}

function CountUp({ result, animate }: { result: Result; animate: boolean }) {
  const [shown, setShown] = useState(result.value);
  useEffect(() => {
    if (!animate || result.count === undefined) {
      setShown(result.value);
      return;
    }
    const target = result.count;
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / 1100);
      const eased = 1 - Math.pow(1 - progress, 3);
      setShown(`${Math.round(target * eased)}${result.suffix ?? ""}`);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [result, animate]);
  return <>{shown}</>;
}

function CasePanel({ item, copy, animate }: { item: CaseFile; copy: CasesCopy; animate: boolean }) {
  return (
    // A div: the tabpanel role is not allowed on <article>
    <div
      id={`case-${item.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${item.id}`}
      className={`flex min-w-0 flex-col gap-4 ${animate ? "case-enter" : ""}`}
    >
      <header className="flex flex-wrap items-end justify-between gap-x-5 gap-y-3">
        <div>
          <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight tracking-tight">{item.title}</h3>
          <p className="mt-1.5 max-w-[52ch] text-[15px] text-muted-foreground">{item.line}</p>
        </div>
        <a
          href={item.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap rounded-full border border-border px-3 py-1.5 font-mono text-xs text-acc transition-colors hover:border-acc"
        >
          {item.link.label}
        </a>
      </header>

      {item.id === "agro" ? (
        // Server-rendered and hydrated directly: a Suspense boundary here would
        // be updated before it finishes hydrating and fall back to client render
        <MapDemo label={item.demoLabel} t={copy.demo.map} />
      ) : (
        <Suspense
          fallback={
            <div className="grid h-[420px] place-items-center rounded-[14px] border border-border bg-card font-mono text-xs text-muted-foreground">
              {copy.demo.loading}
            </div>
          }
        >
          <Demo id={item.id as Exclude<CaseId, "agro">} label={item.demoLabel} demo={copy.demo} />
        </Suspense>
      )}

      <dl aria-label={copy.results} className="grid grid-cols-2 gap-x-6 gap-y-4 px-1 pt-1 sm:grid-cols-4">
        {item.results.map(result => (
          <div key={result.label} className="flex min-w-0 flex-col-reverse gap-0.5">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{result.label}</dt>
            <dd className="font-display text-2xl font-bold tabular-nums leading-tight tracking-tight">
              <CountUp result={result} animate={animate} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

interface Props {
  copy: CasesCopy;
}

export default function CaseFiles({ copy }: Props) {
  const [active, setActive] = useState<CaseId>("agro");
  const [touched, setTouched] = useState(false);
  const [indicator, setIndicator] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<CaseId, HTMLButtonElement | null>>>({});
  const reduce = useReducedMotion();

  const select = (id: CaseId, focus = false) => {
    setActive(id);
    setTouched(true);
    if (focus) tabRefs.current[id]?.focus();
  };

  // Links such as #work-tallinja (from the Ctrl K menu) open that case
  useEffect(() => {
    const fromHash = () => {
      const match = /^#work-([\w-]+)$/.exec(window.location.hash);
      if (match && isCaseId(match[1])) select(match[1]);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  // Slide the highlight behind the active tab
  useLayoutEffect(() => {
    const measure = () => {
      const tab = tabRefs.current[active];
      if (tab) setIndicator({ x: tab.offsetLeft, y: tab.offsetTop, w: tab.offsetWidth, h: tab.offsetHeight });
    };
    measure();
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next: number | null = null;
    if (event.key in keys) next = (index + keys[event.key] + CASE_IDS.length) % CASE_IDS.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = CASE_IDS.length - 1;
    if (next === null) return;
    event.preventDefault();
    select(CASE_IDS[next], true);
  };

  const item = copy.items.find(c => c.id === active) ?? copy.items[0];

  return (
    <div className="grid gap-5 lg:grid-cols-[230px_1fr] lg:items-start">
      <div
        ref={listRef}
        role="tablist"
        aria-label={copy.tabsLabel}
        className="sticky top-17 z-20 flex gap-0.5 overflow-x-auto rounded-[14px] border border-log-line bg-log-bg p-2 text-sm text-log-text shadow-lg scrollbar-none lg:top-24 lg:flex-col lg:shadow-none"
      >
        {indicator && (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 top-0 rounded-[7px] bg-log-acc/15 ${
              reduce ? "" : "transition-[transform,width,height] duration-500 ease-site"
            }`}
            style={{ transform: `translate(${indicator.x}px, ${indicator.y}px)`, width: indicator.w, height: indicator.h }}
          />
        )}
        {copy.items.map((c, index) => (
          <button
            key={c.id}
            ref={el => {
              tabRefs.current[c.id] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${c.id}`}
            aria-selected={c.id === active}
            // Only the open case's panel is on the page
            aria-controls={c.id === active ? `case-${c.id}` : undefined}
            tabIndex={c.id === active ? 0 : -1}
            onClick={() => select(c.id)}
            onKeyDown={e => onKeyDown(e, index)}
            onPointerEnter={() => preload(c.id)}
            onFocus={() => preload(c.id)}
            className={`relative shrink-0 whitespace-nowrap rounded-[7px] px-3 py-2 text-left transition-colors focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-log-acc ${
              c.id === active ? "font-medium text-log-text" : "text-log-mute hover:text-log-text"
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      <CasePanel key={active} item={item} copy={copy} animate={touched && !reduce} />
    </div>
  );
}
