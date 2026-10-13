import { ArrowUpRight, Briefcase } from 'lucide-react'
import { experiences } from '../../data/experience.js'
import Badge from '../ui/Badge.jsx'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'
import Timeline, { TimelineItem } from '../ui/Timeline.jsx'

function ExperienceCard({ item, delay }) {
  const meta = [item.type, item.location].filter(Boolean).join(' · ')
  return (
    <Reveal delay={delay} className="rounded-2xl border border-line bg-white p-6 transition-shadow duration-200 hover:shadow-md md:p-7">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <h3 className="text-lg font-semibold text-ink">{item.role}</h3>
          <p className="mt-1 text-muted">
            {item.companyUrl ? (
              <a
                href={item.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-0.5 font-medium text-accent hover:text-accent-strong"
              >
                {item.company}
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            ) : (
              <span className="font-medium text-ink">{item.company}</span>
            )}
            {meta && <span className="text-subtle"> · {meta}</span>}
          </p>
        </div>
        <p className="shrink-0 font-mono text-sm text-subtle">{item.duration}</p>
      </div>

      <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted md:text-base">
        {item.description.map((point) => (
          <li key={point} className="flex gap-3">
            <span className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {item.technologies?.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
          {item.technologies.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  )
}

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked" className="border-y border-line bg-white">
      <Timeline>
        {experiences.map((item, index) => (
          <TimelineItem key={`${item.company}-${item.role}`} icon={Briefcase}>
            <ExperienceCard item={item} delay={index * 80} />
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  )
}
