import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PostMeta } from '../components/blog/BlogCard.jsx'
import LikeButton from '../components/blog/LikeButton.jsx'
import TableOfContents from '../components/blog/TableOfContents.jsx'
import Badge from '../components/ui/Badge.jsx'
import Seo from '../components/ui/Seo.jsx'
import { usePostEngagement } from '../hooks/usePostStats.js'
import { getAdjacentPosts, getCategory, getPost, getPostComponent } from '../lib/blog.js'
import NotFoundPage from './NotFoundPage.jsx'

// Runs after the lazily-loaded article has rendered and collects its h2/h3 headings.
function HeadingCollector({ articleRef, onCollect }) {
  useEffect(() => {
    const nodes = articleRef.current?.querySelectorAll('h2[id], h3[id]') ?? []
    onCollect(
      [...nodes].map((node) => ({ id: node.id, text: node.textContent, level: Number(node.tagName[1]) })),
    )
  }, [articleRef, onCollect])
  return null
}

function ArticleSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-label="Loading article">
      {[100, 92, 96, 70, 88, 94].map((width, index) => (
        <div key={index} className="h-4 rounded bg-zinc-200/70" style={{ width: `${width}%` }} />
      ))}
    </div>
  )
}

function AdjacentLink({ post, direction }) {
  if (!post) return <span />
  const isNewer = direction === 'newer'
  return (
    <Link
      to={`/blogs/${post.slug}`}
      className={`group flex flex-col rounded-2xl border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        isNewer ? 'sm:items-end sm:text-right' : ''
      }`}
    >
      <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-subtle uppercase">
        {!isNewer && <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />}
        {isNewer ? 'Next article' : 'Previous article'}
        {isNewer && <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
      </span>
      <span className="mt-2 font-medium text-ink transition-colors group-hover:text-accent">{post.title}</span>
    </Link>
  )
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = getPost(slug)
  const Content = getPostComponent(slug)
  const articleRef = useRef(null)
  const [headings, setHeadings] = useState([])
  const { stats, toggleLike, pending } = usePostEngagement(slug)

  if (!post || !Content) return <NotFoundPage />

  const { newer, older } = getAdjacentPosts(slug)
  const showToc = headings.length >= 3

  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        path={`/blogs/${post.slug}`}
        image={post.image}
        type="article"
        publishedTime={post.date}
        tags={post.tags}
      />

      <div className="mx-auto max-w-6xl px-5 pt-28 pb-24 sm:px-8 md:pt-32">
        <Link
          to="/blogs"
          className="group mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          Back to blogs
        </Link>

        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-16">
          <article className="mx-auto w-full max-w-[44rem] xl:mx-0 xl:justify-self-end">
            <header className="rise">
              <Link
                to={`/blogs?category=${post.category}`}
                className="mb-4 inline-block font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase transition-colors hover:text-accent-strong"
              >
                {getCategory(post.category).name}
              </Link>
              {post.tags.length > 0 && (
                <ul className="mb-5 flex flex-wrap gap-2" aria-label="Tags">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <Link to={`/blogs?tag=${encodeURIComponent(tag)}`}>
                        <Badge tone="accent" className="transition-colors hover:bg-accent hover:text-white">
                          {tag}
                        </Badge>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <h1 className="text-[2.1rem] leading-tight font-semibold tracking-tight text-ink md:text-5xl md:leading-[1.1]">
                {post.title}
              </h1>
              {post.description && <p className="mt-5 text-lg leading-relaxed text-muted md:text-xl">{post.description}</p>}
              <PostMeta post={post} stats={stats} className="mt-6 border-b border-line pb-8" />
            </header>

            {post.image && (
              <img
                src={post.image}
                alt=""
                className="rise mt-10 aspect-[16/9] w-full rounded-2xl border border-line object-cover"
                style={{ '--rise-delay': '100ms' }}
              />
            )}

            {showToc && (
              <details className="mt-10 rounded-xl border border-line bg-white px-5 py-4 xl:hidden">
                <summary className="cursor-pointer text-sm font-medium text-ink">Table of contents</summary>
                <div className="mt-4">
                  <TableOfContents headings={headings} />
                </div>
              </details>
            )}

            <div
              ref={articleRef}
              className="article prose prose-zinc mt-10 max-w-none prose-headings:font-semibold prose-h2:mt-12 prose-h2:text-2xl prose-h3:text-xl md:prose-lg"
            >
              <Suspense fallback={<ArticleSkeleton />}>
                {/* getPostComponent caches one lazy component per slug, so this is stable. */}
                {/* oxlint-disable-next-line react/static-components */}
                <Content />
                <HeadingCollector key={slug} articleRef={articleRef} onCollect={setHeadings} />
              </Suspense>
            </div>

            {stats && (
              <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white px-6 py-5">
                <p className="text-sm text-muted">{stats.liked ? 'Thanks for the like!' : 'Found this useful? Leave a like.'}</p>
                <LikeButton stats={stats} onToggle={toggleLike} pending={pending} />
              </div>
            )}

            <nav aria-label="More articles" className="mt-16 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
              <AdjacentLink post={older} direction="older" />
              <AdjacentLink post={newer} direction="newer" />
            </nav>
          </article>

          {showToc && (
            <aside className="hidden xl:block">
              <div className="sticky top-28">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  )
}
