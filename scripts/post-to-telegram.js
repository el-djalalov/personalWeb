#!/usr/bin/env node
/**
 * Post new Uzbek blog posts to Telegram channel
 *
 * Usage: TELEGRAM_BOT_TOKEN=xxx TELEGRAM_CHANNEL_ID=xxx node scripts/post-to-telegram.js
 *
 * This script:
 * 1. Reads all Uzbek blog posts from src/content/blog/
 * 2. Checks which posts have already been posted (tracked in .telegram-posted.json)
 * 3. Posts new Uzbek posts to the Telegram channel
 * 4. Updates the tracking file
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(ROOT_DIR, "src/content/blog");
const TRACKING_FILE = path.join(ROOT_DIR, ".telegram-posted.json");

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
const SITE_URL = process.env.SITE_URL || "https://www.elyor.dev";

// Validate environment variables
if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHANNEL_ID) {
  console.error("Error: TELEGRAM_BOT_TOKEN and TELEGRAM_CHANNEL_ID are required");
  process.exit(1);
}

/**
 * Load tracking file (list of already posted translation keys)
 */
function loadPostedPosts() {
  try {
    if (fs.existsSync(TRACKING_FILE)) {
      const data = JSON.parse(fs.readFileSync(TRACKING_FILE, "utf-8"));
      return new Set(data.posted || []);
    }
  } catch (error) {
    console.warn("Warning: Could not read tracking file, starting fresh");
  }
  return new Set();
}

/**
 * Save tracking file
 */
function savePostedPosts(posted) {
  const data = {
    posted: Array.from(posted),
    lastUpdated: new Date().toISOString(),
  };
  fs.writeFileSync(TRACKING_FILE, JSON.stringify(data, null, 2));
}

/**
 * Get all Uzbek blog posts
 */
function getUzbekPosts() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const uzbekPosts = [];

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter } = matter(content);

    // Only include Uzbek posts that are not drafts
    if (frontmatter.lang === "uz" && !frontmatter.draft) {
      uzbekPosts.push({
        file,
        title: frontmatter.title,
        description: frontmatter.description,
        translationKey: frontmatter.translationKey || file.replace(/\.(mdx?|md)$/, ""),
        pubDate: new Date(frontmatter.pubDate),
        tags: frontmatter.tags || [],
      });
    }
  }

  // Sort by publication date (newest first)
  return uzbekPosts.sort((a, b) => b.pubDate - a.pubDate);
}

/**
 * Format a blog post for Telegram
 */
function formatTelegramMessage(post) {
  const url = `${SITE_URL}/blog/${post.translationKey}?lang=uz`;
  const tags = post.tags.map((t) => `#${t.replace(/\s+/g, "_")}`).join(" ");

  // Telegram message format with Markdown
  let message = `📝 *${escapeMarkdown(post.title)}*\n\n`;
  message += `${escapeMarkdown(post.description)}\n\n`;
  message += `🔗 [Maqolani o'qing](${url})`;

  if (tags) {
    message += `\n\n${tags}`;
  }

  return message;
}

/**
 * Escape special characters for Telegram MarkdownV2
 */
function escapeMarkdown(text) {
  // For MarkdownV2, escape these characters: _*[]()~`>#+-=|{}.!
  return text.replace(/([_*\[\]()~`>#+=|{}.!\\-])/g, "\\$1");
}

/**
 * Send a message to Telegram channel
 */
async function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHANNEL_ID,
      text: message,
      parse_mode: "MarkdownV2",
      disable_web_page_preview: false,
    }),
  });

  const result = await response.json();

  if (!result.ok) {
    throw new Error(`Telegram API error: ${result.description}`);
  }

  return result;
}

/**
 * Main function
 */
async function main() {
  console.log("🚀 Starting Telegram posting script...\n");

  // Load already posted posts
  const posted = loadPostedPosts();
  console.log(`📋 Already posted: ${posted.size} posts`);

  // Get all Uzbek posts
  const uzbekPosts = getUzbekPosts();
  console.log(`📝 Found ${uzbekPosts.length} Uzbek posts\n`);

  // Find new posts
  const newPosts = uzbekPosts.filter((post) => !posted.has(post.translationKey));
  console.log(`🆕 New posts to send: ${newPosts.length}\n`);

  if (newPosts.length === 0) {
    console.log("✅ No new posts to send. Exiting.");
    return;
  }

  // Post each new post to Telegram
  for (const post of newPosts) {
    console.log(`📤 Posting: ${post.title}`);

    try {
      const message = formatTelegramMessage(post);
      await sendToTelegram(message);

      // Mark as posted
      posted.add(post.translationKey);
      console.log(`   ✅ Posted successfully!\n`);

      // Small delay between posts to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`   ❌ Failed to post: ${error.message}\n`);
      // Continue with other posts
    }
  }

  // Save tracking file
  savePostedPosts(posted);
  console.log(`\n💾 Tracking file updated. Total posted: ${posted.size}`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
