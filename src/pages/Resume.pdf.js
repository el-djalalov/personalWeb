// src/pages/Resume.pdf.ts
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

export async function GET() {
  try {
    // Get the current file's directory
    const currentDir = path.dirname(fileURLToPath(import.meta.url));

    // Construct the absolute path to the PDF
    const filePath = path.resolve(currentDir, "../../public/Resume.pdf");

    // Read the file
    const fileBuffer = readFileSync(filePath);

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=Resume.pdf",
      },
    });
  } catch (error) {
    console.error("Error reading PDF:", error);
    return new Response("File not found", { status: 404 });
  }
}
