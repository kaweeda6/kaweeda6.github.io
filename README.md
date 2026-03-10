# Dental Site (Astro + Tailwind)

Modern, fast dental office website built with Astro (SSG + islands) and Tailwind CSS. CMS integration (Decap or Sanity) can be added later.

## Quick start

1. Install dependencies:

   ```bash
   npm i
   ```

2. Run dev server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build && npm run preview
   ```

## Configure

- Set your domain in `astro.config.mjs` under `site` (required for canonical URLs and sitemap).
- Adjust brand colors in `tailwind.config.cjs` if desired.
- Global styles live in `src/styles/global.css`.

## SEO

- Per-page `<title>`/`description` supported via the `Base` layout props.
- `@astrojs/sitemap` auto-generates a sitemap based on routes.
- `robots.txt` lives in `public/robots.txt` (update the `Sitemap:` URL after you set `site`).

## Next steps

- Pages: Services, Doctors, Patients, Blog, Contact, About, Insurance.
- Structured data (JSON-LD) for `Dentist` and `LocalBusiness` on the homepage.
- Contact/appointment form using a HIPAA-capable provider (e.g., Jotform HIPAA, IntakeQ) or a serverless form endpoint.
- CMS: Add Decap CMS (`/admin`) with collections for hours, doctors, services, testimonials, blog.

