<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> RSS Feed</title>
        <meta charset="utf-8"/>
        <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style type="text/css">
          * {
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #1e293b;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem 1rem;
            background: #f8fafc;
          }
          .header {
            background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
          }
          .header h1 {
            margin: 0 0 0.5rem 0;
            font-size: 1.75rem;
          }
          .header p {
            margin: 0;
            opacity: 0.9;
          }
          .notice {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            font-size: 0.875rem;
            color: #92400e;
          }
          .notice a {
            color: #92400e;
            font-weight: 600;
          }
          .articles {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .article {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            transition: box-shadow 0.2s ease;
          }
          .article:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .article h2 {
            margin: 0 0 0.5rem 0;
            font-size: 1.25rem;
          }
          .article h2 a {
            color: #7c3aed;
            text-decoration: none;
          }
          .article h2 a:hover {
            text-decoration: underline;
          }
          .article p {
            margin: 0;
            color: #64748b;
            font-size: 0.9375rem;
          }
          .article .meta {
            margin-top: 0.75rem;
            font-size: 0.8125rem;
            color: #94a3b8;
          }
          @media (prefers-color-scheme: dark) {
            body {
              background: #0f172a;
              color: #e2e8f0;
            }
            .article {
              background: #1e293b;
              border-color: #334155;
            }
            .article p {
              color: #94a3b8;
            }
            .notice {
              background: #422006;
              border-color: #78350f;
              color: #fcd34d;
            }
            .notice a {
              color: #fcd34d;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📰 <xsl:value-of select="/rss/channel/title"/></h1>
          <p><xsl:value-of select="/rss/channel/description"/></p>
        </div>

        <div class="notice">
          <strong>This is an RSS feed.</strong> Subscribe by copying the URL into your RSS reader.
          <a href="https://aboutfeeds.com/">Learn more about RSS</a>
        </div>

        <div class="articles">
          <xsl:for-each select="/rss/channel/item">
            <article class="article">
              <h2>
                <a>
                  <xsl:attribute name="href">
                    <xsl:value-of select="link"/>
                  </xsl:attribute>
                  <xsl:value-of select="title"/>
                </a>
              </h2>
              <p><xsl:value-of select="description"/></p>
              <div class="meta">
                Published on <xsl:value-of select="pubDate"/>
              </div>
            </article>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
