import { Search } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import BlogCard from '../components/blog/BlogCard.jsx'
import ComingSoon from '../components/blog/ComingSoon.jsx'
import Seo from '../components/ui/Seo.jsx'
import { pageMeta } from '../data/seo.js'
import { usePostStats } from '../hooks/usePostStats.js'
import { categories, getCategory, posts } from '../lib/blog.js'

const allSlugs = posts.map((post) => post.slug)

// Only categories that have at least one post get a tab or a section.
const usedCategories = categories
  .map((category) => ({ ...category, count: posts.filter((post) => post.category === category.id).length }))
  .filter((category) => category.count > 0)

function PostGrid({ posts: list, stats }) {
  return (
    <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {list.map((post, index) => (
        <BlogCard key={post.slug} post={post} stats={stats[post.slug]} delay={(index % 3) * 80} />
      ))}
    </div>
  )
}

export default function BlogsPage() {
  // Category, search and tag live in the URL (?category=langchain&q=rag&tag=LLM) so filtered views are shareable.
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const activeTag = params.get('tag') || ''
  const activeCategory = getCategory(params.get('category')) ? params.get('category') : ''
  // Fetched for every post up front so filtering doesn't trigger new requests.
  const stats = usePostStats(allSlugs)

  function update(changes) {
    const next = new URLSearchParams(params)
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    setParams(next, { replace: true })
  }

  const inCategory = useMemo(
    () => (activeCategory ? posts.filter((post) => post.category === activeCategory) : posts),
    [activeCategory],
  )

  // Tags offered are the ones used inside the selected category.
  const tags = useMemo(
    () => [...new Set(inCategory.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b)),
    [inCategory],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return inCategory.filter((post) => {
      if (activeTag && !post.tags.includes(activeTag)) return false
      if (!q) return true
      return [post.title, post.description, ...post.tags].join(' ').toLowerCase().includes(q)
    })
  }, [inCategory, query, activeTag])

  // On "All", posts are grouped under their category so the page reads like a set of notes.
  const groups = activeCategory
    ? null
    : usedCategories
        .map((category) => ({ ...category, posts: filtered.filter((post) => post.category === category.id) }))
        .filter((group) => group.posts.length > 0)

  const categoryClass = (selected) =>
    `-mb-px inline-flex items-center gap-2 border-b-2 px-1 pb-3 text-[0.95rem] font-medium whitespace-nowrap transition-colors duration-200 ${
      selected ? 'border-accent text-ink' : 'border-transparent text-muted hover:border-zinc-300 hover:text-ink'
    }`

  const countClass = (selected) =>
    `rounded-full px-2 py-0.5 text-xs ${selected ? 'bg-accent-soft text-accent-strong' : 'bg-zinc-100 text-subtle'}`

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
            <div className="rise mt-10 flex flex-col gap-6" style={{ '--rise-delay': '100ms' }}>
              <div className="flex gap-6 overflow-x-auto border-b border-line" role="group" aria-label="Filter by category">
                <button
                  type="button"
                  className={categoryClass(!activeCategory)}
                  aria-pressed={!activeCategory}
                  onClick={() => update({ category: '', tag: '' })}
                >
                  All <span className={countClass(!activeCategory)}>{posts.length}</span>
                </button>
                {usedCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={categoryClass(activeCategory === category.id)}
                    aria-pressed={activeCategory === category.id}
                    onClick={() => update({ category: category.id, tag: '' })}
                  >
                    {category.name} <span className={countClass(activeCategory === category.id)}>{category.count}</span>
                  </button>
                ))}
              </div>

              {activeCategory && <p className="-mt-2 text-muted">{getCategory(activeCategory).description}</p>}

              <div className="relative max-w-md">
                <Search size={17} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
                <label htmlFor="blog-search" className="sr-only">
                  Search articles
                </label>
                <input
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(event) => update({ q: event.target.value })}
                  placeholder="Search articles…"
                  className="w-full rounded-full border border-line bg-white py-2.5 pr-4 pl-11 text-[0.95rem] text-ink placeholder:text-zinc-400 hover:border-zinc-300 focus:border-accent focus:ring-3 focus:ring-accent/15 focus:outline-none"
                />
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
                  <button type="button" className={tagClass(!activeTag)} aria-pressed={!activeTag} onClick={() => update({ tag: '' })}>
                    All tags
                  </button>
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={tagClass(activeTag === tag)}
                      aria-pressed={activeTag === tag}
                      onClick={() => update({ tag: activeTag === tag ? '' : tag })}
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

            {filtered.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
                <p className="font-medium text-ink">No articles found</p>
                <p className="mt-1 text-sm text-muted">Try a different search term or tag.</p>
              </div>
            ) : groups ? (
              <div className="mt-6 space-y-16">
                {groups.map((group) => (
                  <section key={group.id} aria-labelledby={`category-${group.id}`}>
                    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-line pb-4">
                      <div>
                        <h2 id={`category-${group.id}`} className="text-2xl font-semibold tracking-tight text-ink">
                          {group.name}
                        </h2>
                        <p className="mt-1 text-sm text-muted">{group.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => update({ category: group.id, tag: '' })}
                        className="text-sm font-medium text-accent transition-colors hover:text-accent-strong"
                      >
                        {group.posts.length} {group.posts.length === 1 ? 'article' : 'articles'} →
                      </button>
                    </div>
                    <PostGrid posts={group.posts} stats={stats} />
                  </section>
                ))}
              </div>
            ) : (
              <PostGrid posts={filtered} stats={stats} />
            )}
          </>
        )}
      </section>
    </>
  )
}
