import { useEffect, useState } from "react";
import { fill, type BriefFact, type DemoCopy } from "@/i18n/cases";
import { DemoFrame, ToolButton, useReducedMotion } from "../ui";

type Role = "staff" | "member" | "investor";
const ROLES: Role[] = ["staff", "member", "investor"];
const THINK_STEP_MS = 260;

interface Props {
  label: string;
  t: DemoCopy["brief"];
}

/** What a role sees of one fact; null means the fact is left out. */
function factFor(fact: BriefFact, role: Role, t: DemoCopy["brief"]) {
  if (fact.deal && role === "member") {
    return (
      <>
        {t.dealHidden} <span className="redacted">{t.hidden}</span>
      </>
    );
  }
  if (fact.deal && role === "investor") return fact.investor ?? null;
  return fact.text;
}

export default function BriefDemo({ label, t }: Props) {
  const reduce = useReducedMotion();
  const [briefIndex, setBriefIndex] = useState(0);
  const [role, setRole] = useState<Role>("staff");
  const [thinking, setThinking] = useState<string[] | null>(null);
  const [highlight, setHighlight] = useState<number | null>(null);
  const [run, setRun] = useState(0);

  const brief = t.briefs[briefIndex];

  // The assistant "reads" for a moment, then writes the document
  useEffect(() => {
    if (run === 0 || reduce) {
      setThinking(null);
      return;
    }
    const steps = t.thinking.map(s => fill(s, { role: t.roles[role] }));
    setThinking([]);
    const timers = steps.map((step, i) =>
      window.setTimeout(() => setThinking(prev => [...(prev ?? []), step]), i * THINK_STEP_MS),
    );
    timers.push(window.setTimeout(() => setThinking(null), steps.length * THINK_STEP_MS + 200));
    return () => timers.forEach(id => window.clearTimeout(id));
  }, [run, role, reduce, t]);

  const choose = (next: { brief?: number; role?: Role }) => {
    if (next.brief !== undefined) setBriefIndex(next.brief);
    if (next.role) setRole(next.role);
    setHighlight(null);
    setRun(r => r + 1);
  };

  const facts = brief.facts
    .map(fact => ({ fact, shown: factFor(fact, role, t) }))
    .filter(({ shown }) => shown !== null);
  const showSources = role !== "investor";

  return (
    <DemoFrame
      label={label}
      tools={ROLES.map(r => (
        <ToolButton key={r} on={role === r} onClick={() => choose({ role: r })}>
          {t.roles[r]}
        </ToolButton>
      ))}
      footer={
        <>
          <span>{t.example}</span>
          {showSources && <span>{t.hover}</span>}
        </>
      }
    >
      <div className="grid gap-3.5 p-4">
        <div className="flex flex-wrap gap-2">
          {t.briefs.map((b, i) => (
            <button
              key={b.id}
              type="button"
              onClick={() => choose({ brief: i })}
              aria-pressed={i === briefIndex}
              className={`rounded-full border bg-surf2 px-3.5 py-2 text-[13.5px] font-medium transition duration-200 hover:-translate-y-px ${
                i === briefIndex ? "border-acc text-acc" : "border-border hover:border-acc"
              }`}
            >
              {b.button}
            </button>
          ))}
        </div>

        <div className="relative min-h-[260px]" aria-live="polite" aria-busy={thinking !== null}>
          {thinking !== null && (
            <ul className="absolute inset-x-0 top-0 flex flex-col gap-1 font-mono text-xs text-muted-foreground">
              {thinking.map(step => (
                <li key={step} className="row-in">
                  <span className="text-acc">✓</span> {step}
                </li>
              ))}
            </ul>
          )}
          <article
            key={`${brief.id}-${role}-${run}`}
            className={`flex flex-col gap-3 rounded-xl border border-border p-4 text-sm transition-opacity duration-300 ${
              thinking !== null ? "opacity-0" : "opacity-100"
            }`}
          >
            <h4 className="text-base font-bold">{brief.title}</h4>
            <section className="flex flex-col gap-1">
              <h5 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t.facts}</h5>
              <ul className="flex list-disc flex-col gap-1 pl-4">
                {facts.map(({ fact, shown }, i) => (
                  <li key={fact.text} className="row-in" style={{ animationDelay: `${i * 70}ms` }}>
                    {shown}
                    {showSources && !(fact.deal && role === "member") && (
                      <sup
                        className="cursor-help px-0.5 font-mono text-[10px] text-acc"
                        onPointerEnter={() => setHighlight(fact.source)}
                        onPointerLeave={() => setHighlight(null)}
                        onFocus={() => setHighlight(fact.source)}
                        onBlur={() => setHighlight(null)}
                        tabIndex={0}
                      >
                        [{fact.source}]
                      </sup>
                    )}
                  </li>
                ))}
              </ul>
            </section>
            <section className="flex flex-col gap-1">
              <h5 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t.questions}</h5>
              <ul className="flex list-disc flex-col gap-1 pl-4">
                {brief.questions.map(question => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </section>
            <section className="flex flex-col gap-1">
              <h5 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t.sources}</h5>
              <ul className="flex list-disc flex-col gap-1 pl-4">
                {showSources ? (
                  brief.sources.map((source, i) => (
                    <li key={source} className={`transition-colors ${highlight === i + 1 ? "text-acc" : ""}`}>
                      [{i + 1}] {source}
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="redacted">{t.noSources}</span>
                  </li>
                )}
              </ul>
            </section>
          </article>
        </div>
      </div>
    </DemoFrame>
  );
}
