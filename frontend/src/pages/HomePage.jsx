import { useLocation } from 'react-router-dom'
import About from '../components/sections/About.jsx'
import BlogPreview from '../components/sections/BlogPreview.jsx'
import Contact from '../components/sections/Contact.jsx'
import Education from '../components/sections/Education.jsx'
import Experience from '../components/sections/Experience.jsx'
import Hero from '../components/sections/Hero.jsx'
import Projects from '../components/sections/Projects.jsx'
import Skills from '../components/sections/Skills.jsx'
import Seo from '../components/ui/Seo.jsx'
import { pageMeta } from '../data/seo.js'

export default function HomePage() {
  const { hash } = useLocation()
  const key = hash.slice(1)
  const meta = pageMeta[key] || pageMeta.home
  return (
    <>
      <Seo title={meta.title} description={meta.description} path={pageMeta[key] ? `/#${key}` : '/'} />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Projects />
      <BlogPreview />
      <Contact />
    </>
  )
}
