import { skillCategories } from '../../data/skills.js'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'
import TechIcon from '../ui/TechIcon.jsx'

function SkillCard({ category, delay }) {
  const Icon = category.icon
  return (
    <Reveal delay={delay} className="group rounded-2xl border border-line bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
          <Icon size={19} aria-hidden="true" />
        </span>
        <h3 className="font-semibold text-ink">{category.title}</h3>
      </div>
      <ul className="flex flex-wrap gap-2">
        {category.items.map((skill) => (
          <li
            key={skill}
            className="group/skill inline-flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-1.5 text-sm text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white hover:text-ink hover:shadow-sm"
          >
            <TechIcon name={skill} size={15} className="shrink-0 transition-transform duration-200 group-hover/skill:scale-110" />
            {skill}
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="What I work with" description="The languages, frameworks and tools I use to design, build and ship applications.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <SkillCard key={category.title} category={category} delay={(index % 3) * 80} />
        ))}
      </div>
    </Section>
  )
}
