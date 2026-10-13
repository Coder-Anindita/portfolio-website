import { useEffect, useState } from 'react'

export default function TableOfContents({ headings }) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px' },
    )
    headings.forEach(({ id }) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })
    return () => observer.disconnect()
  }, [headings])

  return (
    <nav aria-label="Table of contents">
      <p className="mb-3 font-mono text-xs font-medium tracking-[0.16em] text-subtle uppercase">On this page</p>
      <ul className="space-y-1 border-l border-line text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`-ml-px block border-l py-1 transition-colors ${heading.level === 3 ? 'pl-7' : 'pl-4'} ${
                active === heading.id ? 'border-accent font-medium text-accent' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
