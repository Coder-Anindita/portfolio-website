import { useReveal } from '../../hooks/useReveal.js'

// Fades + slides children in when they enter the viewport.
// `delay` (ms) is used to stagger cards in a grid.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...props }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  )
}
