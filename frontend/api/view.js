import { handler, isValidSlug, recordView, visitorId } from './_lib/stats.js'

// POST /api/view { slug } → { views, likes, liked }
export default handler('POST', async (req, res) => {
  const { slug } = req.body || {}
  if (!isValidSlug(slug)) return res.status(400).json({ error: 'Invalid slug.' })
  res.json(await recordView(slug, visitorId(req)))
})
