import { about, profile } from '../../data/profile.js'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="A little about me" className="border-t border-line bg-white">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
          {profile.avatar && (
            <img
              src={profile.avatar}
              alt={`Portrait of ${profile.name}`}
              width="112"
              height="112"
              loading="lazy"
              className="mb-2 size-28 rounded-2xl border border-line object-cover"
            />
          )}
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Reveal>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {about.highlights.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 70}>
              <div className="h-full rounded-xl border border-line bg-paper px-5 py-4 transition-colors duration-200 hover:border-zinc-300">
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
