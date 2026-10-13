import { FileText, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '../../data/navigation.js'
import { profile } from '../../data/profile.js'
import { useActiveSection } from '../../hooks/useActiveSection.js'
import SectionLink from './SectionLink.jsx'

const sectionIds = navLinks.map((link) => link.id)

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const activeSection = useActiveSection(sectionIds, isHome)
  const active = isHome ? activeSection : pathname.startsWith('/blogs') ? 'blogs' : ''
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on route change…
  const [menuPath, setMenuPath] = useState(pathname)
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setOpen(false)
  }

  // …and on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const linkClass = (id) =>
    `relative rounded-full px-3 py-1.5 text-sm transition-colors duration-200 ${
      active === id ? 'text-ink font-medium bg-zinc-200/80' : 'text-muted hover:text-ink'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-line/80 bg-paper/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only rounded-md bg-ink px-3 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" aria-label={`${profile.name} — home`} className="group font-display text-[1.7rem] leading-none font-bold tracking-tight text-ink italic">
          {profile.shortName}
          <span className="text-accent transition-colors duration-200 group-hover:text-ink">.</span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <SectionLink id={link.id} className={linkClass(link.id)} aria-current={active === link.id ? 'true' : undefined}>
                {link.label}
              </SectionLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm sm:inline-flex"
          >
            <FileText size={15} aria-hidden="true" />
            Resume
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-zinc-100 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? 'max-h-[34rem] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
        inert={!open}
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 pt-2 pb-6 sm:px-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <SectionLink
                id={link.id}
                onNavigate={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-base ${
                  active === link.id ? 'bg-zinc-200/80 font-medium text-ink' : 'text-muted hover:bg-zinc-50 hover:text-ink'
                }`}
              >
                {link.label}
              </SectionLink>
            </li>
          ))}
          <li className="mt-2 sm:hidden">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-base font-medium text-white"
            >
              <FileText size={17} aria-hidden="true" />
              View Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
