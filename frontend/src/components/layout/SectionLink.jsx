import { Link, useLocation } from 'react-router-dom'

// Link to a section of the home page. On the home page it smooth-scrolls in place;
// from any other route it navigates to "/#id" and ScrollManager scrolls on arrival.
export default function SectionLink({ id, className, children, onNavigate, ...props }) {
  const { pathname } = useLocation()
  const href = id === 'home' ? '/' : `/#${id}`

  function handleClick(event) {
    onNavigate?.()
    if (pathname !== '/') return
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (id === 'home') window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    window.history.replaceState(null, '', href)
  }

  return (
    <Link to={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  )
}
