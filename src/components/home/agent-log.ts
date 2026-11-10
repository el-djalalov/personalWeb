import { onPage } from "@/lib/page-lifecycle";
import { prefersReducedMotion, watchVisibility } from "@/lib/motion";
import type { Run } from "@/i18n/home";

const TICK_MS = 900;
const HOLD_TICKS = 3;
const PAUSE_AFTER_CLICK_MS = 6000;

type RowState = "done" | "run" | "wait" | "empty";
const STATE_LABEL: Record<RowState, string> = {
  done: "pass",
  run: "running",
  wait: "queued",
  empty: "",
};

/**
 * The hero's agent log. Plays the example runs one step at a time and moves
 * to the next run when one finishes. Pick a run with its button; click a step
 * to read what it means (this pauses the playback for a few seconds).
 * With reduced motion the runs show finished and never play.
 */
onPage(() => {
  const card = document.querySelector<HTMLElement>("[data-agent-log]");
  if (!card) return;

  let runs: Run[];
  try {
    runs = JSON.parse(card.querySelector("[data-runs-json]")?.textContent ?? "[]") as Run[];
  } catch (error: unknown) {
    console.error("[agent-log] could not read the runs", error);
    return;
  }
  if (runs.length === 0) return;

  const rows = [...card.querySelectorAll<HTMLLIElement>("[data-steps] > li")];
  const runButtons = [...card.querySelectorAll<HTMLButtonElement>("[data-run]")];
  const status = card.querySelector<HTMLElement>("[data-status]");
  const progress = card.querySelector<HTMLElement>("[data-progress]");
  // The line under the log (not the step buttons, which carry data-why)
  const why = card.querySelector<HTMLElement>("[data-log-hint]");
  const hint = why?.textContent ?? "";
  const reduce = prefersReducedMotion();
  const listeners = new AbortController();

  let runIndex = 0;
  let step = 0;
  let hold = 0;
  let pausedAt = Number.NEGATIVE_INFINITY;
  let visible = false;
  // Hold still while someone points at or tabs into the log
  let hovering = false;
  let focused = false;

  const parts = (row: HTMLLIElement) => ({
    button: row.querySelector<HTMLButtonElement>(".step"),
    name: row.querySelector<HTMLElement>(".s-name"),
    detail: row.querySelector<HTMLElement>(".s-detail"),
    state: row.querySelector<HTMLElement>(".s-state"),
  });

  function setState(row: HTMLLIElement, state: RowState) {
    row.dataset.state = state;
    const { state: label } = parts(row);
    if (label) label.textContent = STATE_LABEL[state];
  }

  function renderRun(initial: RowState) {
    const run = runs[runIndex];
    rows.forEach((row, i) => {
      const data = run.steps[i];
      const { button, name, detail } = parts(row);
      button?.removeAttribute("aria-current");
      if (!data) {
        if (name) name.textContent = " ";
        if (detail) detail.textContent = "";
        button?.setAttribute("aria-hidden", "true");
        if (button) button.tabIndex = -1;
        setState(row, "empty");
        return;
      }
      if (name) name.textContent = data.name;
      if (detail) detail.textContent = data.detail;
      if (button) {
        button.dataset.why = data.why;
        button.removeAttribute("aria-hidden");
        button.removeAttribute("tabindex");
      }
      setState(row, initial);
    });
  }

  function selectRun(index: number) {
    runIndex = index;
    step = 0;
    hold = 0;
    runButtons.forEach(b =>
      b.setAttribute("aria-pressed", String(b.dataset.run === runs[index].id)),
    );
    renderRun(reduce ? "done" : "wait");
    if (status) status.textContent = reduce ? "done" : "queued";
    if (progress) progress.style.transform = reduce ? "scaleX(1)" : "scaleX(0)";
    if (why) why.textContent = hint;
  }

  function tick() {
    if (!visible || document.hidden || hovering || focused) return;
    if (performance.now() - pausedAt < PAUSE_AFTER_CLICK_MS) return;

    const run = runs[runIndex];
    const total = run.steps.length;
    if (step > total) {
      hold++;
      if (hold >= HOLD_TICKS) selectRun((runIndex + 1) % runs.length);
      return;
    }
    rows.forEach((row, i) => {
      if (i < total) setState(row, i < step ? "done" : i === step ? "run" : "wait");
    });
    if (progress) progress.style.transform = `scaleX(${Math.min(step, total) / total})`;
    if (status) status.textContent = step >= total ? "done" : `running · ${run.steps[step].name}`;
    step++;
  }

  runButtons.forEach((button, index) =>
    button.addEventListener(
      "click",
      () => {
        pausedAt = Number.NEGATIVE_INFINITY;
        selectRun(index);
      },
      { signal: listeners.signal },
    ),
  );

  card.addEventListener(
    "click",
    event => {
      const button = (event.target as Element).closest<HTMLButtonElement>(".step");
      if (!button || !why || !button.dataset.why) return;
      rows.forEach(row => parts(row).button?.removeAttribute("aria-current"));
      button.setAttribute("aria-current", "true");
      why.textContent = button.dataset.why;
      pausedAt = performance.now();
    },
    { signal: listeners.signal },
  );

  const signal = { signal: listeners.signal };
  card.addEventListener("pointerenter", () => (hovering = true), signal);
  card.addEventListener("pointerleave", () => (hovering = false), signal);
  card.addEventListener("focusin", () => (focused = true), signal);
  card.addEventListener("focusout", event => {
    focused = card.contains(event.relatedTarget as Node | null);
  }, signal);

  const unwatch = watchVisibility(card, isVisible => {
    visible = isVisible;
  });
  const timer = reduce ? 0 : window.setInterval(tick, TICK_MS);

  return () => {
    window.clearInterval(timer);
    unwatch();
    listeners.abort();
  };
});
