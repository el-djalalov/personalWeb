import { describe, expect, it } from "vitest";
import type { Language } from "@/content.config";
import { hasTag, postCountWord, postKey, postsForLanguage, readTimeLabel, uniqueTags } from "./blog";

const post = (id: string, lang: Language, extra: Partial<{ key: string; draft: boolean; day: number; tags: string[] }> = {}) => ({
  id,
  data: {
    lang,
    translationKey: extra.key,
    draft: extra.draft ?? false,
    pubDate: new Date(2026, 0, extra.day ?? 1),
    tags: extra.tags ?? [],
  },
});

describe("postKey", () => {
  it("uses the translation key, else the file name", () => {
    expect(postKey(post("a.mdx", "en", { key: "shared" }))).toBe("shared");
    expect(postKey(post("hello-world.md", "en"))).toBe("hello-world");
  });
});

describe("postsForLanguage", () => {
  const en = post("a-en.mdx", "en", { key: "a", day: 1 });
  const ru = post("a-ru.mdx", "ru", { key: "a", day: 1 });
  const onlyEn = post("b.mdx", "en", { day: 3 });
  const draft = post("c.mdx", "en", { draft: true, day: 5 });

  it("keeps the post in this language over the English one", () => {
    expect(postsForLanguage([en, ru, onlyEn], "ru")).toEqual([onlyEn, ru]);
    expect(postsForLanguage([ru, en, onlyEn], "ru")).toEqual([onlyEn, ru]);
  });

  it("falls back to English when there is no translation", () => {
    expect(postsForLanguage([en, ru, onlyEn], "uz")).toEqual([onlyEn, en]);
    expect(postsForLanguage([ru, en], "uz")).toEqual([en]);
  });

  it("drops drafts and sorts newest first", () => {
    expect(postsForLanguage([en, draft, onlyEn], "en")).toEqual([onlyEn, en]);
  });
});

describe("tags", () => {
  const a = post("a.mdx", "en", { tags: ["AI", "Rust", " "] });
  const b = post("b.mdx", "en", { tags: ["ai", "Astro"] });

  it("lists each tag once, ignoring case and blanks", () => {
    expect(uniqueTags([a, b])).toEqual(["AI", "Astro", "Rust"]);
  });

  it("matches a tag in any case", () => {
    expect(hasTag(b, "AI")).toBe(true);
    expect(hasTag(a, "astro")).toBe(false);
  });
});

describe("postCountWord", () => {
  it("uses the right plural form for each language", () => {
    expect([1, 2, 5].map((n) => postCountWord(n, "en"))).toEqual(["post", "posts", "posts"]);
    expect([1, 2, 5, 21, 22].map((n) => postCountWord(n, "ru"))).toEqual(["статья", "статьи", "статей", "статья", "статьи"]);
    expect([1, 3].map((n) => postCountWord(n, "uz"))).toEqual(["maqola", "maqola"]);
  });
});

describe("readTimeLabel", () => {
  const words = (n: number) => Array.from({ length: n }, () => "word").join(" ");

  it("rounds up and uses the page language", () => {
    expect(readTimeLabel(words(250), "en")).toBe("2 min read");
    expect(readTimeLabel(words(10), "ru")).toBe("1 мин чтения");
    expect(readTimeLabel("", "uz")).toBe("1 daqiqa o'qish");
  });
});
