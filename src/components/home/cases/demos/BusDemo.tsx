import { useEffect, useRef, useState } from "react";
import { fill, type DemoCopy } from "@/i18n/cases";
import {
  acknowledge,
  emptyAlarms,
  nextAlarm,
  raiseAlarm,
  type AlarmState,
  type Controller,
} from "@/lib/demos/alarms";
import { DemoFrame, ToolButton, useInView, useReducedMotion } from "../ui";

const ROUTES = [
  "M10,160 C90,150 120,60 200,70 S330,40 390,30",
  "M20,30 C110,40 150,120 230,130 S340,170 390,175",
  "M30,100 C120,95 220,100 260,60 S350,90 395,100",
];
const BUSES = [117, 42, 13, 88, 205, 61];
const SHIFTS = ["06:00–14:00", "14:00–22:00", "06:00–14:00", "22:00–06:00", "14:00–22:00", "06:00–14:00"];
const NEXT_ALARM_MS = 1300;

interface Props {
  label: string;
  t: DemoCopy["bus"];
}

export default function BusDemo({ label, t }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const busRefs = useRef<(SVGGElement | null)[]>([]);
  const inView = useInView(rootRef);
  const reduce = useReducedMotion();
  const [alarms, setAlarms] = useState<AlarmState>(emptyAlarms);
  const [info, setInfo] = useState<number | null>(null);
  const counter = useRef(0);
  // Kept across effect runs, so buses do not jump back when the demo scrolls out and in
  const progress = useRef(BUSES.map((_, i) => (i * 0.17) % 1));

  // Move the buses along their routes while the demo is on screen
  useEffect(() => {
    const position = progress.current;
    const speed = BUSES.map((_, i) => 0.0007 + (i % 3) * 0.00025);
    const place = () => {
      BUSES.forEach((_, i) => {
        const path = pathRefs.current[i % ROUTES.length];
        const bus = busRefs.current[i];
        if (!path || !bus) return;
        const point = path.getPointAtLength(position[i] * path.getTotalLength());
        bus.setAttribute("transform", `translate(${point.x.toFixed(1)},${point.y.toFixed(1)})`);
      });
    };
    place();
    if (reduce || !inView) return;
    let frame = 0;
    const loop = () => {
      position.forEach((p, i) => (position[i] = (p + speed[i]) % 1));
      place();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce]);

  const raise = () => {
    const n = counter.current++;
    setAlarms(state =>
      raiseAlarm(state, { id: n, kind: n % 3 === 2 ? "tech" : "fire", bus: BUSES[(n * 2 + 1) % BUSES.length] }),
    );
  };

  // First alarm shortly after the demo opens
  useEffect(() => {
    const id = window.setTimeout(raise, 900);
    return () => window.clearTimeout(id);
  }, []);

  // After a hand-off, show the next queued alarm
  useEffect(() => {
    if (alarms.active || alarms.queue.length === 0) return;
    const id = window.setTimeout(() => setAlarms(nextAlarm), NEXT_ALARM_MS);
    return () => window.clearTimeout(id);
  }, [alarms]);

  useEffect(() => {
    if (info === null) return;
    const id = window.setTimeout(() => setInfo(null), 3500);
    return () => window.clearTimeout(id);
  }, [info]);

  const handle = (by: Controller) => setAlarms(state => acknowledge(state, by));

  const panel = (who: Controller) => {
    const { active, lastHandled } = alarms;
    const header = (
      <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>
          {t.controller} {who}
        </span>
        <span>{active ? t.alarm : t.online}</span>
      </div>
    );
    if (active) {
      return (
        <>
          {header}
          <div className="alarm-card flex flex-col gap-2 rounded-[9px] border border-crit bg-crit/10 p-2.5">
            <strong className="text-sm text-crit">
              {active.kind === "fire" ? t.fire : t.tech} · {t.bus} {active.bus}
            </strong>
            <button
              type="button"
              onClick={() => handle(who)}
              className="self-start rounded-md bg-crit px-3 py-1.5 text-[13px] font-semibold text-white"
            >
              {t.acknowledge}
            </button>
          </div>
        </>
      );
    }
    if (lastHandled) {
      const text =
        lastHandled.by === who
          ? fill(t.handledByYou, { bus: lastHandled.alarm.bus })
          : fill(t.handledBy, { who: lastHandled.by });
      return (
        <>
          {header}
          <p className="font-mono text-[13px] text-good">{text}</p>
        </>
      );
    }
    return (
      <>
        {header}
        <p className="text-[13px] text-muted-foreground">{t.idle}</p>
      </>
    );
  };

  const shown = info === null ? null : BUSES.indexOf(info);

  return (
    <DemoFrame
      label={label}
      tools={
        <>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {t.queue} {alarms.queue.length}
          </span>
          <ToolButton onClick={raise}>{t.raise}</ToolButton>
        </>
      }
    >
      <div ref={rootRef} className="relative">
        <svg viewBox="0 0 400 200" className="block h-[220px] w-full" role="img" aria-label={t.aria}>
          {ROUTES.map(d => (
            <path key={`base-${d}`} d={d} fill="none" className="stroke-border" strokeWidth="6" strokeLinecap="round" />
          ))}
          {ROUTES.map((d, i) => (
            <path
              key={d}
              ref={el => {
                pathRefs.current[i] = el;
              }}
              d={d}
              fill="none"
              className="stroke-muted-foreground"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
          ))}
          {BUSES.map((id, i) => {
            const alarmed = alarms.active?.bus === id;
            return (
              <g
                key={id}
                ref={el => {
                  busRefs.current[i] = el;
                }}
                role="button"
                tabIndex={0}
                aria-label={`${t.bus} ${id}`}
                className="cursor-pointer focus:outline-hidden [&:focus-visible_circle.dot]:stroke-foreground"
                onClick={() => setInfo(id)}
                onKeyDown={event => {
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  setInfo(id);
                }}
              >
                <circle r="11" fill="transparent" />
                <circle r="9" fill="none" className="stroke-crit" strokeWidth="2" opacity={alarmed ? 1 : 0} />
                <circle r="5" className={`dot ${alarmed ? "fill-crit" : "fill-acc"}`} strokeWidth="2" />
                <text y="-10" textAnchor="middle" fontSize="8" className="fill-muted-foreground font-mono">
                  {id}
                </text>
              </g>
            );
          })}
        </svg>
        <div
          className={`absolute right-3 top-3 flex w-[210px] flex-col gap-1 rounded-[10px] border border-border bg-card p-3 text-[13px] shadow-lg transition duration-300 ease-site ${
            shown === null ? "pointer-events-none -translate-y-1.5 opacity-0" : "opacity-100"
          }`}
          aria-live="polite"
        >
          {shown !== null && (
            <>
              <b className="font-display text-[15px]">
                {t.bus} {BUSES[shown]}
              </b>
              <span className="font-mono text-[11.5px] text-muted-foreground">{t.routes[shown % ROUTES.length]}</span>
              <span className="font-mono text-[11.5px] text-muted-foreground">
                {t.shift} {SHIFTS[shown]}
              </span>
              <span className="font-mono text-[11.5px] text-muted-foreground">{shown % 4 === 1 ? t.late : t.onTime}</span>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px border-t border-border bg-border">
        {(["A", "B"] as const).map(who => (
          <div key={who} className="flex min-h-[118px] flex-col gap-2 bg-card p-3" aria-live="polite">
            {panel(who)}
          </div>
        ))}
      </div>
    </DemoFrame>
  );
}
