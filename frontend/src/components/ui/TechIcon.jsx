import { techIcons } from '../../data/techIcons.js'

// Darkens very light brand colours (e.g. JavaScript yellow) so they stay visible on white.
function readableColor(hex) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16))
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  if (luminance < 0.62) return `#${hex}`
  const darken = (c) => Math.round(c * 0.72)
  return `rgb(${darken(r)}, ${darken(g)}, ${darken(b)})`
}

export default function TechIcon({ name, size = 16, className = '' }) {
  const icon = techIcons[name]
  if (!icon) return null

  // Lucide component fallback
  if (typeof icon === 'function' || icon.$$typeof) {
    const Icon = icon
    return <Icon size={size} className={`text-muted ${className}`} aria-hidden="true" />
  }

  // Simple Icons object: { path, hex }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={icon.color || readableColor(icon.hex)} className={className} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  )
}
