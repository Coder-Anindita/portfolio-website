import { Heart } from 'lucide-react'
import { formatCount } from '../../lib/stats.js'

export default function LikeButton({ stats, onToggle, pending }) {
  if (!stats) return null
  const { liked, likes } = stats
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={pending}
      aria-pressed={liked}
      aria-label={liked ? 'Unlike this article' : 'Like this article'}
      className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 disabled:cursor-wait ${
        liked ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-line bg-white text-muted hover:border-rose-200 hover:text-rose-600'
      }`}
    >
      <Heart
        size={17}
        aria-hidden="true"
        className={`transition-transform duration-200 group-active:scale-125 ${liked ? 'fill-current' : ''}`}
      />
      <span>
        {formatCount(likes)} {likes === 1 ? 'like' : 'likes'}
      </span>
    </button>
  )
}
