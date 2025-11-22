import { useState } from "react";
import { languages } from "../../i18n/ui";

interface LanguageSwitcherProps {
  currentLang: string;
  availableLanguages?: string[];
}

export default function LanguageSwitcher({
  currentLang,
  availableLanguages = ["en", "ru", "uz"],
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        aria-label="Select language"
      >
        <svg
          className="w-5 h-5 text-gray-600 dark:text-gray-400"
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
        <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
          {languages[currentLang as keyof typeof languages]}
        </span>
        <svg
          className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden z-20 min-w-[140px]">
            {availableLanguages.map(code => (
              <div
                key={code}
                className={`px-4 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  currentLang === code
                    ? "bg-blue-50 dark:bg-blue-900/20 font-semibold text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  {currentLang === code && (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span>{languages[code as keyof typeof languages]}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
