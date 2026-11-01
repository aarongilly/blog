import fs from "node:fs/promises"
import path from "node:path"
import { escapeHTML, getDate, joinSegments, simplifySlug } from "@quartz-community/utils"

export const ColumnsRss = (opts = {}) => {
  const { rssLimit = 3 } = opts

  const emit = async (ctx, content) => {
    const { baseUrl = "", pageTitle = "" } = ctx.cfg.configuration
    // Generated folder pages can also have columns/ paths. Exclude them by identity,
    // while retaining authored index pages and posts in nested columns folders.
    const virtualFiles = new Set(ctx.virtualPages.map(([, file]) => file))
    const entries = content
      .filter(([, file]) => {
        const data = file.data
        return (
          !virtualFiles.has(file) &&
          data.relativePath?.replaceAll("\\", "/").toLowerCase().startsWith("columns/") &&
          data.unlisted !== true
        )
      })
      .map(([, file]) => ({
        data: file.data,
        date: getDate(file.data),
        title: file.data.frontmatter?.title ?? "",
      }))
      .sort((a, b) => {
        if (a.date && b.date) return b.date.getTime() - a.date.getTime()
        if (a.date) return -1
        if (b.date) return 1
        return a.title.localeCompare(b.title)
      })
      .slice(0, rssLimit ?? undefined)

    const items = entries.map(({ data, date, title }) => {
      const url = escapeHTML(`https://${joinSegments(baseUrl, encodeURI(simplifySlug(data.slug)))}`)
      return `<item>
    <title>${escapeHTML(title)}</title>
    <link>${url}</link>
    <guid>${url}</guid>
    <description>${escapeHTML(data.description ?? "")}</description>
    ${date ? `<pubDate>${date.toUTCString()}</pubDate>` : ""}
  </item>`
    })
    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeHTML(pageTitle)}</title>
    <link>${escapeHTML(`https://${baseUrl}`)}</link>
    <description>${escapeHTML(`Recent columns on ${pageTitle}`)}</description>
    <generator>Quartz -- quartz.jzhao.xyz</generator>
    ${items.join("\n")}
  </channel>
</rss>`
    const output = path.join(ctx.argv.output, "index.xml")
    await fs.mkdir(ctx.argv.output, { recursive: true })
    await fs.writeFile(output, xml)
    return [output]
  }

  return { name: "ColumnsRss", emit, partialEmit: emit }
}
