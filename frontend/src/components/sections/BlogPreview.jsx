import { ArrowRight } from 'lucide-react'
import { usePostStats } from '../../hooks/usePostStats.js'
import { posts } from '../../lib/blog.js'
import BlogCard from '../blog/BlogCard.jsx'
import ComingSoon from '../blog/ComingSoon.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'

const PREVIEW_COUNT = 3
const latest = posts.slice(0, PREVIEW_COUNT)
const latestSlugs = latest.map((post) => post.slug)

export default function BlogPreview() {
  const stats = usePostStats(latestSlugs)
  return (
    <Section id="blogs" eyebrow="Blog" title="Latest writing" description="Notes, tutorials and lessons from things I build and learn.">
      {latest.length === 0 ? (
        <Reveal>
          <ComingSoon />
        </Reveal>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((post, index) => (
              <BlogCard key={post.slug} post={post} stats={stats[post.slug]} delay={index * 90} />
            ))}
          </div>
          <Reveal className="mt-12 flex justify-center">
            <Button to="/blogs" variant="secondary" className="group">
              View all articles
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </Reveal>
        </>
      )}
    </Section>
  )
}
