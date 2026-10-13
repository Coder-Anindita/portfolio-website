import { CodeXml, Database, PanelsTopLeft, Server, Wrench } from 'lucide-react'

// Each category uses a Lucide icon (https://lucide.dev/icons) — import it above.
// Edit the `items` arrays freely — the UI renders whatever is here.
export const skillCategories = [
  {
    title: 'Languages',
    icon: CodeXml,
    items: ['C++', 'C', 'JavaScript', 'SQL'],
  },
  {
    title: 'Frontend',
    icon: PanelsTopLeft,
    items: ['HTML', 'CSS', 'React', 'Tailwind CSS', 'React Router'],
  },
  {
    title: 'Backend',
    icon: Server,
    items: ['Node.js', 'Express', 'REST APIs', 'Socket.IO', 'WebRTC', 'Authentication (JWT)'],
  },
  {
    title: 'Databases',
    icon: Database,
    items: ['MongoDB', 'SQL'],
  },
  {
    title: 'Tools & Platforms',
    icon: Wrench,
    items: ['Git', 'GitHub', 'k6', 'Postman', 'Render', 'Vercel'],
  },
]
