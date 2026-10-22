import { createHash } from 'node:crypto'
import { Redis } from '@upstash/redis'

// Works with either the Upstash env names or the ones Vercel's Upstash integration adds.
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
const redis = url && token ? new Redis({ url, token }) : null

const SLUG_PATTERN = /^[a-z0-9-]{1,120}$/
const VIEW_WINDOW_SECONDS = 60 * 60 * 24 // one view per visitor per post per day

const keys = {
  views: (slug) => `post:${slug}:views`,
  likes: (slug) => `post:${slug}:likes`, // set of visitor hashes
  seen: (slug, visitor) => `post:${slug}:seen:${visitor}`,
}

export const isValidSlug = (slug) => typeof slug === 'string' && SLUG_PATTERN.test(slug)

// Visitors are identified by a salted hash of their IP, so no raw IPs are stored.
export function visitorId(req) {
  const forwarded = req.headers['x-forwarded-for']
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0].trim() || req.socket?.remoteAddress || ''
  return createHash('sha256').update(`${process.env.STATS_SALT || 'blog-stats'}:${ip}`).digest('hex').slice(0, 32)
}

export async function getStats(slugs, visitor) {
  const pipeline = redis.pipeline()
  for (const slug of slugs) {
    pipeline.get(keys.views(slug))
    pipeline.scard(keys.likes(slug))
    pipeline.sismember(keys.likes(slug), visitor)
  }
  const results = await pipeline.exec()
  return Object.fromEntries(
    slugs.map((slug, i) => [
      slug,
      {
        views: Number(results[i * 3]) || 0,
        likes: Number(results[i * 3 + 1]) || 0,
        liked: Boolean(results[i * 3 + 2]),
      },
    ]),
  )
}

export async function recordView(slug, visitor) {
  const isNew = await redis.set(keys.seen(slug, visitor), 1, { nx: true, ex: VIEW_WINDOW_SECONDS })
  if (isNew) await redis.incr(keys.views(slug))
  return (await getStats([slug], visitor))[slug]
}

export async function setLiked(slug, visitor, liked) {
  if (liked) await redis.sadd(keys.likes(slug), visitor)
  else await redis.srem(keys.likes(slug), visitor)
  return (await getStats([slug], visitor))[slug]
}

// Shared wrapper: method check, "not configured" response and error handling.
export function handler(method, fn) {
  return async (req, res) => {
    res.setHeader('Cache-Control', 'no-store')
    if (req.method !== method) {
      res.setHeader('Allow', method)
      return res.status(405).json({ error: 'Method not allowed.' })
    }
    if (!redis) return res.status(503).json({ error: 'Stats storage is not configured.' })
    try {
      return await fn(req, res)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Something went wrong.' })
    }
  }
}
