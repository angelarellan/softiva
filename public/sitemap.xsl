<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Sitemap · Softiva Studio</title>
        <style>
          :root {
            color-scheme: light;
            --background: #f7f8fb;
            --surface: #ffffff;
            --foreground: #12131a;
            --muted: #5b5f6d;
            --border: #e3e6ee;
            --accent-blue: #5b8def;
            --accent-violet: #9b7bea;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            background: var(--background);
            color: var(--foreground);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          header {
            padding: 2rem 1.5rem 1.5rem;
            max-width: 1100px;
            margin: 0 auto;
          }
          h1 {
            font-size: 1.5rem;
            font-weight: 800;
            margin: 0 0 0.35rem;
            background: linear-gradient(90deg, var(--accent-blue), var(--accent-violet));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          header p {
            margin: 0;
            color: var(--muted);
            font-size: 0.9rem;
          }
          main {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 1.5rem 3rem;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            overflow: hidden;
            font-size: 0.875rem;
          }
          th, td {
            text-align: left;
            padding: 0.75rem 1rem;
            border-bottom: 1px solid var(--border);
            vertical-align: top;
          }
          th {
            text-transform: uppercase;
            letter-spacing: 0.04em;
            font-size: 0.7rem;
            color: var(--muted);
            background: #eef1f6;
          }
          tr:last-child td { border-bottom: none; }
          a { color: var(--accent-blue); text-decoration: none; word-break: break-all; }
          a:hover { color: var(--accent-violet); text-decoration: underline; }
          .lang-tag {
            display: inline-block;
            font-size: 0.7rem;
            font-weight: 600;
            padding: 0.1rem 0.5rem;
            border-radius: 999px;
            border: 1px solid var(--border);
            color: var(--muted);
            margin: 0 0.15rem 0.15rem 0;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Softiva Studio — Sitemap</h1>
          <p>
            <xsl:value-of select="count(sitemap:urlset/sitemap:url)" />
            URLs indexables · generado automáticamente en cada deploy
          </p>
        </header>
        <main>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Idiomas</th>
                <th>Última modificación</th>
                <th>Frecuencia</th>
                <th>Prioridad</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc" />
                    </a>
                  </td>
                  <td>
                    <xsl:for-each select="xhtml:link">
                      <span class="lang-tag">
                        <xsl:value-of select="@hreflang" />
                      </span>
                    </xsl:for-each>
                  </td>
                  <td>
                    <xsl:value-of select="substring(sitemap:lastmod, 1, 10)" />
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:changefreq" />
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:priority" />
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
