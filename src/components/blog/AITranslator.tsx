import { useState, useEffect } from "react";

interface TranslatorAPI {
  create(options: {
    sourceLanguage: string;
    targetLanguage: string;
  }): Promise<any>;
  capabilities(): Promise<{ available: string }>;
}

declare global {
  interface Window {
    Translator?: TranslatorAPI;
    ai?: { translator?: TranslatorAPI };
  }
}

interface AITranslatorProps {
  sourceLang: string;
  targetLang: string;
  targetLangName: string;
  onTranslate?: () => void;
  children?: React.ReactNode;
}

export default function AITranslator({
  sourceLang,
  targetLang,
  targetLangName,
  onTranslate,
  children,
}: AITranslatorProps) {
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [originalContent, setOriginalContent] = useState("");
  const [translatedContent, setTranslatedContent] = useState("");

  useEffect(() => {
    checkSupport();
  }, []);

  async function checkSupport() {
    try {
      if ("Translator" in window) {
        const capabilities = await window.Translator!.capabilities();
        setIsSupported(capabilities.available === "readily");
        return;
      }

      if ("ai" in window && window.ai?.translator) {
        const capabilities = await window.ai.translator.capabilities();
        setIsSupported(capabilities.available === "readily");
        return;
      }

      setIsSupported(false);
    } catch (err) {
      console.error("Translation API check failed:", err);
      setIsSupported(false);
    }
  }

  async function translateContent() {
    const contentElement = document.querySelector(
      "#blog-content"
    ) as HTMLElement;
    if (!contentElement) return;

    if (!isSupported) {
      setError("Translation API not supported in this browser");
      return;
    }

    setIsTranslating(true);
    setError(null);

    // Save original content if not already saved
    if (!originalContent) {
      setOriginalContent(contentElement.innerHTML);
    }

    try {
      let translator;

      // Try new API (Chrome 141+)
      if ("Translator" in window) {
        translator = await window.Translator!.create({
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
        });
      }
      // Fallback to old API (Chrome 138-140)
      else if ("ai" in window && window.ai?.translator) {
        translator = await window.ai.translator.create({
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
        });
      }

      if (translator) {
        // Extract text content from HTML
        const textContent = contentElement.textContent || "";

        // Translate the text
        const result = await translator.translate(textContent);
        setTranslatedContent(result);

        // Update content with translated text (preserving some structure)
        contentElement.innerHTML = `
          <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6 rounded">
            <p class="text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span><strong>AI-translated to ${targetLangName}.</strong> Translation quality may vary.</span>
            </p>
          </div>
          <div class="prose dark:prose-invert max-w-none">
            ${result.split("\n").map((p: string) => `<p>${p}</p>`).join("")}
          </div>
        `;

        setShowOriginal(false);
        onTranslate?.();
      }
    } catch (err: any) {
      console.error("Translation failed:", err);
      setError(err.message || "Translation failed");
    } finally {
      setIsTranslating(false);
    }
  }

  function restoreOriginal() {
    const contentElement = document.querySelector(
      "#blog-content"
    ) as HTMLElement;
    if (contentElement && originalContent) {
      contentElement.innerHTML = originalContent;
      setShowOriginal(true);
    }
  }

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
              Browser AI translation not available
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              For AI-powered translation, please use{" "}
              <a
                href="https://www.google.com/chrome/"
                className="underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chrome 138+
              </a>
              . The translation feature uses Chrome's built-in Gemini Nano AI,
              which runs entirely in your browser for privacy and speed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <button
        onClick={translateContent}
        disabled={isTranslating || !showOriginal}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
      >
        {isTranslating ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
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
            <span>Translating...</span>
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            <span>Translate to {targetLangName}</span>
          </>
        )}
      </button>

      {originalContent && !showOriginal && (
        <button
          onClick={restoreOriginal}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-all"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
          <span>Show Original</span>
        </button>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>
      )}
    </div>
  );
}
