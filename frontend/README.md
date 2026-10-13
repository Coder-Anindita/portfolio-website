# Portfolio + Blog (frontend)

React 19 + Vite + Tailwind CSS v4, with an MDX blog and an EmailJS contact form.

```bash
npm install
cp .env.example .env   # fill in EmailJS keys + site URL
npm run dev            # http://localhost:5173
npm run build          # production build in dist/
npm run lint
```

## Updating content

Everything personal lives in `src/data/`. No component changes needed.

| What | File |
| --- | --- |
| Name, role, email, social links, resume, hero text | `src/data/profile.js` |
| About text and highlights | `src/data/profile.js` (`about`) |
| Education | `src/data/education.js` |
| Experience | `src/data/experience.js` |
| Skills | `src/data/skills.js` |
| Projects | `src/data/projects.js` (images in `public/images/projects/`) |
| Page titles/descriptions (SEO) | `src/data/seo.js` |
| Resume | replace `public/resume.pdf` |

Search for `YOUR_` to find every placeholder.

## Writing a blog post

1. Create `src/content/blogs/my-new-post.mdx` (the file name becomes the URL: `/blogs/my-new-post`).
2. Add frontmatter:

   ```md
   ---
   title: "My New Post"
   description: "One-sentence summary shown on cards and in search results."
   date: "2026-10-04"
   image: "/images/blog/my-new-post.png"
   tags:
     - React
     - JavaScript
   draft: false   # optional; true hides it from production builds
   ---
   ```

3. Write Markdown/MDX. Put images in `public/images/blog/`.

It appears on the home page and `/blogs` automatically, with reading time, tags and SEO metadata.

Available in every post without imports: `<Callout type="info|tip|warning|danger" title="…">`, `<YouTube id="…" />` and `<Video src="…" />`. Code blocks support `title="file.js"`, line highlights `{2,4-6}` and `showLineNumbers`. See `src/content/blog-templates/how-to-write-a-blog-post.mdx` for every feature.

## Contact form (EmailJS)

1. Create a service and an email template at <https://dashboard.emailjs.com>.
2. In the template, use `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`, and set Reply-To to `{{email}}`.
3. Put the service ID, template ID and public key in `.env` (`VITE_EMAILJS_*`). Restart `npm run dev` after changing `.env`.

## Deploying

This is a single-page app, so the host must serve `index.html` for unknown paths (for example `/blogs/my-post`).
On Netlify, add a `_redirects` rule `/* /index.html 200`. On Vercel, add a rewrite to `/index.html`.
Set `VITE_SITE_URL` to your real domain so canonical and Open Graph URLs are correct.
