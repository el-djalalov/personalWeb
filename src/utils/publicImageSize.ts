import path from "node:path";
import sharp from "sharp";

const cache = new Map<string, { width: number; height: number } | undefined>();

/**
 * Intrinsic size of an image in /public (e.g. "/images/blog/x.webp"), read at
 * build time so <img> tags can carry width/height and avoid layout shifts.
 * Returns undefined for remote URLs or files that can't be read.
 */
export async function getPublicImageSize(src?: string) {
  if (!src || !src.startsWith("/")) return undefined;
  if (cache.has(src)) return cache.get(src);

  let size: { width: number; height: number } | undefined;
  try {
    const { width, height } = await sharp(
      path.join(process.cwd(), "public", decodeURIComponent(src)),
    ).metadata();
    if (width && height) size = { width, height };
  } catch {
    size = undefined;
  }
  cache.set(src, size);
  return size;
}
