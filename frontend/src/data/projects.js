// To add a project: copy an object, edit it, and drop its screenshot in
// frontend/public/images/projects/. Leave `liveUrl` empty to hide the demo button.
export const projects = [
  {
    name: 'Talky — Real-Time Video Calling',
    image: '/images/projects/Talky.png',
    description: 'A peer-to-peer video conferencing platform using WebRTC for direct media streaming and Socket.IO for signaling — with SDP/ICE negotiation, STUN-based NAT traversal, screen sharing, pre-join preview and meeting history.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'WebRTC', 'Socket.IO'],
    githubUrl: 'https://github.com/Coder-Anindita/talky-video-call',
    liveUrl: 'https://talkyfrontend.onrender.com',
  },
  {
    name: 'ConvoGPT — AI Chat Application',
    image: '/images/projects/convogpt.svg',
    description: "An AI chat app powered by OpenAI's GPT-4o-mini with multi-thread conversations, a modular REST backend, React Context state, Markdown rendering with code highlighting and a real-time typing animation.",
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API'],
    githubUrl: 'https://github.com/Coder-Anindita/ai-chat-platform',
    liveUrl: '',
  },
  {
    name: 'Pocket — Personal Expense Tracker',
    image: '/images/projects/Pocket.png',
    description: 'A full-stack personal finance app to manage income, categorize expenses and track savings — with JWT-secured CRUD APIs, Cloudinary profile uploads and Chart.js dashboards.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Chart.js', 'Cloudinary'],
    githubUrl: 'https://github.com/Coder-Anindita/Pocket',
    liveUrl: 'https://pocket-green.vercel.app/',
  },
  {
    name: 'Personal Portfolio & Blog',
    image: '/images/projects/PersonalBlog.png',
    description: 'This website — a portfolio with a Markdown/MDX technical blog, syntax-highlighted code, tag filtering and an EmailJS contact form.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'MDX', 'Express'],
    githubUrl: 'https://github.com/Coder-Anindita',
    liveUrl: '',
  },
]
