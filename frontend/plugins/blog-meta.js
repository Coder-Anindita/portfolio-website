import { readFile } from 'node:fs/promises'
import { parse } from 'yaml'

// Lets the blog listing import only a post's metadata:
//   import.meta.glob('./blogs/*.mdx', { query: '?meta' })
// returns { frontmatter, readingTime } without bundling the article body,
// so each article is code-split and downloaded only when opened.
const PREFIX = '\0blog-meta:'
const WORDS_PER_MINUTE = 200

export default function blogMeta() {
  return {
    name: 'blog-meta',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!source.endsWith('.mdx?meta')) return null
      const resolved = await this.resolve(source.slice(0, -'?meta'.length), importer, { skipSelf: true })
      return resolved && PREFIX + resolved.id
    },
    async load(id) {
      if (!id.startsWith(PREFIX)) return null
      const file = id.slice(PREFIX.length)
      this.addWatchFile(file)
      const source = (await readFile(file, 'utf8')).replace(/\r\n/g, '\n')
      const match = source.match(/^---\n([\s\S]*?)\n---\n?/)
      const frontmatter = match ? parse(match[1]) || {} : {}
      const body = match ? source.slice(match[0].length) : source
      const words = body.split(/\s+/).filter(Boolean).length
      const readingTime = Math.max(1, Math.round(words / WORDS_PER_MINUTE))
      return `export const frontmatter = ${JSON.stringify(frontmatter)};\nexport const readingTime = ${readingTime};`
    },
  }
}
