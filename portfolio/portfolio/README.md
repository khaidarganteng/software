# Khaidar's Portfolio

Personal portfolio of **Khaidar Sinaan As-Shidqii**, a Software Engineering student at SMK N 1 Wonosobo.
Built with Next.js, React, Tailwind CSS and Framer Motion.

## Sections

- **Home**: introduction with a typing effect and profile card
- **About**: who I am and where I'm heading
- **Tech Stack**: filterable list of tools (Frontend, Backend, Tools)
- **Projects**: screenshots of my work with links to the source code on GitHub
- **Contact**: Instagram, WhatsApp, GitHub, and a message form that opens WhatsApp

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # run the production build
```

## Adding a project

Edit the `PROJECTS` array in `src/app/page.js`:

1. Put screenshots in `public/projects/`.
2. Add an entry with `title`, `badge`, `desc`, `tags`, `images` and `repo` (the GitHub URL).
3. If `repo` is empty, the "View on GitHub" button is hidden automatically.

## Tech

Next.js 16 · React 19 · Tailwind CSS 4 · Framer Motion · Lucide Icons
