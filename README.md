# Anindita Chakraborty — Portfolio & Blog

My personal portfolio and technical blog. It covers my education, experience, skills and projects, and hosts notes and articles on dev and system design.

## Features

- **Single-page portfolio:** Hero, About, Education, Experience, Skills, Projects, Blogs and Contact sections.
- **MDX blog:** write posts as `.mdx` files. Each post gets its own page with reading time, tags, a table of contents and SEO metadata.
- **Rich technical writing:** syntax-highlighted code blocks (with file titles, line highlights and line numbers), tables, callouts, images, YouTube and video embeds.
- **Blog search and tag filters**, kept in the URL so filtered views can be shared.
- **Working contact form** powered by EmailJS.
- **Content kept in data files:** personal details, projects and skills live in `src/data/`, so updating them needs no component changes.
- Responsive, accessible layout with scroll reveal animations.

## Tech stack

| Area | Tools |
| --- | --- |
| Frontend | React 19, Vite, React Router, Tailwind CSS v4 |
| Blog | MDX, remark-gfm, rehype-pretty-code (Shiki), rehype-slug |
| Contact | EmailJS |
| Backend | Node.js, Express 5 |
| Tooling | oxlint |

## Project structure

```
.
├── frontend/                 # React + Vite site
│   ├── public/               # Static files (images, resume, OG image)
│   ├── plugins/blog-meta.js  # Vite plugin that loads post metadata for listings
│   └── src/
│       ├── components/       # Layout, sections, blog, MDX and UI components
│       ├── content/blogs/    # Blog posts (.mdx)
│       ├── data/             # Profile, education, experience, skills, projects, SEO
│       ├── lib/              # Blog loader, EmailJS and social link helpers
│       └── pages/            # Home, Blogs, Blog post, 404
└── backend/                  # Express API
    ├── server.js
    └── routes/api.js         # GET /api/health, POST /api/contact
```

## Getting started

Requires Node.js 20 or later.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # add your EmailJS keys and site URL
npm run dev            # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint with oxlint |

### Backend

```bash
cd backend
npm install
cp .env.example .env   # PORT and CLIENT_URL
npm run dev            # http://localhost:5000
```

The backend has a health check and a contact endpoint that validates and logs submissions. The site's contact form currently sends mail through EmailJS directly, so the backend is not needed to run the site.

## Environment variables

**frontend/.env**

| Variable | Description |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_SITE_URL` | Public URL of the site, used for canonical and Open Graph links |

**backend/.env**

| Variable | Description |
| --- | --- |
| `PORT` | Port the API listens on (default `5000`) |
| `CLIENT_URL` | Origin allowed by CORS (default `http://localhost:5173`) |

## Writing a blog post

1. Create `frontend/src/content/blogs/my-new-post.mdx`. The file name becomes the URL: `/blogs/my-new-post`.
2. Add frontmatter:

   ```md
   ---
   title: "My New Post"
   description: "One-sentence summary shown on cards and in search results."
   date: "2026-10-13"
   image: "/images/blog/my-new-post.png"
   tags:
     - System Design
   draft: false
   ---
   ```

3. Write the post in Markdown or MDX. Put images in `frontend/public/images/blog/`.

The post appears on the home page and on `/blogs` automatically. Set `draft: true` to hide a post from production builds. For a full example of every formatting feature, see `frontend/src/content/blog-templates/how-to-write-a-blog-post.mdx`.

More details on editing content are in [frontend/README.md](frontend/README.md).

## Deployment

The frontend is a single-page app, so the host must serve `index.html` for every route (for example `/blogs/my-post`):

- **Netlify:** add a `_redirects` file with `/* /index.html 200`.
- **Vercel:** add a rewrite from all paths to `/index.html`.

Set `VITE_SITE_URL` to the real domain before building.

## Contact

- Email: [aninditac1912@gmail.com](mailto:aninditac1912@gmail.com)
- LinkedIn: [anindita-chakraborty-dev](https://www.linkedin.com/in/anindita-chakraborty-dev)
- GitHub: [Coder-Anindita](https://github.com/Coder-Anindita)
- LeetCode: [coderanindita](https://leetcode.com/coderanindita)
