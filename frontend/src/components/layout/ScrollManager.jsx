import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to the top on route change, or to the #section when a hash is present.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // Wait a frame so the target page has rendered.
    const frame = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
