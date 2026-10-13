import { lazy } from 'react'

// Every .mdx file in src/content/blogs is picked up automatically.
// The file name becomes the URL slug: my-post.mdx → /blogs/my-post
//
// Metadata (frontmatter + reading time) is loaded eagerly so listings are instant;
// the article body is code-split and only downloaded when a post is opened.
// (The ?meta query is handled by plugins/blog-meta.js.)
const metaModules = import.meta.glob('../content/blogs/*.mdx', { eager: true, query: '?meta' })
const contentLoaders = import.meta.glob('../content/blogs/*.mdx')

const slugFromPath = (path) => path.split('/').pop().replace(/\.mdx(\?meta)?$/, '')
const contentPath = (path) => path.replace(/\?meta$/, '')

const components = {}

export const posts = Object.entries(metaModules)
  .map(([metaPath, { frontmatter, readingTime }]) => {
    const slug = slugFromPath(metaPath)
    return {
      slug,
      title: frontmatter.title || slug,
      description: frontmatter.description || '',
      date: frontmatter.date ? String(frontmatter.date).slice(0, 10) : '',
      image: frontmatter.image || '',
      tags: frontmatter.tags || [],
      draft: Boolean(frontmatter.draft),
      readingTime,
      path: contentPath(metaPath),
    }
  })
  // Set `draft: true` in frontmatter to hide a post in production builds.
  .filter((post) => import.meta.env.DEV || !post.draft)
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export const allTags = [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) =>
  a.localeCompare(b),
)

export function getPost(slug) {
  return posts.find((post) => post.slug === slug)
}

// Returns a lazily loaded React component for the article body (cached per slug).
export function getPostComponent(slug) {
  const post = getPost(slug)
  if (!post) return null
  if (!components[slug]) components[slug] = lazy(contentLoaders[post.path])
  return components[slug]
}

// Posts are sorted newest first, so "previous" is the older one.
export function getAdjacentPosts(slug) {
  const index = posts.findIndex((post) => post.slug === slug)
  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  }
}

export function formatDate(date) {
  if (!date) return ''
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
