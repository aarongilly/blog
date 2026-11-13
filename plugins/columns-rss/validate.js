import assert from "node:assert/strict"
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import YAML from "yaml"

export async function validateRssConfig(root = process.cwd()) {
  const candidates = [
    "quartz.config.yaml",
    "quartz.plugins.json",
    "quartz.config.default.yaml",
    "quartz.plugins.default.json",
  ]
  let config
  for (const name of candidates) {
    try {
      config = YAML.parse(await fs.readFile(path.join(root, name), "utf8"))
      break
    } catch (error) {
      if (error.code !== "ENOENT") throw error
    }
  }
  assert.ok(config, "Missing Quartz configuration")
  assert.equal(config.configuration.baseUrl, "aarongilly.com", "RSS requires the public domain")
  const enabled = config.plugins.filter((entry) => entry.enabled !== false)
  assert.equal(
    enabled.filter((entry) => entry.source === "./plugins/columns-rss").length,
    1,
    "Enable exactly one columns-rss emitter",
  )
  for (const entry of enabled.filter(
    (entry) => entry.source === "@quartz-community/content-index",
  )) {
    assert.equal(
      entry.options?.enableRSS,
      false,
      "Disable ContentIndex RSS to avoid competing writers",
    )
  }
}

export function validateRssFeed(xml) {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
  assert.ok(items.length > 0, "RSS must contain columns")
  for (const [, item] of items) {
    for (const tag of ["link", "guid"]) {
      const value = item.match(new RegExp(`<${tag}>(.*?)</${tag}>`))?.[1]
      assert.ok(value, `Missing RSS ${tag}`)
      const url = new URL(value)
      assert.equal(url.origin, "https://aarongilly.com")
      assert.match(url.pathname, /^\/columns\/.+/, "RSS may only contain columns")
    }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await validateRssConfig()
  if (process.argv[2] !== "--config-only") {
    validateRssFeed(await fs.readFile("public/index.xml", "utf8"))
  }
  console.log("Columns RSS validation passed")
}
