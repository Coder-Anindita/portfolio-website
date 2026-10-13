import { Award, GraduationCap } from 'lucide-react'
import { education } from '../../data/education.js'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'
import Timeline, { TimelineItem } from '../ui/Timeline.jsx'

export default function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Where I studied">
      <Timeline>
        {education.map((item, index) => (
          <TimelineItem key={`${item.institution}-${item.degree}`} icon={GraduationCap}>
            <Reveal delay={index * 80} className="rounded-2xl border border-line bg-white p-6 transition-shadow duration-200 hover:shadow-md md:p-7">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-ink">{item.institution}</h3>
                  <p className="mt-1 text-muted">
                    {item.degree}
                    {item.field && <span> · {item.field}</span>}
                  </p>
                </div>
                <p className="shrink-0 font-mono text-sm text-subtle">{item.duration}</p>
              </div>
              {item.grade && (
                <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-strong">
                  <Award size={14} aria-hidden="true" />
                  {item.grade}
                </p>
              )}
              {item.description && <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{item.description}</p>}
            </Reveal>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  )
}
