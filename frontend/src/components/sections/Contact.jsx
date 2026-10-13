import { MapPin } from 'lucide-react'
import { profile } from '../../data/profile.js'
import { socials } from '../../lib/socials.js'
import ContactForm from '../contact/ContactForm.jsx'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's work together"
      description="Have a project, an opportunity or just a question? Send me a message — I'm always happy to talk."
      className="border-t border-line bg-white"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
        <Reveal className="min-w-0">
          <ul className="space-y-3">
            {socials.map(({ label, href, icon: Icon, handle }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-4 rounded-xl border border-line bg-paper px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white hover:shadow-sm"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-ink shadow-sm transition-colors group-hover:text-accent">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink">{label}</span>
                    <span className="block truncate text-sm text-subtle">{handle}</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="flex items-center gap-4 rounded-xl border border-line bg-paper px-4 py-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-ink shadow-sm">
                <MapPin size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-medium text-ink">Location</span>
                <span className="block text-sm text-subtle">{profile.location}</span>
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={100} className="min-w-0">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  )
}
