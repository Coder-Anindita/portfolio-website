import Reveal from './Reveal.jsx'

export function SectionHeading({ eyebrow, title, description, id }) {
  return (
    <Reveal className="mb-10 max-w-2xl md:mb-14">
      {eyebrow && (
        <p className="mb-3 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{description}</p>}
    </Reveal>
  )
}

// Standard page section: consistent spacing, max width and an accessible label.
export default function Section({ id, eyebrow, title, description, className = '', children }) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={`py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id={headingId} eyebrow={eyebrow} title={title} description={description} />
        {children}
      </div>
    </section>
  )
}
