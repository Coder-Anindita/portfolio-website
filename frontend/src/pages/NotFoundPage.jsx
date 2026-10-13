import { ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button.jsx'

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-6xl flex-col items-start justify-center px-5 pt-28 pb-20 sm:px-8">
      <title>Page not found</title>
      <meta name="robots" content="noindex" />
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-lg text-muted">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Button to="/" className="mt-8">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to home
      </Button>
    </section>
  )
}
