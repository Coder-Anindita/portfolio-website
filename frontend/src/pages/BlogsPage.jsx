import { Search } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import BlogCard from '../components/blog/BlogCard.jsx'
import ComingSoon from '../components/blog/ComingSoon.jsx'
import Seo from '../components/ui/Seo.jsx'
import { pageMeta } from '../data/seo.js'
import { allTags, posts } from '../lib/blog.js'

export default function BlogsPage() {
  // Search and tag live in the URL (?q=react&tag=JavaScript) so filtered views are shareable.
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const activeTag = params.get('tag') || ''

  function update(key, value) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((post) => {
      if (activeTag && !post.tags.includes(activeTag)) return false
      if (!q) return true
      return [post.title, post.description, ...post.tags].join(' ').toLowerCase().includes(q)
    })
  }, [query, activeTag])

  const tagClass = (selected) =>
    `rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-200 ${
      selected ? 'border-ink bg-ink text-white' : 'border-line bg-white text-muted hover:border-zinc-300 hover:text-ink'
    }`

  return (
    <>
      <Seo title={pageMeta.blogs.title} description={pageMeta.blogs.description} path="/blogs" />
      <section className="mx-auto max-w-6xl px-5 pt-32 pb-24 sm:px-8 md:pt-36">
        <header className="rise max-w-2xl">
          <p className="mb-3 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">Blog</p>
          <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">Writing</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Tutorials, deep dives and notes on full stack development — written as I learn and build.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="rise mt-10" style={{ '--rise-delay': '100ms' }}>
            <ComingSoon />
          </div>
        ) : (
          <>
            <div className="rise mt-10 flex flex-col gap-5" style={{ '--rise-delay': '100ms' }}>
              <div className="relative max-w-md">
                <Search size={17} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
                <label htmlFor="blog-search" className="sr-only">
                  Search articles
                </label>
                <input
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(event) => update('q', event.target.value)}
                  placeholder="Search articles…"
                  className="w-full rounded-full border border-line bg-white py-2.5 pr-4 pl-11 text-[0.95rem] text-ink placeholder:text-zinc-400 hover:border-zinc-300 focus:border-accent focus:ring-3 focus:ring-accent/15 focus:outline-none"
                />
              </div>

              {allTags.length > 0 && (
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
                  <button type="button" className={tagClass(!activeTag)} aria-pressed={!activeTag} onClick={() => update('tag', '')}>
                    All
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={tagClass(activeTag === tag)}
                      aria-pressed={activeTag === tag}
                      onClick={() => update('tag', activeTag === tag ? '' : tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className="mt-8 text-sm text-subtle" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
            </p>

            {filtered.length > 0 ? (
              <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post, index) => (
                  <BlogCard key={post.slug} post={post} delay={(index % 3) * 80} />
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
                <p className="font-medium text-ink">No articles found</p>
                <p className="mt-1 text-sm text-muted">Try a different search term or tag.</p>
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
}
