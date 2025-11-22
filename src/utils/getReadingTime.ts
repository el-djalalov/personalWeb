// Calculate reading time based on word count
// Average reading speed: 200 words per minute

export default function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
}
