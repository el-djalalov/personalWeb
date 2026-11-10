import { useEffect, useRef, useState } from "react";
import type { DemoCopy } from "@/i18n/cases";
import { addPoints, answerPoints, pickWeighted, rankPlayers, type Player } from "@/lib/demos/quiz";
import { DemoFrame, useInView, useReducedMotion } from "../ui";

const SECONDS = 8;
const TICK_MS = 100;
const PLAYERS_MAX = 30;
const OPTION_COLORS = ["#8C9CFF", "#5BD69A", "#F5B84A", "#FF7A85"];
// Chance that each other player answers right in a round
const BOT_SKILL = [0.8, 0.7, 0.6, 0.5];

type Phase = "idle" | "ask" | "reveal";

interface Props {
  label: string;
  t: DemoCopy["quiz"];
}

const startingPlayers = (you: string): Player[] => [
  { name: "Aziza", points: 0 },
  { name: "Bekzod", points: 0 },
  { name: you, points: 0, me: true },
  { name: "Madina", points: 0 },
  { name: "Javohir", points: 0 },
];

export default function QuizDemo({ label, t }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef);
  const reduce = useReducedMotion();

  const [question, setQuestion] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [timeLeft, setTimeLeft] = useState(SECONDS);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [joined, setJoined] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [pickTime, setPickTime] = useState(0);
  const [players, setPlayers] = useState<Player[]>(() => startingPlayers(t.you));
  const [lastGain, setLastGain] = useState<number | null>(null);
  const pointsTimer = useRef(0);

  const q = t.questions[question];
  const last = question === t.questions.length - 1;

  const start = () => {
    setPhase("ask");
    setTimeLeft(SECONDS);
    setCounts([0, 0, 0, 0]);
    setJoined(0);
    setPick(null);
    setLastGain(null);
  };

  // Start the first round when the demo comes into view
  useEffect(() => {
    if (inView && phase === "idle") start();
  }, [inView, phase]);

  // The round clock: other players join and answer while time runs down
  useEffect(() => {
    if (phase !== "ask" || !inView) return;
    const id = window.setInterval(() => {
      setTimeLeft(s => Math.max(0, s - TICK_MS / 1000));
      setJoined(n => Math.min(PLAYERS_MAX, n + 2));
      setCounts(prev => {
        const total = prev.reduce((s, v) => s + v, 0);
        if (total >= PLAYERS_MAX - 1 || Math.random() > 0.45) return prev;
        const weights = [0, 1, 2, 3].map(i => (i === q.correct ? 0.55 : 0.15));
        const choice = pickWeighted(weights, Math.random());
        return prev.map((c, i) => (i === choice ? c + 1 : c));
      });
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [phase, inView, q.correct]);

  // End the round when time is up, or shortly after you answer
  useEffect(() => {
    if (phase !== "ask") return;
    const answeredAWhileAgo = pick !== null && pickTime - timeLeft > 1.2;
    if (timeLeft > 0 && !answeredAWhileAgo) return;
    const mine = answerPoints(pick === q.correct, pickTime, SECONDS);
    const gains = players.map((p, i) => {
      if (p.me) return mine;
      const skill = BOT_SKILL[Math.min(i, BOT_SKILL.length - 1)];
      return Math.random() < skill ? 400 + Math.round(Math.random() * 500) : 0;
    });
    setLastGain(mine);
    setPhase("reveal");
    // Not cleared by this effect: the phase change re-runs it right away
    window.clearTimeout(pointsTimer.current);
    pointsTimer.current = window.setTimeout(() => setPlayers(prev => addPoints(prev, gains)), 500);
  }, [phase, timeLeft, pick, pickTime, q.correct, players]);

  useEffect(() => () => window.clearTimeout(pointsTimer.current), []);

  const answer = (index: number) => {
    if (phase !== "ask" || pick !== null) return;
    setPick(index);
    setPickTime(timeLeft);
    setCounts(prev => prev.map((c, i) => (i === index ? c + 1 : c)));
  };

  const next = () => {
    if (last) setPlayers(prev => prev.map(p => ({ ...p, points: 0 })));
    setQuestion(i => (i + 1) % t.questions.length);
    start();
  };

  const max = Math.max(1, ...counts);
  const ranked = rankPlayers(players);
  const reveal = phase === "reveal";

  let message = t.pick;
  if (phase === "ask" && pick !== null) message = t.locked;
  if (reveal) message = pick === null ? t.slow : lastGain ? `${t.correct} · +${lastGain}` : t.wrong;

  return (
    <DemoFrame label={label} tools={<span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{t.simulation}</span>}>
      <div ref={rootRef} className="grid gap-4 p-4 xl:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
            <span>
              {t.question} <b className="font-normal tabular-nums text-foreground">{question + 1}</b> / {t.questions.length}
            </span>
            <span>
              {t.players} <b className="font-normal tabular-nums text-foreground">{joined}</b>
            </span>
            <span className="relative grid h-[34px] w-[34px] place-items-center" aria-hidden="true">
              <svg viewBox="0 0 34 34" className="absolute inset-0 -rotate-90">
                <circle cx="17" cy="17" r="14" fill="none" strokeWidth="3" className="stroke-border" />
                <circle
                  cx="17"
                  cy="17"
                  r="14"
                  fill="none"
                  strokeWidth="3"
                  className="stroke-acc"
                  strokeDasharray="88"
                  strokeDashoffset={88 * (1 - timeLeft / SECONDS)}
                />
              </svg>
              <b className="text-xs font-normal tabular-nums text-foreground">{Math.ceil(timeLeft)}</b>
            </span>
          </div>
          <p className="my-3 font-display text-xl font-bold">{q.q}</p>
          <div className="grid grid-cols-2 gap-2">
            {q.answers.map((text, i) => {
              const right = reveal && i === q.correct;
              const dim = reveal && i !== q.correct;
              return (
                <button
                  key={text}
                  type="button"
                  disabled={phase !== "ask" || pick !== null}
                  onClick={() => answer(i)}
                  className={`relative flex items-center gap-2.5 overflow-hidden rounded-[10px] border bg-surf2 px-3 py-3.5 text-left text-[15px] font-semibold transition duration-200 enabled:hover:-translate-y-0.5 ${
                    right ? "border-good" : pick === i ? "border-foreground" : "border-border"
                  } ${dim ? "opacity-40" : ""}`}
                  style={{ ["--c" as string]: OPTION_COLORS[i] }}
                >
                  <span
                    className="absolute inset-y-0 left-0 bg-[var(--c)] transition-[width] duration-500 ease-site"
                    style={{ width: `${(counts[i] / max) * 100}%`, opacity: right ? 0.3 : 0.16 }}
                    aria-hidden="true"
                  />
                  <span className="relative grid h-[22px] w-[22px] flex-none place-items-center rounded-md bg-[var(--c)] font-mono text-[11px] text-[#0B0D12]">
                    {"ABCD"[i]}
                  </span>
                  <span className="relative">{text}</span>
                  <span className="relative ml-auto font-mono text-xs font-normal tabular-nums text-muted-foreground">
                    {counts[i]}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex min-h-[30px] items-center justify-between gap-2.5 font-mono text-[12.5px] text-muted-foreground" aria-live="polite">
            <span className={reveal && lastGain ? "text-good" : reveal ? "text-foreground" : ""}>{message}</span>
            {reveal && (
              <button type="button" onClick={next} className="rounded-[7px] border border-border px-2.5 py-1 text-[11px] hover:border-acc">
                {last ? t.again : t.next}
              </button>
            )}
          </div>
        </div>

        <div>
          <p className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{t.board}</p>
          <ol className="relative h-[172px]">
            {players.map(player => {
              const rank = ranked.indexOf(player);
              return (
                <li
                  key={player.name}
                  className={`absolute inset-x-0 grid h-[30px] grid-cols-[20px_1fr_auto] items-center gap-2 rounded-[7px] border bg-surf2 px-2.5 font-mono text-[12.5px] ${
                    reduce ? "" : "transition-transform duration-700 ease-site"
                  } ${player.me ? "border-acc" : "border-border"}`}
                  style={{ transform: `translateY(${rank * 34}px)` }}
                >
                  <span>{rank + 1}</span>
                  <span>{player.name}</span>
                  <b className="font-normal tabular-nums text-acc">{player.points}</b>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </DemoFrame>
  );
}
