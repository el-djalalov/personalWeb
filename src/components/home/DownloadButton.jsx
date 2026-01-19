import { Download } from "lucide-react";
import { motion } from "framer-motion";

const translations = {
  en: "Download Resume",
  uz: "Rezyumeni yuklash",
  ru: "Скачать резюме",
};

export default function DownloadButton({ lang = "en" }) {
  const handleClick = (e) => {
    e.preventDefault();

    // Programmatically trigger download
    /* const link = document.createElement("a");
    link.href = "/ResumeElyorDjalalov.pdf";
    link.download = "ResumeElyorDjalalov.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); */
  };

  const buttonText = translations[lang] || translations.en;

  return (
    <div className="bg-background flex justify-center items-center">
      <div className="relative inline-flex group">
        <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-cyan-700 via-fuchsia-700 to-blue-700 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={buttonText}
          aria-label={buttonText}
          className="relative inline-flex items-center justify-center px-4 py-4 text-lg font-bold text-white transition-all duration-200 bg-background font-pj rounded-xl"
          onClick={handleClick}
        >
          <Download
            size="18"
            className="mr-4 text-slate-700 dark:text-slate-200"
          />
          <span className="text-slate-700 dark:text-slate-200 text-sm">
            {buttonText}
          </span>
        </motion.button>
      </div>
    </div>
  );
}
