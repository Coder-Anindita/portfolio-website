import { Check, Copy } from 'lucide-react'
import { useRef, useState } from 'react'

// Replaces <pre> in MDX: keeps Shiki's highlighted markup and adds a copy button.
export default function CodeBlock(props) {
  const preRef = useRef(null)
  const [copied, setCopied] = useState(false)

  async function copy() {
    const text = preRef.current?.innerText ?? ''
    try {
      await navigator.clipboard.writeText(text.replace(/\n$/, ''))
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="group relative">
      <pre ref={preRef} {...props} />
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy code'}
        className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-md border border-line bg-white/90 px-2 py-1 font-sans text-xs text-muted opacity-100 shadow-sm transition-all hover:text-ink focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
      >
        {copied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
