// Shown wherever posts are listed while src/content/blogs has no published posts.
export default function ComingSoon() {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
      <p className="font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">Coming soon</p>
      <p className="mt-3 text-lg font-medium text-ink">The first article is on its way.</p>
      <p className="mt-1 text-sm text-muted">Check back soon for notes and articles on dev and system design.</p>
    </div>
  )
}
