import { navLinks } from '../../data/navigation.js'
import { profile } from '../../data/profile.js'
import { socials } from '../../lib/socials.js'
import SectionLink from './SectionLink.jsx'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <p className="font-semibold tracking-tight text-ink">{profile.name}</p>
            <p className="mt-1 text-sm text-muted">{profile.role} · {profile.location}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <SectionLink id={link.id} className="text-sm text-muted transition-colors hover:text-ink">
                    {link.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-1" aria-label="Social links">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="grid size-9 place-items-center rounded-full text-muted transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-100 hover:text-ink"
                >
                  <Icon size={17} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-xs text-subtle">
          © {year} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
