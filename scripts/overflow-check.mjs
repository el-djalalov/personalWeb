// Lists elements wider than the viewport (horizontal overflow offenders).
// Usage: node scripts/overflow-check.mjs <url> [width]
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, w = "390"] = process.argv.slice(2);
const width = Number(w);

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
  width,
  height: 844,
  deviceScaleFactor: 2,
  mobile: true,
});
await s("Page.enable");
await s("Page.navigate", { url });
await new Promise((r) => setTimeout(r, 6000));

const result = await s("Runtime.evaluate", {
  expression: `
    (() => {
      const vw = document.documentElement.clientWidth;
      const bad = [];
      for (const el of document.querySelectorAll("*")) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.right > vw + 1 || r.left < -1)) {
          bad.push(
            el.tagName.toLowerCase() +
              (el.id ? "#" + el.id : "") +
              (el.className && typeof el.className === "string"
                ? "." + el.className.trim().split(/\\s+/).slice(0, 4).join(".")
                : "") +
              "  [left=" + Math.round(r.left) + " right=" + Math.round(r.right) + "]"
          );
        }
      }
      return JSON.stringify(
        {
          clientWidth: vw,
          innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          bodyScrollWidth: document.body.scrollWidth,
          canScroll: document.documentElement.scrollWidth > vw || document.body.scrollWidth > vw,
          offenders: bad.slice(0, 40),
        },
        null,
        2
      );
    })()
  `,
  returnByValue: true,
});
console.log(result.result.value);
chrome.kill();
process.exit(0);
