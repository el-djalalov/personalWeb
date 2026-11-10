import { expect, test, type Page } from "@playwright/test";

/** Collects page errors and console errors, ignoring Vercel's analytics script (absent locally). */
function trackErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => {
    if (message.type() === "error" && !message.text().includes("_vercel")) {
      const where = message.location().url;
      if (!where.includes("_vercel")) errors.push(message.text());
    }
  });
  return errors;
}

for (const [path, lang] of [
  ["/", "en"],
  ["/uz/", "uz"],
  ["/ru/", "ru"],
] as const) {
  test(`home page loads in ${lang} without errors`, async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("[data-agent-log]")).toBeVisible();
    await page.locator("#work").scrollIntoViewIfNeeded();
    await expect(page.getByRole("tab", { selected: true })).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("clicking a log step explains it under the log and keeps the rows intact", async ({ page }) => {
  await page.goto("/");
  const card = page.locator("[data-agent-log]");
  const second = card.locator(".step").nth(1);
  const why = await second.getAttribute("data-why");
  await second.click();
  await expect(card.locator("[data-log-hint]")).toHaveText(why ?? "");
  // Every row still has its three parts
  await expect(card.locator("li:not([data-state=empty]) .s-name")).toHaveCount(5);
  // Switching runs keeps the rows intact too
  await card.locator("[data-run=cloud]").click();
  await expect(card.locator(".step").first().locator(".s-name")).toHaveText("plan");
});

test("the theme choice stays after a reload", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).not.toHaveClass(/light/);
  await page.locator("#themeToggle").click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/light/);
});

test("Ctrl K opens and closes the menu", async ({ page }) => {
  await page.goto("/");
  const menu = page.locator("dialog#cmdk");
  await page.keyboard.press("Control+k");
  await expect(menu).toHaveAttribute("open", "");
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open", "");
});

test("arrow keys move between case tabs", async ({ page }) => {
  await page.goto("/#work");
  // Astro removes the ssr attribute once the island has hydrated
  await page.locator("astro-island:not([ssr]) [role=tablist]").waitFor();
  const first = page.locator("#tab-agro");
  await expect(first).toHaveAttribute("aria-selected", "true");
  await first.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#tab-topqir")).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#case-topqir")).toBeVisible();
});

test("the case list stays in view while the case scrolls", async ({ page }) => {
  await page.goto("/");
  const list = page.locator("[role=tablist]");
  const top = await page.locator("#work").evaluate(el => el.getBoundingClientRect().top + window.scrollY);
  await page.evaluate(y => window.scrollTo({ top: y + 400, behavior: "instant" }), top);
  const box = await list.boundingBox();
  // Sticky at lg:top-24 (96px); without sticky it would be above the screen
  expect(box?.y ?? -1).toBeGreaterThanOrEqual(0);
  expect(box?.y ?? 999).toBeLessThan(120);
});

test("writing cards show their post images", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#writing img")).toHaveCount(3);
});

test("nothing is wider than a 390px phone screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/", "/blog", "/ru/"]) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `horizontal overflow on ${path}`).toBeLessThanOrEqual(0);
  }
});

test("a blog post opens and scrolls to the end without errors", async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto("/blog");
  await page.locator("main article h2 a").first().click();
  await expect(page).toHaveURL(/\/blog\/(?!tag\/).+/);
  await expect(page.locator("h1")).toBeVisible();

  // Scroll in steps, so the table of contents and reading bar react on the way
  for (let i = 0; i < 12; i++) {
    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(60);
  }
  await expect(page.getByRole("heading", { name: "Share this article" })).toBeInViewport();
  expect(errors).toEqual([]);
});

test("the Uzbek blog lists posts with Uzbek links and reading times", async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto("/uz/blog");
  await expect(page.locator("html")).toHaveAttribute("lang", "uz");
  const cards = page.locator("main article");
  await expect(cards.first()).toBeVisible();
  await expect(cards.first().locator("h2 a")).toHaveAttribute("href", /^\/uz\/blog\//);
  await expect(cards.first()).toContainText("daqiqa o'qish");
  expect(errors).toEqual([]);
});

test("a tag page lists only posts with that tag", async ({ page }) => {
  await page.goto("/blog");
  const tagLink = page.locator("main a[href^='/blog/tag/']").first();
  const tag = (await tagLink.textContent())?.trim().replace(/^#/, "") ?? "";
  await tagLink.click();
  await expect(page).toHaveURL(/\/blog\/tag\/.+/);
  await expect(page.locator("h1")).toHaveText(`#${tag}`);

  const cards = page.locator("main article");
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);
  await expect(page.locator("header p").first()).toContainText(String(count));
});

test("Russian tag pages use the right plural form", async ({ page }) => {
  await page.goto("/ru/blog/tag/ai");
  const count = await page.locator("main article").count();
  expect(count).toBeGreaterThan(0);
  const form = new Intl.PluralRules("ru").select(count);
  const word = form === "one" ? "статья" : form === "few" ? "статьи" : "статей";
  await expect(page.locator("main header p").first()).toHaveText(new RegExp(`^\\s*${count}\\s+${word}\\s`));
});

for (const [path, heading, home] of [
  ["/no-such-page", "Sorry, we couldn't find this page.", "/"],
  ["/ru/no-such-page", "Извините, страница не найдена.", "/ru/"],
  ["/uz/no-such-page", "Kechirasiz, bu sahifa topilmadi.", "/uz/"],
] as const) {
  test(`the 404 page speaks the language of ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveText(heading);
    await expect(page.locator("[data-error-home]")).toHaveAttribute("href", home);
  });
}

test("after home → blog → home, the log still plays and Ctrl K still works", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /All posts|Barcha|Все статьи/ }).first().click();
  await expect(page).toHaveURL(/\/blog/);
  await page.locator("#header a").first().click();
  await expect(page).toHaveURL(/\/$/);

  const status = page.locator("[data-agent-log] [data-status]");
  await expect(status).toContainText("running", { timeout: 5000 });

  await page.keyboard.press("Control+k");
  await expect(page.locator("dialog#cmdk")).toHaveAttribute("open", "");
});
