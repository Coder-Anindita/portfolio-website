import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/projects.js'
import Badge from '../ui/Badge.jsx'
import { GitHubIcon } from '../ui/BrandIcons.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'

function ProjectCard({ project, delay }) {
  return (
    <Reveal as="article" delay={delay} className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[16/10] overflow-hidden border-b border-line bg-zinc-100">
        <img
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-ink">{project.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {project.liveUrl && (
            <Button href={project.liveUrl} variant="primary" size="sm" aria-label={`Live demo of ${project.name}`}>
              Live Demo
              <ArrowUpRight size={15} aria-hidden="true" />
            </Button>
          )}
          {project.githubUrl && (
            <Button href={project.githubUrl} variant="secondary" size="sm" aria-label={`Source code of ${project.name} on GitHub`}>
              <GitHubIcon size={15} />
              GitHub
            </Button>
          )}
        </div>
      </div>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Things I've built" description="A selection of projects I've designed and developed." className="border-y border-line bg-white">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} delay={(index % 3) * 90} />
        ))}
      </div>
    </Section>
  )
}
