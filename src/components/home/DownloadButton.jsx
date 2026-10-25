import { Download } from "lucide-react";

export default function DownloadButton() {
  return (
    <div className="bg-background flex justify-center items-center">
      <div className="relative inline-flex group">
        <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-cyan-700 via-fuchsia-700 to-blue-700 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200"></div>
        <a
          href="/ResumeElyorDjalalov.pdf"
          download
          className="relative inline-flex items-center justify-center px-4 py-4 text-lg font-bold transition-all duration-200 bg-background font-pj rounded-xl"
        >
          <Download
            size="18"
            aria-hidden="true"
            className="mr-4 text-slate-700 dark:text-slate-200"
          />
          <span className="text-slate-700 dark:text-slate-200 text-sm">
            Download Resume
          </span>
        </a>
      </div>
    </div>
  );
}
