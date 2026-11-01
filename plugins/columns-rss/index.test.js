import assert from "node:assert/strict"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { ColumnsRss } from "./index.js"
import { ContentIndex } from "@quartz-community/content-index"

test("RSS filters before limiting, preserves other indexes, and refreshes on partial builds", async () => {
  const output = await fs.mkdtemp(path.join(os.tmpdir(), "columns-rss-"))
  try {
    const page = (slug, date, extra = {}) => [
      { type: "root", children: [] },
      {
        data: {
          slug,
          relativePath: `${slug}.md`,
          frontmatter: { title: slug },
          defaultDateType: "created",
          dates: { created: new Date(date) },
          description: "A & B < C ]]> D",
          ...extra,
        },
      },
    ]
    const post = page("columns/one", "2026-01-01", { relativePath: "Columns/one.md" })
    const nested = page("columns/nested/two", "2026-02-01")
    const virtual = page("columns/nested/index", "2026-09-01")
    const about = page("pages/about", "2026-09-01")
    const content = [
      post,
      nested,
      virtual,
      about,
      page("tags/test", "2026-09-01"),
      page("columns-other/no", "2026-09-01"),
      page("columns/secret", "2026-09-01", { unlisted: true }),
    ]
    const ctx = {
      argv: { output },
      virtualPages: [virtual],
      cfg: { configuration: { baseUrl: "example.com", pageTitle: "Test & Blog" } },
    }
    const emitter = ColumnsRss({ rssLimit: 2 })
    const original = structuredClone(content)
    await ContentIndex({ enableRSS: false }).emit(ctx, content)
    const indexPath = path.join(output, "static/contentIndex.json")
    const sitemapPath = path.join(output, "sitemap.xml")
    const indexBefore = await fs.readFile(indexPath, "utf8")
    const sitemapBefore = await fs.readFile(sitemapPath, "utf8")
    await emitter.emit(ctx, content)
    const xml = await fs.readFile(path.join(output, "index.xml"), "utf8")
    assert.deepEqual(
      [...xml.matchAll(/<guid>(.*?)<\/guid>/g)].map((m) => m[1]),
      ["https://example.com/columns/nested/two", "https://example.com/columns/one"],
    )
    assert.match(xml, /A &amp; B &lt; C/)
    assert.equal(await fs.readFile(indexPath, "utf8"), indexBefore)
    assert.equal(await fs.readFile(sitemapPath, "utf8"), sitemapBefore)
    assert.ok(JSON.parse(indexBefore)["pages/about"])
    assert.match(sitemapBefore, /tags\/test/)
    assert.deepEqual(content, original)
    await emitter.partialEmit(ctx, [post, virtual, about])
    const updated = await fs.readFile(path.join(output, "index.xml"), "utf8")
    assert.equal((updated.match(/<item>/g) ?? []).length, 1)
    assert.doesNotMatch(updated, /columns\/nested\/two/)
    await emitter.partialEmit(ctx, [virtual, about])
    assert.doesNotMatch(await fs.readFile(path.join(output, "index.xml"), "utf8"), /<item>/)
  } finally {
    await fs.rm(output, { recursive: true, force: true })
  }
})
