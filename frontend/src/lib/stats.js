// Client for the view/like API in /api (Vercel functions backed by Upstash Redis).
// Every call rejects when the API is unavailable, and callers simply hide the counts.

async function request(path, options) {
  const response = await fetch(`/api/${path}`, options)
  if (!response.ok) throw new Error(`Stats request failed (${response.status})`)
  return response.json()
}

const post = (path, body) =>
  request(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

// → { [slug]: { views, likes, liked } }
export const fetchStats = (slugs) => request(`stats?slugs=${slugs.map(encodeURIComponent).join(',')}`)

// Counts the view (once per visitor per day) → { views, likes, liked }
export const recordView = (slug) => post('view', { slug })

export const setLiked = (slug, liked) => post('like', { slug, liked })

const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 })
export const formatCount = (count) => compact.format(count)
