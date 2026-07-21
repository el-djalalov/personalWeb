// Minimal CDP mobile screenshot tool (no dependencies, Node 22+).
// Usage: node scripts/mobile-shot.mjs <url> <outfile> [width] [height] [fullpage] [clickSelector]
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, outfile, w = "390", h = "844", fullpage = "1", clickSelector = ""] =
  process.argv.slice(2);
const width = Number(w);
const height = Number(h);

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

const browserWs = new WebSocket(wsUrl);
let id = 0;
const pending = new Map();
const send = (ws, method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const msgId = ++id;
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params, sessionId }));
  });
const onMessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  }
};
browserWs.onmessage = onMessage;
await new Promise((r) => (browserWs.onopen = r));

const { targetId } = await send(browserWs, "Target.createTarget", { url: "about:blank" });
const { sessionId } = await send(browserWs, "Target.attachToTarget", {
  targetId,
  flatten: true,
});
const s = (method, params) => send(browserWs, method, params, sessionId);

await s("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 2,
  mobile: true,
});
await s("Emulation.setTouchEmulationEnabled", { enabled: true });
await s("Page.enable");
await s("Page.navigate", { url });
await new Promise((r) => setTimeout(r, 5000));

if (clickSelector) {
  await s("Runtime.evaluate", {
    expression: `document.querySelector(${JSON.stringify(clickSelector)})?.click()`,
  });
  await new Promise((r) => setTimeout(r, 1200));
}

const metrics = await s("Runtime.evaluate", {
  expression:
    "JSON.stringify({innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyScrollWidth:document.body.scrollWidth,pageHeight:document.documentElement.scrollHeight})",
  returnByValue: true,
});
console.log("metrics:", metrics.result.value);

let shotParams = { format: "png" };
if (fullpage === "1") {
  const pageHeight = JSON.parse(metrics.result.value).pageHeight;
  await s("Emulation.setDeviceMetricsOverride", {
    width,
    height: Math.min(pageHeight, 8000),
    deviceScaleFactor: 1,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 800));
}
const { data } = await s("Page.captureScreenshot", shotParams);
writeFileSync(outfile, Buffer.from(data, "base64"));
console.log("saved:", outfile);
chrome.kill();
process.exit(0);
