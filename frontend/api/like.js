import { handler, isValidSlug, setLiked, visitorId } from './_lib/stats.js'

// POST /api/like { slug, liked: true|false } → { views, likes, liked }
export default handler('POST', async (req, res) => {
  const { slug, liked } = req.body || {}
  if (!isValidSlug(slug) || typeof liked !== 'boolean') return res.status(400).json({ error: 'Invalid request.' })
  res.json(await setLiked(slug, visitorId(req), liked))
})
