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
    <article
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

      <div className="grid gap-4 lg:grid-cols-2">
        <dl
          aria-label={copy.results}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-border bg-border"
        >
          {item.results.map(result => (
            <div key={result.label} className="flex min-w-0 flex-col-reverse justify-center gap-0.5 bg-card px-4 py-3.5">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{result.label}</dt>
              <dd className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-bold tabular-nums leading-tight tracking-tight">
                <CountUp result={result} animate={animate} />
              </dd>
            </div>
          ))}
        </dl>
        <div className="rounded-[14px] border border-log-line bg-log-bg px-[18px] py-4 font-mono text-[12.5px] text-log-text">
          <p className="mb-2.5 text-log-mute">$ {copy.built.toLowerCase()} · {item.id}</p>
          <ol className="flex flex-col gap-1.5">
            {item.build.map((row, i) => (
              <li
                key={row.name}
                className={`grid grid-cols-[6rem_1fr_auto] gap-3 ${animate ? "row-in" : ""}`}
                style={animate ? { animationDelay: `${150 + i * 120}ms` } : undefined}
              >
                <span className="text-log-acc">{row.name}</span>
                <span>{row.detail}</span>
                <span className="text-log-acc">pass</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
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
        className="relative flex gap-0.5 overflow-x-auto rounded-[14px] border border-log-line bg-log-bg p-2 font-mono text-[13px] text-log-text [scrollbar-width:none] lg:sticky lg:top-24 lg:flex-col lg:p-3"
      >
        <span className="hidden px-2 pb-2.5 pt-1 text-xs text-log-mute lg:block">$ ls ./work</span>
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
            aria-controls={`case-${c.id}`}
            tabIndex={c.id === active ? 0 : -1}
            onClick={() => select(c.id)}
            onKeyDown={e => onKeyDown(e, index)}
            onPointerEnter={() => preload(c.id)}
            onFocus={() => preload(c.id)}
            className={`relative grid shrink-0 grid-cols-[auto] gap-2.5 whitespace-nowrap rounded-[7px] px-2.5 py-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-log-acc lg:grid-cols-[1fr_auto] ${
              c.id === active ? "text-log-text" : "text-log-mute hover:text-log-text"
            }`}
          >
            <span>{c.title.toLowerCase()}</span>
            <span className="hidden text-[11px] text-log-acc lg:inline">{c.tag}</span>
          </button>
        ))}
      </div>

      <CasePanel key={active} item={item} copy={copy} animate={touched && !reduce} />
    </div>
  );
}
