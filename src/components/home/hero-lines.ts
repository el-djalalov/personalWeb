import { onPage } from "@/lib/page-lifecycle";
import { hsla, prefersReducedMotion, readToken, watchVisibility, whenIdle } from "@/lib/motion";
import { contourY, isIndexContour, lensOffset, lensStrength } from "@/lib/demos/lens";

const LINES = 26;
const STEP_PX = 6;
const MAX_PUSH_PX = 34;

/**
 * Soft topographic lines behind the hero. They drift slowly and bend around
 * the cursor. Starts when the browser is idle, pauses off screen and in
 * hidden tabs, and draws one still frame for reduced motion.
 */
onPage(() => {
  const hero = document.getElementById("top");
  const canvas = hero?.querySelector<HTMLCanvasElement>("canvas[data-hero-lines]");
  const ctx = canvas?.getContext("2d");
  if (!hero || !canvas || !ctx) return;

  const reduce = prefersReducedMotion();
  const root = document.documentElement;
  let color = readToken(root, "--acc");
  let light = root.classList.contains("light");

  let width = 0;
  let height = 0;
  let ready = false;
  let visible = false;
  let running = false;
  let raf = 0;

  // Cursor position (0..1), eased toward the target for smooth motion
  let mx = 0.72;
  let my = 0.45;
  let tx = mx;
  let ty = my;
  let inside = 0;
  let bump = 0;

  function resize() {
    const rect = hero!.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    width = rect.width;
    height = rect.height;
    canvas!.width = Math.round(width * dpr);
    canvas!.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw(seconds: number) {
    if (!width || !height) return;
    ctx!.clearRect(0, 0, width, height);
    const radius = Math.min(width, height) * 0.3;
    const k = lensStrength(radius, MAX_PUSH_PX);
    const px = mx * width;
    const py = my * height;
    const boost = light ? 1.4 : 1;

    for (let i = 0; i < LINES; i++) {
      const base = -height * 0.06 + ((i + 0.5) / LINES) * height * 1.12;
      ctx!.beginPath();
      for (let x = -10; x <= width + 10; x += STEP_PX) {
        let y = contourY(base, x / width, seconds, i);
        y += bump * lensOffset(x - px, y - py, radius, k);
        if (x === -10) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      const index = isIndexContour(i);
      ctx!.strokeStyle = hsla(color, (index ? 0.45 : 0.16) * boost);
      ctx!.lineWidth = index ? 1.4 : 1;
      ctx!.stroke();
    }
  }

  function frame(time: number) {
    raf = requestAnimationFrame(frame);
    mx += (tx - mx) * 0.06;
    my += (ty - my) * 0.06;
    bump += (inside - bump) * 0.05;
    draw(time / 1000);
  }

  function start() {
    if (running || reduce || !ready || !visible || document.hidden) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  const onMove = (event: PointerEvent) => {
    const rect = hero.getBoundingClientRect();
    tx = (event.clientX - rect.left) / rect.width;
    ty = (event.clientY - rect.top) / rect.height;
    inside = 1;
  };
  const onLeave = () => {
    inside = 0;
  };
  const onTheme = () => {
    color = readToken(root, "--acc");
    light = root.classList.contains("light");
    if (!running) draw(0);
  };
  const onVisibility = () => (document.hidden ? stop() : start());

  const cancelIdle = whenIdle(() => {
    resize();
    ready = true;
    draw(0);
    start();
  });
  const resizeObserver = new ResizeObserver(() => {
    if (!ready) return;
    resize();
    if (!running) draw(0);
  });
  resizeObserver.observe(hero);
  const unwatch = watchVisibility(hero, isVisible => {
    visible = isVisible;
    if (isVisible) start();
    else stop();
  });

  hero.addEventListener("pointermove", onMove);
  hero.addEventListener("pointerleave", onLeave);
  document.addEventListener("site:theme", onTheme);
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    stop();
    cancelIdle();
    resizeObserver.disconnect();
    unwatch();
    hero.removeEventListener("pointermove", onMove);
    hero.removeEventListener("pointerleave", onLeave);
    document.removeEventListener("site:theme", onTheme);
    document.removeEventListener("visibilitychange", onVisibility);
  };
});
