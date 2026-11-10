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

test("a blog post opens", async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto("/blog");
  await page.locator("main a[href^='/blog/']").first().click();
  await expect(page).toHaveURL(/\/blog\/.+/);
  await expect(page.locator("h1")).toBeVisible();
  expect(errors).toEqual([]);
});

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
