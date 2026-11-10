import { useCallback, useEffect, useRef, useState } from "react";
import type { DemoCopy } from "@/i18n/cases";
import {
  omTier,
  organicMatter,
  perimeterM,
  pointInPolygon,
  polygonAreaHa,
  type Point,
} from "@/lib/demos/geo";
import { DemoFrame, ToolButton, useReducedMotion, useThemeVersion } from "../ui";

const MAP_METRES = 1400; // the map spans 1.4 km across
const CELL = 12;
const START: Point[] = [
  [0.34, 0.24],
  [0.58, 0.17],
  [0.71, 0.5],
  [0.56, 0.78],
  [0.32, 0.63],
];

interface Props {
  label: string;
  t: DemoCopy["map"];
}

interface Model {
  poly: Point[];
  drawing: boolean;
  hover: Point | null;
  drag: number;
  soil: boolean;
  reveal: number;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Seeded random numbers, so the parcels look the same on every draw. */
function seeded(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export default function MapDemo({ label, t }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealFrame = useRef(0);
  const model = useRef<Model>({ poly: START, drawing: false, hover: null, drag: -1, soil: true, reveal: 1 });
  const reduce = useReducedMotion();
  const themeVersion = useThemeVersion();
  const [drawing, setDrawing] = useState(false);
  const [soil, setSoil] = useState(true);
  const [tip, setTip] = useState(t.tipStart);
  const [readout, setReadout] = useState({ area: "–", edge: "–", om: "–" });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (canvas.width !== Math.round(w * dpr)) canvas.width = Math.round(w * dpr);
    if (canvas.height !== Math.round(h * dpr)) canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const styles = getComputedStyle(canvas);
    const token = (name: string, alpha = 1) => `hsl(${styles.getPropertyValue(name).trim()} / ${alpha})`;
    const mono = '"IBM Plex Mono", ui-monospace, monospace';
    const { poly, drawing: isDrawing, hover, drag, soil: showSoil, reveal } = model.current;
    const closed = !isDrawing;

    ctx.fillStyle = token("--surf2");
    ctx.fillRect(0, 0, w, h);

    // Field parcels with hatching on some of them
    const random = seeded(11);
    const cols = 8;
    const rows = 4;
    const grid: [number, number][][] = [];
    for (let y = 0; y <= rows; y++) {
      grid[y] = [];
      for (let x = 0; x <= cols; x++) {
        grid[y][x] = [
          (x / cols) * w + (x % cols ? (random() - 0.5) * (w / cols) * 0.5 : 0),
          (y / rows) * h + (y % rows ? (random() - 0.5) * (h / rows) * 0.5 : 0),
        ];
      }
    }
    ctx.strokeStyle = token("--border");
    ctx.lineWidth = 1;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        ctx.beginPath();
        ctx.moveTo(...grid[y][x]);
        ctx.lineTo(...grid[y][x + 1]);
        ctx.lineTo(...grid[y + 1][x + 1]);
        ctx.lineTo(...grid[y + 1][x]);
        ctx.closePath();
        ctx.stroke();
        if ((x * 3 + y) % 4 === 0) {
          ctx.save();
          ctx.clip();
          ctx.globalAlpha = 0.45;
          for (let k = -h; k < w; k += 7) {
            ctx.beginPath();
            ctx.moveTo(k, 0);
            ctx.lineTo(k + h, h);
            ctx.stroke();
          }
          ctx.restore();
        }
      }
    }
    // Height lines and a river
    ctx.strokeStyle = token("--muted-foreground", 0.5);
    ctx.setLineDash([2, 4]);
    for (let k = 0; k < 3; k++) {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 8) {
        const y = h * (0.15 + k * 0.32) + Math.sin(x / 70 + k) * 14;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.strokeStyle = token("--acc", 0.3);
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-10, h * 0.9);
    ctx.bezierCurveTo(w * 0.3, h * 0.7, w * 0.5, h * 1.05, w + 10, h * 0.82);
    ctx.stroke();
    ctx.lineWidth = 1;

    // Soil layer inside the field
    const pixels = poly.map(([x, y]) => [x * w, y * h] as [number, number]);
    let omSum = 0;
    let omCells = 0;
    if (closed && poly.length > 2) {
      const cells: [number, number][] = [];
      for (let y = 0; y < h; y += CELL) {
        for (let x = 0; x < w; x += CELL) {
          if (pointInPolygon((x + CELL / 2) / w, (y + CELL / 2) / h, poly)) cells.push([x, y]);
        }
      }
      cells.forEach(([x, y]) => {
        omSum += organicMatter(x, y);
        omCells++;
      });
      if (showSoil) {
        const shown = Math.floor(cells.length * reveal);
        for (let i = 0; i < shown; i++) {
          const [x, y] = cells[i];
          ctx.fillStyle = token("--acc", [0.22, 0.48, 0.78][omTier(organicMatter(x, y))]);
          ctx.fillRect(x + 0.5, y + 0.5, CELL - 1, CELL - 1);
        }
      } else {
        ctx.fillStyle = token("--acc", 0.18);
        ctx.beginPath();
        pixels.forEach((p, i) => (i ? ctx.lineTo(...p) : ctx.moveTo(...p)));
        ctx.closePath();
        ctx.fill();
      }
    }

    // Field border and corners
    if (pixels.length) {
      ctx.strokeStyle = token("--acc");
      ctx.lineWidth = 2;
      ctx.beginPath();
      pixels.forEach((p, i) => (i ? ctx.lineTo(...p) : ctx.moveTo(...p)));
      if (closed) ctx.closePath();
      else if (hover) ctx.lineTo(hover[0] * w, hover[1] * h);
      ctx.stroke();
      ctx.lineWidth = 1.5;
      pixels.forEach((p, i) => {
        ctx.fillStyle = i === drag || (i === 0 && !closed) ? token("--acc") : token("--surf2");
        ctx.strokeStyle = token("--acc");
        ctx.beginPath();
        ctx.arc(p[0], p[1], i === drag ? 7 : 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    }

    const area = closed ? polygonAreaHa(poly, { width: w, height: h }, MAP_METRES) : 0;
    if (closed && poly.length > 2) {
      const cx = pixels.reduce((s, p) => s + p[0], 0) / pixels.length;
      const cy = pixels.reduce((s, p) => s + p[1], 0) / pixels.length;
      const text = `${area.toFixed(1)} ${t.ha}`;
      ctx.font = `600 12px ${mono}`;
      const tw = ctx.measureText(text).width;
      ctx.fillStyle = token("--foreground", 0.92);
      ctx.beginPath();
      ctx.roundRect(cx - tw / 2 - 8, cy - 12, tw + 16, 24, 6);
      ctx.fill();
      ctx.fillStyle = token("--surf2");
      ctx.fillText(text, cx - tw / 2, cy + 4);
    }

    // Soil reading under the cursor
    if (showSoil && closed && hover && drag < 0 && pointInPolygon(hover[0], hover[1], poly)) {
      const hx = hover[0] * w;
      const hy = hover[1] * h;
      const value = organicMatter(Math.floor(hx / CELL) * CELL, Math.floor(hy / CELL) * CELL);
      const text = `OM ${value.toFixed(1)}% · ${t.bands[omTier(value)]}`;
      ctx.font = `11px ${mono}`;
      const tw = ctx.measureText(text).width;
      const bx = Math.min(hx + 12, w - tw - 20);
      const by = Math.max(hy - 30, 6);
      ctx.fillStyle = token("--surf2");
      ctx.strokeStyle = token("--acc");
      ctx.beginPath();
      ctx.rect(bx, by, tw + 14, 22);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = token("--foreground");
      ctx.fillText(text, bx + 7, by + 15);
    }

    // Scale bar: 200 m
    const len = 200 / (MAP_METRES / w);
    ctx.strokeStyle = token("--foreground");
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(12, h - 14);
    ctx.lineTo(12 + len, h - 14);
    ctx.moveTo(12, h - 19);
    ctx.lineTo(12, h - 9);
    ctx.moveTo(12 + len, h - 19);
    ctx.lineTo(12 + len, h - 9);
    ctx.stroke();
    ctx.fillStyle = token("--foreground");
    ctx.font = `11px ${mono}`;
    ctx.fillText(`200 ${t.metres}`, 18 + len, h - 10);

    const ok = closed && poly.length > 2;
    const next = {
      area: ok ? `${area.toFixed(2)} ${t.ha}` : "–",
      edge: ok ? `${Math.round(perimeterM(poly, { width: w, height: h }, MAP_METRES))} ${t.metres}` : "–",
      om: ok && showSoil && omCells ? `${(omSum / omCells).toFixed(1)}%` : "–",
    };
    setReadout(prev =>
      prev.area === next.area && prev.edge === next.edge && prev.om === next.om ? prev : next,
    );
  }, [t]);

  const reveal = useCallback(() => {
    if (reduce) {
      model.current = { ...model.current, reveal: 1 };
      draw();
      return () => {};
    }
    // One reveal at a time: a new one replaces the running one
    cancelAnimationFrame(revealFrame.current);
    const start = performance.now();
    const step = (now: number) => {
      model.current = { ...model.current, reveal: clamp01((now - start) / 900) };
      draw();
      if (model.current.reveal < 1) revealFrame.current = requestAnimationFrame(step);
    };
    revealFrame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(revealFrame.current);
  }, [draw, reduce]);

  useEffect(() => reveal(), [reveal]);
  useEffect(() => draw(), [draw, themeVersion]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => draw());
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [draw]);

  const relative = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    return [clamp01((event.clientX - rect.left) / rect.width), clamp01((event.clientY - rect.top) / rect.height)];
  };
  const nearCorner = (p: Point, canvas: HTMLCanvasElement) =>
    model.current.poly.findIndex(
      q => Math.hypot((q[0] - p[0]) * canvas.clientWidth, (q[1] - p[1]) * canvas.clientHeight) < 12,
    );

  const finish = () => {
    if (model.current.poly.length < 3) return;
    model.current = { ...model.current, drawing: false, hover: null };
    setDrawing(false);
    setTip(t.tipDone);
    reveal();
  };

  const toggleDraw = () => {
    if (model.current.drawing) {
      finish();
      return;
    }
    model.current = { ...model.current, drawing: true, poly: [] };
    setDrawing(true);
    setTip(t.tipDraw);
    draw();
  };

  const toggleSoil = () => {
    const next = !model.current.soil;
    model.current = { ...model.current, soil: next };
    setSoil(next);
    if (next) reveal();
    else draw();
  };

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const p = relative(event);
    const m = model.current;
    if (m.drawing) {
      if (m.poly.length > 2 && nearCorner(p, canvas) === 0) {
        finish();
        return;
      }
      model.current = { ...m, poly: [...m.poly, p] };
      draw();
      return;
    }
    const index = nearCorner(p, canvas);
    if (index >= 0) {
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
      model.current = { ...m, drag: index };
      draw();
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const p = relative(event);
    const m = model.current;
    if (!m.drawing && m.drag >= 0) {
      model.current = { ...m, hover: p, poly: m.poly.map((q, i) => (i === m.drag ? p : q)) };
    } else {
      model.current = { ...m, hover: p };
      if (!m.drawing) canvas.style.cursor = nearCorner(p, canvas) >= 0 ? "grab" : "default";
    }
    draw();
  };

  const onPointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (model.current.drag < 0) return;
    model.current = { ...model.current, drag: -1 };
    event.currentTarget.style.cursor = "grab";
    setTip(t.tipDrag);
    draw();
  };

  const onPointerLeave = () => {
    if (model.current.drag >= 0) return;
    model.current = { ...model.current, hover: null };
    draw();
  };

  return (
    <DemoFrame
      label={label}
      tools={
        <>
          <ToolButton on={drawing} onClick={toggleDraw}>
            {drawing ? t.finish : t.draw}
          </ToolButton>
          <ToolButton pressed={soil} onClick={toggleSoil}>
            {t.soil}
          </ToolButton>
        </>
      }
      footer={
        <>
          <span>
            {t.area} <b className="font-normal text-foreground">{readout.area}</b>
          </span>
          <span>
            {t.edge} <b className="font-normal text-foreground">{readout.edge}</b>
          </span>
          <span>
            {t.om} <b className="font-normal text-foreground">{readout.om}</b>
          </span>
          <span className="inline-flex items-center gap-2.5">
            {t.bands.map((band, i) => (
              <span key={band} className="inline-flex items-center gap-1">
                <i className="inline-block h-2.5 w-2.5 rounded-sm bg-acc" style={{ opacity: [0.25, 0.5, 0.8][i] }} />
                {band}
              </span>
            ))}
          </span>
        </>
      }
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          aria-label={t.aria}
          role="img"
          className="block h-[300px] w-full touch-none"
          style={{ cursor: drawing ? "crosshair" : "default" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onLostPointerCapture={onPointerUp}
          onPointerLeave={onPointerLeave}
          onDoubleClick={() => model.current.drawing && finish()}
        />
        <span className="pointer-events-none absolute left-3 top-2.5 rounded bg-card/85 px-2 py-1 font-mono text-[11px] text-muted-foreground">
          {tip}
        </span>
      </div>
    </DemoFrame>
  );
}
