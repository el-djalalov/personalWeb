import { useEffect, useState, type ReactNode, type RefObject } from "react";

/** True when the visitor asked for reduced motion. False during server render. */
export function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(query.matches);
    const onChange = () => setReduce(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduce;
}

/** True while the element is on screen. */
export function useInView(ref: RefObject<Element | null>, rootMargin = "0px"): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

/** Changes every time the theme toggles, so canvas drawings can redraw. */
export function useThemeVersion(): number {
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const onTheme = () => setVersion(v => v + 1);
    document.addEventListener("site:theme", onTheme);
    return () => document.removeEventListener("site:theme", onTheme);
  }, []);
  return version;
}

/** Show a short message in the shared toast (rendered by CommandMenu.astro). */
export function showToast(message: string): void {
  const toast = document.getElementById("site-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-on");
  window.setTimeout(() => toast.classList.remove("is-on"), 2200);
}

interface DemoFrameProps {
  label: string;
  tools?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

/** Shared frame for every case demo: label and tools on top, readout below. */
export function DemoFrame({ label, tools, footer, children }: DemoFrameProps) {
  return (
    <div className="relative overflow-hidden rounded-[14px] border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-border px-3.5 py-2.5">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <i className="demo-live h-1.5 w-1.5 rounded-full bg-good" aria-hidden="true" />
          {label}
        </span>
        {tools && <div className="flex flex-wrap items-center gap-1.5">{tools}</div>}
      </div>
      {children}
      {footer && (
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 border-t border-border px-3.5 py-2.5 font-mono text-xs tabular-nums text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  );
}

interface ToolButtonProps {
  on?: boolean;
  pressed?: boolean;
  onClick: () => void;
  children: ReactNode;
}

export function ToolButton({ on, pressed, onClick, children }: ToolButtonProps) {
  const active = on || pressed;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={`rounded-[7px] border px-2.5 py-1 font-mono text-[11px] tracking-wide transition-colors ${
        active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-acc"
      }`}
    >
      {children}
    </button>
  );
}
