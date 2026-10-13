import { profile, siteUrl } from '../../data/profile.js'

// React 19 hoists <title>, <meta> and <link> into <head> automatically.
export default function Seo({ title, description, path = '/', image, type = 'website', publishedTime, tags = [] }) {
  const fullTitle = title ? `${title} | ${profile.name}` : `${profile.name} — ${profile.role}`
  const desc = description || profile.tagline
  const url = `${siteUrl}${path}`
  const imageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.svg`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={profile.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  )
}
