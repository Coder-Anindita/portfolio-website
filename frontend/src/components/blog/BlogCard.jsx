import { Calendar, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../lib/blog.js'
import Badge from '../ui/Badge.jsx'
import Reveal from '../ui/Reveal.jsx'

export function PostMeta({ post, className = '' }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-subtle ${className}`}>
      {post.date && (
        <span className="inline-flex items-center gap-1.5">
          <Calendar size={14} aria-hidden="true" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </span>
      )}
      <span className="inline-flex items-center gap-1.5">
        <Clock size={14} aria-hidden="true" />
        {post.readingTime} min read
      </span>
    </p>
  )
}

export default function BlogCard({ post, delay = 0 }) {
  return (
    <Reveal as="article" delay={delay} className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {post.image && (
        <div className="aspect-[16/9] overflow-hidden border-b border-line bg-zinc-100">
          <img
            src={post.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <PostMeta post={post} className="text-xs" />
        <h3 className="mt-3 text-lg leading-snug font-semibold text-ink transition-colors group-hover:text-accent">
          {/* The stretched link makes the whole card clickable while keeping one focus target. */}
          <Link to={`/blogs/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </h3>
        {post.description && <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{post.description}</p>}
        {post.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Badge tone="accent">{tag}</Badge>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  )
}
