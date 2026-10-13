import { ArrowRight, Mail, MapPin } from 'lucide-react'
import { profile } from '../../data/profile.js'
import { socials } from '../../lib/socials.js'
import SectionLink from '../layout/SectionLink.jsx'
import Button from '../ui/Button.jsx'
import ScalableArchitecture from './ScalableArchitecture.jsx'

export default function Hero() {
  return (
    <section id="home" aria-label="Introduction" className="relative overflow-hidden">
      {/* faint dot grid, faded out at the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(#d6d3d1_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)] opacity-60"
      />
      <div className="relative mx-auto grid min-h-[92svh] max-w-6xl items-center gap-14 px-5 pt-28 pb-20 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:pt-24">
        <div>
          <p className="rise mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-muted">
            <MapPin size={13} className="text-accent" aria-hidden="true" />
            Based in {profile.location}
          </p>
          <h1 className="rise text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]" style={{ '--rise-delay': '80ms' }}>
            {profile.name}
          </h1>
          <p className="rise mt-4 text-xl font-medium text-accent sm:text-2xl" style={{ '--rise-delay': '140ms' }}>
            {profile.role}
          </p>
          <p className="rise mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg" style={{ '--rise-delay': '200ms' }}>
            {profile.tagline}
          </p>

          <div className="rise mt-9 flex flex-wrap gap-3" style={{ '--rise-delay': '260ms' }}>
            <Button href={`mailto:${profile.email}`}>
              <Mail size={16} aria-hidden="true" />
              Email Me
            </Button>
            <SectionLink
              id="contact"
              className="group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              Let&apos;s Connect
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </SectionLink>
          </div>

          <ul className="rise mt-10 flex items-center gap-1" style={{ '--rise-delay': '320ms' }} aria-label="Social links">
            {socials.slice(0, 3).map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="grid size-10 place-items-center rounded-full text-muted transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-ink hover:shadow-sm"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex lg:justify-end">
          <ScalableArchitecture />
        </div>
      </div>
    </section>
  )
}
