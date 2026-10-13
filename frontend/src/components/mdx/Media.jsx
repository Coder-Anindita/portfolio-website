// Usage in MDX:  <YouTube id="dQw4w9WgXcQ" title="Video title" />
export function YouTube({ id, title = 'YouTube video' }) {
  return (
    <div className="not-prose my-8 aspect-video overflow-hidden rounded-xl border border-line bg-zinc-100">
      <iframe
        className="size-full"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

// Usage in MDX:  <Video src="/images/blog/demo.mp4" caption="Optional caption" />
export function Video({ src, caption, poster }) {
  return (
    <figure className="my-8">
      <video className="w-full rounded-xl border border-line" src={src} poster={poster} controls playsInline preload="metadata" />
      {caption && <figcaption className="mt-2 text-center text-sm text-subtle">{caption}</figcaption>}
    </figure>
  )
}

// Markdown images (also GIFs): ![alt text](/images/blog/pic.png "Optional caption")
export function Image({ src, alt = '', title }) {
  const img = <img src={src} alt={alt} loading="lazy" decoding="async" className="mx-auto rounded-xl border border-line" />
  if (!title) return img
  return (
    <span className="my-8 block">
      {img}
      <span className="mt-2 block text-center text-sm text-subtle">{title}</span>
    </span>
  )
}

export function Anchor({ href = '', ...props }) {
  const external = /^https?:\/\//.test(href)
  return <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props} />
}
