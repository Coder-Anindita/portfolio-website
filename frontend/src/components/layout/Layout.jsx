import { MDXProvider } from '@mdx-js/react'
import { Outlet } from 'react-router-dom'
import { mdxComponents } from '../mdx/index.jsx'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'
import ScrollManager from './ScrollManager.jsx'

export default function Layout() {
  return (
    <MDXProvider components={mdxComponents}>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
    </MDXProvider>
  )
}
