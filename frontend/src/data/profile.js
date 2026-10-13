// ─────────────────────────────────────────────────────────────
// Central profile config. Change a value here and it updates
// everywhere (hero, contact, footer, SEO).
// ─────────────────────────────────────────────────────────────
export const profile = {
  name: 'Anindita Chakraborty',
  shortName: 'Anindita',
  role: 'Full Stack Developer',
  tagline: 'Building scalable web applications — from clean, responsive interfaces to the APIs, databases and infrastructure that keep them fast as they grow.',
  email: 'aninditac1912@gmail.com',
  location: 'India',
  github: 'https://github.com/Coder-Anindita',
  linkedin: 'https://www.linkedin.com/in/anindita-chakraborty-dev',
  leetcode: 'https://leetcode.com/coderanindita',
  // Put your CV at frontend/public/resume.pdf (replace the placeholder file).
  resume: '/resume.pdf',
  // Optional: put a photo at frontend/public/images/profile/ and set the path, or leave empty.
  avatar: '',
  // Shows an "Open to opportunities" badge in the hero. Set to false to hide it.
  openToWork: true,
}

export const about = {
  paragraphs: [
    "Hi, I'm Anindita — a full stack developer who enjoys turning ideas into working products. I like owning a feature end to end: designing the interface, building the API, modelling the data and shipping it.",
    "I'm pursuing a B.Tech in Computer Science and Engineering at IIIT Bhubaneswar and currently work as a Full Stack Developer Intern at Samyora, where I load-test and debug the APIs behind an esports SaaS platform.",
    'Most of my work is in the MERN stack — React on the frontend, Node.js and Express on the backend, and MongoDB or SQL for storage — along with real-time features built on WebRTC and Socket.IO. I also enjoy problem solving and practise data structures and algorithms regularly.',
  ],
  // Short "what I work with" highlights. No numbers — just facts you can stand behind.
  highlights: [
    { title: 'Frontend', text: 'Responsive, accessible UIs with React and modern CSS.' },
    { title: 'Backend', text: 'Secure REST APIs with Node.js, Express, MongoDB and JWT.' },
    { title: 'Real-time', text: 'Peer-to-peer video and live updates with WebRTC and Socket.IO.' },
    { title: 'Performance', text: 'Load testing APIs with k6 and tracking down bottlenecks.' },
  ],
}

// Used for canonical URLs / Open Graph. Set VITE_SITE_URL in .env for production.
export const siteUrl = (import.meta.env.VITE_SITE_URL || 'http://localhost:5173').replace(/\/$/, '')
