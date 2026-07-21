// Clicks every bottom-nav item in sequence and reports scroll position after each.
// Usage: node scripts/nav-test.mjs <url>
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url] = process.argv.slice(2);

const chrome = spawn(
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  [
    "--headless=new",
    "--disable-gpu",
    "--remote-debugging-port=0",
    `--user-data-dir=${mkdtempSync(join(tmpdir(), "cdp-"))}`,
    "about:blank",
  ],
  { stdio: ["ignore", "ignore", "pipe"] },
);

const wsUrl = await new Promise((resolve, reject) => {
  let buf = "";
  chrome.stderr.on("data", (d) => {
    buf += d;
    const m = buf.match(/DevTools listening on (ws:\/\/\S+)/);
    if (m) resolve(m[1]);
  });
  setTimeout(() => reject(new Error("chrome start timeout")), 20000);
});

const ws = new WebSocket(wsUrl);
let id = 0;
const pending = new Map();
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const msgId = ++id;
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params, sessionId }));
  });
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  }
};
await new Promise((r) => (ws.onopen = r));

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
const s = (method, params) => send(method, params, sessionId);

await s("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 2,
  mobile: true,
});
await s("Page.enable");
await s("Page.navigate", { url });
await new Promise((r) => setTimeout(r, 5000));

const evalJson = async (expression) => {
  const r = await s("Runtime.evaluate", { expression, returnByValue: true });
  return r.result.value;
};

const items = ["home", "work", "projects", "blog", "contact"];
for (const nav of items) {
  await evalJson(
    `document.querySelector('#bottomNav a[data-nav="${nav}"]').click(); "ok"`,
  );
  await new Promise((r) => setTimeout(r, 1500));
  const report = await evalJson(`
    (() => {
      const ids = { home: null, work: "experience", projects: "projects", blog: "blog", contact: "contact" };
      const targetId = ids["${nav}"];
      const y = Math.round(scrollY);
      let sectionTop = null;
      if (targetId) {
        const el = document.getElementById(targetId);
        sectionTop = el ? Math.round(el.getBoundingClientRect().top) : "MISSING";
      }
      return JSON.stringify({ clicked: "${nav}", url: location.pathname + location.hash, scrollY: y, sectionTopInViewport: sectionTop });
    })()
  `);
  console.log(report);
}

chrome.kill();
process.exit(0);
