import { defineConfig, devices } from "@playwright/test";

// Smoke tests against the production build. Run `yarn build` first, then
// `yarn test:e2e`. Uses the installed Chrome, so no browser download.
export default defineConfig({
  testDir: "e2e",
  timeout: 30_000,
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:4322",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "yarn astro preview --port 4322",
    url: "http://localhost:4322",
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [{ name: "chrome", use: { ...devices["Desktop Chrome"], channel: "chrome" } }],
});
