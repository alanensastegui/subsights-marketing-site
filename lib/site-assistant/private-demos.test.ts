import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { DEMO_TARGETS } from '@/lib/demo/config'
import { PROSPECT_DEMOS } from '@/lib/demo/config/prospects'

// Prospect demos are private links made for one organization. The website
// assistant must never hand them to visitors.
const root = join(__dirname)

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return files(path)
    return name.endsWith('.test.ts') ? [] : [path]
  })
}

function demoLinks(text: string): string[] {
  return [...text.matchAll(/\/demo\/([a-z0-9-]+)/gi)].map((m) => m[1].toLowerCase())
}

const slugs = new Set(
  [...PROSPECT_DEMOS, ...DEMO_TARGETS].map((demo) => demo.slug).concat('postcards-to-seattle'),
)

describe('site assistant content', () => {
  it('finds prospect slugs in a demo link', () => {
    const found = demoLinks('Try https://subsights.com/demo/Kirkland-Chamber .')
    expect(found).toEqual(['kirkland-chamber'])
    expect(found.some((slug) => slugs.has(slug))).toBe(true)
  })

  it('links no prospect demo in any prompt or knowledge file', () => {
    const leaks = files(root).flatMap((path) =>
      demoLinks(readFileSync(path, 'utf8'))
        .filter((slug) => slugs.has(slug))
        .map((slug) => `${path.slice(root.length + 1)}: /demo/${slug}`),
    )
    expect(leaks).toEqual([])
  })
})
