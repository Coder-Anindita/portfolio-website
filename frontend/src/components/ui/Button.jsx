import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

const sizes = {
  md: 'px-5 py-2.5',
  sm: 'px-4 py-2',
}

const variants = {
  primary: 'bg-ink text-white hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md',
  accent: 'bg-accent text-white hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-md',
  secondary:
    'border border-line bg-white text-ink hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm',
  ghost: 'text-muted hover:bg-zinc-100 hover:text-ink',
}

// Renders a <Link> for internal routes, <a> for external/hash/mailto, or <button>.
export default function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...props }) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
