import { CircleAlert, Info, Lightbulb, TriangleAlert } from 'lucide-react'

const variants = {
  info: { icon: Info, label: 'Note', classes: 'border-sky-200 bg-sky-50/70 text-sky-950', iconClass: 'text-sky-600' },
  tip: { icon: Lightbulb, label: 'Tip', classes: 'border-emerald-200 bg-emerald-50/70 text-emerald-950', iconClass: 'text-emerald-600' },
  warning: { icon: TriangleAlert, label: 'Warning', classes: 'border-amber-200 bg-amber-50/70 text-amber-950', iconClass: 'text-amber-600' },
  danger: { icon: CircleAlert, label: 'Important', classes: 'border-rose-200 bg-rose-50/70 text-rose-950', iconClass: 'text-rose-600' },
}

// Usage in MDX:  <Callout type="tip" title="Optional title">Text…</Callout>
export default function Callout({ type = 'info', title, children }) {
  const { icon: Icon, label, classes, iconClass } = variants[type] || variants.info
  return (
    <aside className={`not-prose my-7 flex gap-3 rounded-xl border px-4 py-3.5 text-[0.95rem] leading-relaxed ${classes}`}>
      <Icon size={18} className={`mt-0.5 shrink-0 ${iconClass}`} aria-hidden="true" />
      <div className="min-w-0 [&_a]:underline [&_code]:rounded [&_code]:bg-white/70 [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.85em] [&_p+p]:mt-2">
        <p className="mb-0.5 font-semibold">{title || label}</p>
        {children}
      </div>
    </aside>
  )
}
