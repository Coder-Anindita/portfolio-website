// Vertical timeline used by Education and Experience.
export default function Timeline({ children }) {
  return <ol className="relative space-y-6 border-l border-line pl-0 md:ml-5">{children}</ol>
}

export function TimelineItem({ icon: Icon, children }) {
  return (
    <li className="relative pl-8 md:pl-12">
      <span className="absolute top-6 -left-[17px] grid size-8 place-items-center rounded-full border border-line bg-white text-accent shadow-sm md:top-7">
        <Icon size={15} aria-hidden="true" />
      </span>
      {children}
    </li>
  )
}
