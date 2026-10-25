import { useState, useEffect, useRef } from "react";

type Availability = "available" | "downloadable" | "downloading" | "unavailable";

interface TranslatorOptions {
  sourceLanguage: string;
  targetLanguage: string;
}

interface TranslatorInstance {
  translate(input: string): Promise<string>;
  destroy?(): void;
}

interface DownloadMonitor extends EventTarget {}

interface TranslatorAPI {
  availability(options: TranslatorOptions): Promise<Availability>;
  create(
    options: TranslatorOptions & { monitor?(m: DownloadMonitor): void },
  ): Promise<TranslatorInstance>;
}

declare global {
  // eslint-disable-next-line no-var
  var Translator: TranslatorAPI | undefined;
}

interface AITranslatorProps {
  sourceLang: string;
  targetLang: string;
  targetLangName: string;
}

type Status =
  | "checking"
  | "unsupported"
  | "unavailable"
  | "ready"
  | "translating"
  | "translated";

// Text inside these elements is left untouched (code samples, etc.)
const SKIP_SELECTOR = "pre, code, script, style";

function getTranslatableTextNodes(root: HTMLElement): Text[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
      if (node.parentElement?.closest(SKIP_SELECTOR)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  return nodes;
}

export default function AITranslator({
  sourceLang,
  targetLang,
  targetLangName,
}: AITranslatorProps) {
  const [status, setStatus] = useState<Status>("checking");
  const [needsDownload, setNeedsDownload] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const originals = useRef(new Map<Text, string>());

  const options: TranslatorOptions = {
    sourceLanguage: sourceLang,
    targetLanguage: targetLang,
  };

  useEffect(() => {
    if (!("Translator" in self) || !self.Translator) {
      setStatus("unsupported");
      return;
    }

    // availability() can stay pending (e.g. while the browser's on-device
    // model component is unavailable); treat that as unavailable.
    const timeout = new Promise<Availability>((resolve) =>
      setTimeout(() => resolve("unavailable"), 10_000),
    );

    Promise.race([self.Translator.availability(options), timeout])
      .then((availability) => {
        if (availability === "unavailable") {
          setStatus("unavailable");
          return;
        }
        setNeedsDownload(availability !== "available");
        setStatus("ready");
      })
      .catch(() => setStatus("unavailable"));
  }, [sourceLang, targetLang]);

  async function translateContent() {
    const contentElement = document.getElementById("blog-content");
    if (!contentElement || !self.Translator) return;

    setStatus("translating");
    setError(null);

    try {
      // Called from the click handler, so the user gesture required for a
      // language-pack download is present.
      const translator = await self.Translator.create({
        ...options,
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            setProgress(Math.round((e as ProgressEvent).loaded * 100));
          });
        },
      });
      setProgress(null);
      setNeedsDownload(false);

      // Translate text nodes in place so headings, lists, links and code
      // blocks keep their structure.
      for (const node of getTranslatableTextNodes(contentElement)) {
        const original = node.nodeValue ?? "";
        if (!originals.current.has(node)) originals.current.set(node, original);
        const leading = original.match(/^\s*/)?.[0] ?? "";
        const trailing = original.match(/\s*$/)?.[0] ?? "";
        const translated = await translator.translate(original.trim());
        node.nodeValue = `${leading}${translated}${trailing}`;
      }

      translator.destroy?.();
      setStatus("translated");
    } catch (err) {
      console.error("Translation failed:", err);
      restoreOriginal();
      setProgress(null);
      setError(err instanceof Error ? err.message : "Translation failed");
      setStatus("ready");
    }
  }

  function restoreOriginal() {
    for (const [node, original] of originals.current) {
      node.nodeValue = original;
    }
    originals.current.clear();
    setStatus("ready");
  }

  if (status === "checking") return null;

  if (status === "unsupported" || status === "unavailable") {
    return (
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {status === "unsupported"
          ? "In-browser AI translation isn't supported in this browser (it needs desktop Chrome 138+ or Edge 148+)."
          : `In-browser AI translation to ${targetLangName} isn't available on this device.`}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {status !== "translated" && (
          <button
            type="button"
            onClick={translateContent}
            disabled={status === "translating"}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
          >
            {status === "translating" ? (
              <>
                <svg
                  className="motion-safe:animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>
                  {progress !== null && progress < 100
                    ? `Downloading language pack… ${progress}%`
                    : "Translating…"}
                </span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                <span>
                  Translate to {targetLangName}
                  {needsDownload && " (downloads a language pack)"}
                </span>
              </>
            )}
          </button>
        )}

        {status === "translated" && (
          <button
            type="button"
            onClick={restoreOriginal}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
            <span>Show original</span>
          </button>
        )}
      </div>

      <div aria-live="polite">
        {status === "translated" && (
          <p className="text-sm text-blue-800 dark:text-blue-200 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 rounded">
            <strong>AI-translated to {targetLangName}.</strong> Translation
            quality may vary.
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
}
