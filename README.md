# Rishi Thakor portfolio

Next.js App Router portfolio. Page content is kept outside the JSX in the portfolio data model and accessed through the repository/controller layers, so the views can use either the bundled data or the backend API.

## Run locally

```bash
npm install
npm run dev
```

## Connect a backend

Set `PORTFOLIO_API_URL` to the backend base URL. The app requests `GET <PORTFOLIO_API_URL>/portfolio` and expects this JSON shape:

```json
{
  "portfolio": {
    "name": "Rishi Thakor",
    "role": "Independent designer & developer",
    "location": "Remote-first, worldwide",
    "email": "hello@example.com",
    "headline": "Thoughtful digital work, from first sketch to launch.",
    "introduction": "A short introduction.",
    "availability": "Available for select projects"
  },
  "services": [
    {
      "slug": "web-development",
      "number": "01",
      "name": "Web Development",
      "shortName": "Web",
      "description": "A short service description.",
      "intro": "The service introduction.",
      "deliverables": ["Discovery", "Design", "Development"],
      "accent": "#a65b3c"
    }
  ],
  "experience": [
    {
      "period": "Oct 2026 — Now",
      "role": "Independent freelancer",
      "organization": "Working for myself",
      "details": ["A description of the work."]
    }
  ],
  "education": {
    "period": "Jul 2022 — May 2026",
    "qualification": "B.Tech, Computer Science",
    "institution": "University name",
    "description": "Education details."
  }
}
```

With no API URL set, the app uses the typed local data in `src/models/portfolio.ts`. Pages are rendered dynamically so setting `PORTFOLIO_API_URL` at runtime makes fresh backend data available on the next request. Invalid API responses and failed requests raise explicit errors instead of silently rendering incomplete data.

## Structure

- `src/app`: App Router pages, layout, and global styles.
- `src/components`: Reusable layout, home, service, and UI components with colocated SCSS modules.
- `src/controllers`: Page-level data lookup and composition.
- `src/data`: Backend-ready data repository.
- `src/models`: Content types and local seed content.
- `src/views`: Page view composition.

The color theme preference is stored in browser local storage. Route links use the custom double-door transition overlay with normal App Router navigation; browser back/forward and reduced-motion preferences are supported. Header service links first scroll to their matching service card on the home page.
