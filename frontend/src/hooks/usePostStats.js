import { useCallback, useEffect, useState } from 'react'
import { fetchStats, recordView, setLiked } from '../lib/stats.js'

// Loads views/likes for a list of posts in one request. Returns {} until (or unless) it succeeds.
export function usePostStats(slugs) {
  const key = slugs.join(',')
  const [stats, setStats] = useState({})

  useEffect(() => {
    if (!key) return
    let cancelled = false
    fetchStats(key.split(','))
      .then((data) => !cancelled && setStats(data))
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [key])

  return stats
}

// Records a view for one post and exposes an optimistic like toggle.
// `stats` stays null when the API is unavailable.
export function usePostEngagement(slug) {
  // Tagged with the slug so stale stats from the previous post are never shown.
  const [entry, setEntry] = useState({ slug: null, stats: null })
  const [pending, setPending] = useState(false)
  const stats = entry.slug === slug ? entry.stats : null

  useEffect(() => {
    let cancelled = false
    recordView(slug)
      .then((data) => !cancelled && setEntry({ slug, stats: data }))
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [slug])

  const toggleLike = useCallback(async () => {
    if (!stats || pending) return
    const liked = !stats.liked
    setEntry({ slug, stats: { ...stats, liked, likes: Math.max(0, stats.likes + (liked ? 1 : -1)) } })
    setPending(true)
    try {
      setEntry({ slug, stats: await setLiked(slug, liked) })
    } catch {
      setEntry({ slug, stats })
    } finally {
      setPending(false)
    }
  }, [slug, stats, pending])

  return { stats, toggleLike, pending }
}
