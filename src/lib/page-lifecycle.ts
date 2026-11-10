/**
 * Page scripts run once per full page load, but Astro's ClientRouter swaps
 * pages without reloading them. `onPage` runs an init function on every page
 * view (`astro:page-load`) and runs the cleanup it returns before the next
 * swap (`astro:before-swap`), so animation loops, timers, observers and
 * listeners never leak onto the next page.
 */
export type Cleanup = () => void;
export type PageInit = () => Cleanup | void;

interface Registry {
  inits: PageInit[];
  active: Cleanup[];
  loaded: boolean;
}

declare global {
  interface Window {
    __pageLifecycle?: Registry;
  }
}

function start(registry: Registry, init: PageInit): void {
  try {
    const cleanup = init();
    if (typeof cleanup === "function") registry.active.push(cleanup);
  } catch (error: unknown) {
    // One broken section must not stop the others from starting
    console.error("[page-lifecycle] init failed", error);
  }
}

function stopAll(registry: Registry): void {
  const running = registry.active;
  registry.active = [];
  running.forEach(cleanup => {
    try {
      cleanup();
    } catch (error: unknown) {
      console.error("[page-lifecycle] cleanup failed", error);
    }
  });
}

function getRegistry(): Registry {
  if (window.__pageLifecycle) return window.__pageLifecycle;

  const registry: Registry = { inits: [], active: [], loaded: false };
  window.__pageLifecycle = registry;
  document.addEventListener("astro:page-load", () => {
    stopAll(registry);
    registry.loaded = true;
    registry.inits.forEach(init => start(registry, init));
  });
  document.addEventListener("astro:before-swap", () => {
    stopAll(registry);
    // Scripts of the next page that load during the swap wait for its
    // page-load instead of starting right away and then once more
    registry.loaded = false;
  });
  return registry;
}

export function onPage(init: PageInit): void {
  const registry = getRegistry();
  registry.inits.push(init);
  // Registered after the first page-load already fired: start right away
  if (registry.loaded) start(registry, init);
}
