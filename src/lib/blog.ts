import readingTime from "reading-time";
import type { Language } from "@/content.config";
import { getHomeCopy } from "@/i18n/home";
import { t } from "@/i18n/translations";

/** The fields these helpers read from a blog collection entry */
interface PostLike {
  id: string;
  data: {
    lang: Language;
    translationKey?: string;
    draft?: boolean;
    pubDate: Date;
    tags: string[];
  };
}

/** The URL slug a post shares with its translations */
export const postKey = (post: PostLike): string =>
  post.data.translationKey || post.id.replace(/\.(md|mdx)$/, "");

const newestFirst = <T extends PostLike>(posts: readonly T[]): T[] =>
  [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

/**
 * One post per translation, newest first, drafts left out. Each post is the
 * version in `lang` when it exists, otherwise the English original
 * (the same rule as the /[lang]/blog/[slug] fallback pages).
 */
export function postsForLanguage<T extends PostLike>(posts: readonly T[], lang: Language): T[] {
  const byKey = new Map<string, T>();
  for (const post of posts) {
    if (post.data.draft) continue;
    const key = postKey(post);
    const current = byKey.get(key);
    const better =
      !current ||
      post.data.lang === lang ||
      (current.data.lang !== lang && post.data.lang === "en");
    if (better) byKey.set(key, post);
  }
  return newestFirst([...byKey.values()]);
}

/** Each tag once (first spelling wins, case ignored), blanks left out, sorted */
export function uniqueTags(posts: readonly PostLike[]): string[] {
  const byLower = new Map<string, string>();
  for (const tag of posts.flatMap((post) => post.data.tags)) {
    const clean = tag.trim();
    if (clean && !byLower.has(clean.toLowerCase())) byLower.set(clean.toLowerCase(), clean);
  }
  return [...byLower.values()].sort((a, b) => a.localeCompare(b));
}

export const hasTag = (post: PostLike, tag: string): boolean =>
  post.data.tags.some((t) => t.trim().toLowerCase() === tag.toLowerCase());

/** "post" / "posts" for a count, with Russian's extra 2–4 form */
export function postCountWord(count: number, lang: Language): string {
  const form = new Intl.PluralRules(lang).select(count);
  if (form === "one") return t("blog.post", lang);
  return t(form === "few" ? "blog.postsFew" : "blog.posts", lang);
}

/** "3 min read" in the page language, rounded up, at least 1 */
export function readTimeLabel(body: string, lang: Language): string {
  const minutes = Math.max(1, Math.ceil(readingTime(body).minutes));
  return getHomeCopy(lang).writing.readTime.replace("{n}", String(minutes));
}
