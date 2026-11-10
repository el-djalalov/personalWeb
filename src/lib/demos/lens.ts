/**
 * Maths for the hero's map lines.
 *
 * The cursor works like a soft lens: points near it are pushed away along y.
 * The push is `dy * k * gaussian(distance)`. It is zero at the cursor height
 * and grows smoothly on both sides, so a line that crosses the cursor height
 * never jumps from "pushed up" to "pushed down" (the old version flipped sign
 * there and drew a sharp break).
 */

/**
 * Strength `k` so that the biggest push is `maxPush` pixels. The push along a
 * column peaks at |dy| = radius, where it equals radius * k * e^-0.5.
 */
export function lensStrength(radius: number, maxPush: number): number {
  if (radius <= 0) return 0;
  return maxPush / (radius * Math.exp(-0.5));
}

/** Vertical push for a point at (dx, dy) from the cursor. */
export function lensOffset(dx: number, dy: number, radius: number, k: number): number {
  if (radius <= 0) return 0;
  return dy * k * Math.exp(-(dx * dx + dy * dy) / (2 * radius * radius));
}

/**
 * Resting y of line `index` at horizontal position `nx` (0..1) and time
 * `seconds`: two slow sine waves, offset per line.
 */
export function contourY(base: number, nx: number, seconds: number, index: number): number {
  return (
    base +
    Math.sin(nx * 4.2 + seconds * 0.3 + index * 0.42) * 16 +
    Math.sin(nx * 9.5 - seconds * 0.18 + index * 0.8) * 6
  );
}

/** Every fifth line is an index contour, drawn stronger, as on real maps. */
export const isIndexContour = (index: number): boolean => index % 5 === 2;
