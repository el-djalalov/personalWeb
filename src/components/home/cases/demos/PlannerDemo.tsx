import { useEffect, useRef, useState } from "react";
import type { DemoCopy } from "@/i18n/cases";
import {
  addTickets,
  DAY_HOURS,
  hoursIn,
  isOverbooked,
  matchesQuery,
  moveTicket,
  type Board,
  type Ticket,
} from "@/lib/demos/planner";
import { DemoFrame, ToolButton, showToast, useReducedMotion } from "../ui";

const COLUMNS = ["backlog", "anna", "ben", "chen"] as const;
type Column = (typeof COLUMNS)[number];
const PEOPLE: Record<Exclude<Column, "backlog">, string> = { anna: "Anna", ben: "Ben", chen: "Chen" };

const ticket = (id: string, hours: number): Ticket => ({ id, title: id, hours });
const START: Board = {
  backlog: [ticket("PLAN-142", 3), ticket("PLAN-151", 5), ticket("PLAN-153", 2)],
  anna: [ticket("PLAN-120", 4)],
  ben: [ticket("PLAN-131", 3)],
  chen: [],
};
const FROM_JIRA = [ticket("PLAN-160", 4), ticket("PLAN-161", 3), ticket("PLAN-162", 2)];
const DRAG_THRESHOLD_PX = 5;

interface Props {
  label: string;
  t: DemoCopy["planner"];
}

interface Drag {
  id: string;
  startX: number;
  startY: number;
  moved: boolean;
}

export default function PlannerDemo({ label, t }: Props) {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const [board, setBoard] = useState<Board>(START);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [landed, setLanded] = useState<string | null>(null);
  const [sync, setSync] = useState<"idle" | "busy" | "done">("idle");
  const [over, setOver] = useState<Column | null>(null);
  const [ghost, setGhost] = useState<{ id: string; x: number; y: number } | null>(null);
  const drag = useRef<Drag | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(id => window.clearTimeout(id)), []);

  const titleOf = (id: string) => t.tickets[id] ?? id;
  const find = (id: string) => COLUMNS.flatMap(c => board[c]).find(x => x.id === id);

  const move = (id: string, to: Column) => {
    setBoard(b => moveTicket(b, id, to));
    setSelected(null);
    setLanded(id);
  };

  const runSync = () => {
    if (sync !== "idle") {
      showToast(t.upToDate);
      return;
    }
    setSync("busy");
    FROM_JIRA.forEach((item, i) => {
      timers.current.push(
        window.setTimeout(
          () => {
            setBoard(b => addTickets(b, "backlog", [item]));
            setLanded(item.id);
            if (i === FROM_JIRA.length - 1) setSync("done");
          },
          reduce ? 0 : 350 * (i + 1),
        ),
      );
    });
  };

  const columnAt = (x: number, y: number): Column | null => {
    const el = document.elementFromPoint(x, y)?.closest<HTMLElement>("[data-column]");
    const key = el?.dataset.column;
    return key && (COLUMNS as readonly string[]).includes(key) ? (key as Column) : null;
  };

  const onPointerDown = (event: React.PointerEvent<HTMLElement>, id: string) => {
    drag.current = { id, startX: event.clientX, startY: event.clientY, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d) return;
    if (!d.moved && Math.hypot(event.clientX - d.startX, event.clientY - d.startY) > DRAG_THRESHOLD_PX) {
      drag.current = { ...d, moved: true };
    }
    if (!drag.current?.moved) return;
    const rect = frameRef.current?.getBoundingClientRect();
    if (rect) setGhost({ id: d.id, x: event.clientX - rect.left - 90, y: event.clientY - rect.top - 20 });
    setOver(columnAt(event.clientX, event.clientY));
  };

  const onPointerUp = (event: React.PointerEvent<HTMLElement>) => {
    const d = drag.current;
    drag.current = null;
    setGhost(null);
    setOver(null);
    if (!d) return;
    if (d.moved) {
      const target = columnAt(event.clientX, event.clientY);
      if (target) move(d.id, target);
      return;
    }
    setSelected(s => (s === d.id ? null : d.id));
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>, id: string, from: Column) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    move(id, COLUMNS[(COLUMNS.indexOf(from) + 1) % COLUMNS.length]);
  };

  const renderTicket = (item: Ticket, column: Column) => {
    const match = matchesQuery({ ...item, title: titleOf(item.id) }, query);
    const lifted = ghost?.id === item.id;
    return (
      <div
        key={item.id}
        role="button"
        tabIndex={0}
        aria-pressed={selected === item.id}
        onPointerDown={e => onPointerDown(e, item.id)}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={e => onKeyDown(e, item.id, column)}
        onAnimationEnd={() => setLanded(l => (l === item.id ? null : l))}
        className={`flex cursor-grab touch-none select-none flex-col gap-0.5 rounded-lg border bg-card px-2.5 py-2 text-[12.5px] transition duration-200 hover:border-acc ${
          selected === item.id ? "border-acc ring-2 ring-acc/35" : query && match ? "border-acc" : "border-border"
        } ${!match || lifted ? "opacity-25" : ""} ${landed === item.id ? "ticket-land" : ""}`}
      >
        <b className="font-semibold">{titleOf(item.id)}</b>
        <span className="flex justify-between font-mono text-[10.5px] text-muted-foreground">
          <span>{item.id}</span>
          <span>{item.hours}h</span>
        </span>
      </div>
    );
  };

  const dragged = ghost ? find(ghost.id) : undefined;

  return (
    <DemoFrame
      label={label}
      tools={<ToolButton onClick={runSync}>{sync === "busy" ? t.syncing : sync === "done" ? t.synced : t.sync}</ToolButton>}
      footer={
        <>
          <span>{t.example}</span>
          <span>{t.tip}</span>
        </>
      }
    >
      <div ref={frameRef} className="relative grid gap-3 p-3.5">
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t.search}
          aria-label={t.search}
          className="min-w-[150px] rounded-lg border border-border bg-surf2 px-2.5 py-1.5 font-mono text-[12.5px] outline-none focus:border-acc"
        />
        <div className="grid grid-cols-2 gap-2 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          {COLUMNS.map(column => {
            const hours = hoursIn(board, column);
            const canDrop = selected !== null && !board[column].some(x => x.id === selected);
            return (
              <div
                key={column}
                data-column={column}
                onClick={event => {
                  if (canDrop && !(event.target as Element).closest('[role="button"]')) move(selected!, column);
                }}
                className={`flex min-h-[170px] flex-col gap-1.5 rounded-[10px] border bg-surf2 p-2 transition-colors ${
                  over === column ? "border-acc bg-acc/10" : canDrop ? "border-acc" : "border-border"
                }`}
              >
                <p className="flex justify-between font-mono text-xs text-muted-foreground">
                  <span>{column === "backlog" ? t.backlog : PEOPLE[column]}</span>
                  <span className="tabular-nums">{column === "backlog" ? board.backlog.length : `${hours} / ${DAY_HOURS}h`}</span>
                </p>
                {column !== "backlog" && (
                  <div className="h-1 overflow-hidden rounded-sm bg-border">
                    <i
                      className={`block h-full transition-[width] duration-500 ease-site ${isOverbooked(hours) ? "bg-warn" : "bg-acc"}`}
                      style={{ width: `${Math.min(100, (hours / DAY_HOURS) * 100)}%` }}
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-1.5">{board[column].map(item => renderTicket(item, column))}</div>
              </div>
            );
          })}
        </div>
        {ghost && dragged && (
          <div
            className="pointer-events-none absolute z-10 w-[180px] -rotate-3 rounded-lg border border-acc bg-card px-2.5 py-2 text-[12.5px] shadow-2xl"
            style={{ left: ghost.x, top: ghost.y }}
            aria-hidden="true"
          >
            <b className="font-semibold">{titleOf(dragged.id)}</b>
          </div>
        )}
      </div>
    </DemoFrame>
  );
}
