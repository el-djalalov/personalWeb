/** Small helpers shared by the page's motion scripts. */

export const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Run `callback` when the browser is idle. Safari has no requestIdleCallback. */
export function whenIdle(callback: () => void, timeout = 1500): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = globalThis.setTimeout(callback, 200);
  return () => globalThis.clearTimeout(id);
}

/** Call `onChange(true|false)` as `element` enters or leaves the viewport. */
export function watchVisibility(
  element: Element,
  onChange: (visible: boolean) => void,
  options: IntersectionObserverInit = { threshold: 0.01 },
): () => void {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => onChange(entry.isIntersecting));
  }, options);
  observer.observe(element);
  return () => observer.disconnect();
}

/** Read an HSL-triplet token (e.g. "232 100% 80.2%") from computed styles. */
export function readToken(element: Element, name: string): string {
  return getComputedStyle(element).getPropertyValue(name).trim();
}

/** Build a CSS color from an HSL-triplet token and an alpha. */
export const hsla = (triplet: string, alpha: number): string =>
  `hsl(${triplet} / ${alpha})`;
