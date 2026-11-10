/** Geometry for the AgroNetZero map demo. Points are normalized (0..1). */

export type Point = readonly [number, number];

export interface Size {
  width: number;
  height: number;
}

/** Convert a normalized point to metres, given how many metres the map spans across. */
export function toMetres(point: Point, size: Size, metresAcross: number): [number, number] {
  const metresPerPixel = metresAcross / size.width;
  return [point[0] * size.width * metresPerPixel, point[1] * size.height * metresPerPixel];
}

/** Polygon area in hectares (shoelace formula). */
export function polygonAreaHa(points: readonly Point[], size: Size, metresAcross: number): number {
  if (points.length < 3 || size.width <= 0) return 0;
  const m = points.map(p => toMetres(p, size, metresAcross));
  let twiceArea = 0;
  m.forEach((p, i) => {
    const q = m[(i + 1) % m.length];
    twiceArea += p[0] * q[1] - q[0] * p[1];
  });
  return Math.abs(twiceArea / 2) / 10_000;
}

/** Length of the closed border, in metres. */
export function perimeterM(points: readonly Point[], size: Size, metresAcross: number): number {
  if (points.length < 2 || size.width <= 0) return 0;
  const m = points.map(p => toMetres(p, size, metresAcross));
  return m.reduce((sum, p, i) => {
    const q = m[(i + 1) % m.length];
    return sum + Math.hypot(q[0] - p[0], q[1] - p[1]);
  }, 0);
}

/** Ray-casting point-in-polygon test, in normalized coordinates. */
export function pointInPolygon(x: number, y: number, points: readonly Point[]): boolean {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i];
    const [xj, yj] = points[j];
    const crosses = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (crosses) inside = !inside;
  }
  return inside;
}

/** Example organic-matter value (%) at a pixel. Smooth, between 2.1 and 5.3. */
export function organicMatter(x: number, y: number): number {
  const wave = (Math.sin(x / 38) + Math.cos(y / 26) + Math.sin((x + y) / 55)) / 3;
  return 2.1 + 1.6 * (1 + wave);
}

export type OmTier = 0 | 1 | 2;

/** Low / mid / high bands used for the soil layer colours. */
export function omTier(value: number): OmTier {
  if (value < 2.9) return 0;
  if (value < 3.6) return 1;
  return 2;
}
