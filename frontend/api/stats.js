import { getStats, handler, isValidSlug, visitorId } from './_lib/stats.js'

const MAX_SLUGS = 50

// GET /api/stats?slugs=a,b,c → { a: { views, likes, liked }, ... }
export default handler('GET', async (req, res) => {
  const slugs = [...new Set(String(req.query.slugs || '').split(','))].filter(isValidSlug).slice(0, MAX_SLUGS)
  if (slugs.length === 0) return res.json({})
  res.json(await getStats(slugs, visitorId(req)))
})
