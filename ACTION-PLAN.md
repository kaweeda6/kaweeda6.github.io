# Thrive Dental — SEO Action Plan
**Generated:** 2026-03-12
**Overall Score:** 72/100

---

## 🔴 CRITICAL — Fix Before Next Deploy

### C1 — Add `noIndex` to ServiceLocationPage.astro
**Impact:** Stops ~65 thin pages from being indexed | **Effort:** 5 min
**File:** `src/layouts/ServiceLocationPage.astro`, line 91
```astro
<!-- Change this: -->
<Base title={title} description={description}>
<!-- To this: -->
<Base title={title} description={description} noIndex={true}>
```

### C2 — Fix Dr. Saleh Credential Error (DDS → DMD)
**Impact:** Factual error on YMYL health page | **Effort:** 2 min
**File:** `src/pages/doctors/abanob-saleh.astro`, line 22
Change `"Dr. Abanob Saleh, DDS"` to `"Dr. Abanob Saleh, DMD"` in the title and any schema block.

### C3 — Fix Doctor Schema `@type: Physician` → `@type: Person`
**Impact:** Prevents Google from misclassifying doctors as businesses | **Effort:** 30 min
**Files:** `src/pages/doctors/yelena-mikhaylova.astro`, `alla-hart.astro`, `abanob-saleh.astro`
- Change `'@type': 'Physician'` to `'@type': 'Person'` in each Block A schema
- Remove the second `@type: Dentist` block entirely (incorrectly applies a LocalBusiness type to a person)
- Consolidate credential properties into the `Person` block

### C4 — Verify or Fix Doctor Schema Image URLs
**Impact:** Prevents 404 schema images suppressing rich results | **Effort:** 30 min
Schema references `/team/yelena-mikhaylova.jpg` etc. — these must exist as static files.
Either copy processed doctor images to `public/team/` as static assets, or update schema image values to the actual Astro-processed `/_astro/` paths.

### C5 — Verify `/dist/services/` Build Output Exists
**Impact:** All service page URLs may be 404ing in production | **Effort:** 10 min
```bash
npm run build && ls dist/services/dental-implants/
```

---

## 🟠 HIGH — Fix This Week

### H1 — Fix Doctor Redirects to Point to Individual Profiles
**File:** `public/_redirects`
```
/meet-dr-abanob-saleh       /doctors/abanob-saleh       301!
/meet-dr-alla-hart          /doctors/alla-hart           301!
/meet-dr-yelena-mikhaylova  /doctors/yelena-mikhaylova   301!
```

### H2 — Fix `ratingValue` and `reviewCount` to Numbers
**Files:** `src/pages/index.astro`, `src/layouts/ServicePage.astro`, `src/layouts/NeighborhoodPage.astro`
```js
// Wrong:
ratingValue: '4.9', reviewCount: '500'
// Right:
ratingValue: 4.9, reviewCount: 500
```

### H3 — Trim Meta Descriptions Over 155 Characters
Remove appended phone numbers from all meta descriptions. Phone numbers are never clickable from SERPs.

| Page | File | Action |
|---|---|---|
| Dr. Mikhaylova (216 chars) | `doctors/yelena-mikhaylova.astro` | Remove phone + trim to 155 |
| Services index (181 chars) | `services/index.astro` | Remove last sentence |
| Dentist Flushing (180 chars) | `dentist-flushing-ny.astro` | Remove phone |
| Blog index (172 chars) | `blog/index.astro` | Trim after "Queens NY." |
| Dental Implants (170 chars) | `services/dental-implants.astro` | Remove phone |
| Invisalign (163 chars) | `services/invisalign.astro` | Remove phone |

### H4 — Fix Title Tags Over 60 Characters

| Page | Fix |
|---|---|
| Dr. Mikhaylova (71 chars) | `Dr. Yelena Mikhaylova, DDS \| Bayside NY Dentist` |
| Dr. Saleh (71 chars) | `Dr. Abanob Saleh, DMD \| Bayside NY Dentist` |
| Dentist Flushing (61 chars) | `Dentist Near Flushing NY \| Thrive Dental Bayside` |
| Dr. Hart (68 chars) | `Dr. Alla Hart, DDS \| 30+ Years \| Bayside Dentist` |

### H5 — Compress Images in `/public/results/` and `/public/office/`
- Move any images referenced by pages into `src/assets/` so Astro processes them
- Delete any originals not referenced by any page
- Compress `public/office/hero-poster.webp` from 148 KB to under 75 KB (1200px wide, quality 75)

### H6 — Remove "Board-Certified" From Dental Implants Meta Description
Replace with "Licensed and credentialed team" in `src/pages/services/dental-implants.astro` until a specific board certification is documented on doctor profiles.

### H7 — Move Healthgrades `sameAs` to Dr. Mikhaylova's Person Schema
Remove `https://www.healthgrades.com/dentist/dr-yelena-mikhaylova` from the practice `Dentist` entity `sameAs` and add it to Dr. Mikhaylova's `Person` schema `sameAs` instead.
**Files:** `src/pages/index.astro`, `src/layouts/ServicePage.astro`, `src/layouts/NeighborhoodPage.astro`, `src/pages/doctors/yelena-mikhaylova.astro`

### H8 — Consolidate or Redirect Duplicate Periodontics Pages
1. Pick canonical URL (recommend `/services/periodontal-treatments`)
2. Add `_redirects` entry: `/services/periodontics → /services/periodontal-treatments 301!`
3. Update all internal links to the canonical URL

---

## 🟡 MEDIUM — Fix This Month

### M1 — Add Noindex to Privacy Page
**File:** `src/pages/privacy.astro` — Add `noIndex={true}` to the `<Base>` call.

### M2 — Fix Sitemap `lastmod` for Blog Posts
**File:** `astro.config.mjs`
Use the post's real `updatedDate` frontmatter for blog post entries:
```js
const isPost = item.url.includes('/blog/');
const lastmod = isPost && item.data?.updatedDate
  ? new Date(item.data.updatedDate).toISOString().split('T')[0]
  : buildDate;
```

### M3 — Fix Homepage Sitemap URL vs. Canonical Mismatch
Normalize the homepage sitemap entry to match its canonical (with trailing slash): `https://www.thrivedentalny.com/`.

### M4 — Add Subheadings to Doctor Profile Pages
Add H2 sections to each profile: "Education & Training," "Areas of Focus," "About Dr. [Name]"

### M5 — Add `alumniOf` Schema to Dr. Hart and Dr. Saleh
**Files:** `src/pages/doctors/alla-hart.astro`, `src/pages/doctors/abanob-saleh.astro`
Use the same `alumniOf` structure already in `yelena-mikhaylova.astro`.
- Dr. Hart: NYU College of Dentistry + Columbia University GPR
- Dr. Saleh: NYU School of Dentistry + Northport VA Medical Center

### M6 — Add `BreadcrumbList` to Doctor Profile Pages
3-item breadcrumb: Home → Our Doctors → Dr. [Name]

### M7 — Add `isPartOf` to BlogPosting Schema
**File:** `src/layouts/BlogPost.astro`
```json
"isPartOf": { "@type": "WebSite", "@id": "https://www.thrivedentalny.com/#website" }
```

### M8 — Increase Unique Content on Neighborhood Pages
Each page needs 150–200 words of genuinely unique content. Suggestions:
- Transit/access specifics from that neighborhood
- Which services are most commonly sought by patients from that area
- One community-specific sentence about local context

### M9 — Add Starting Cost to Dental Implants Service Page
**File:** `src/pages/services/dental-implants.astro`
Add callout: "Dental implants at Thrive Dental start from $3,500. See our full cost breakdown →" with a link to the blog post.

### M10 — Add Invisalign Teen Section to Service Page
**File:** `src/pages/services/invisalign.astro`
Add a 100-word section covering teen-specific features (compliance indicators, replacement aligners, eruption compensation).

### M11 — Scope Preconnect Hints to Relevant Layouts Only
**File:** `src/layouts/Base.astro`
Move `preconnect` for Maps and NexHealth to `NeighborhoodPage.astro` and `ServiceLocationPage.astro` via `<slot name="head">`.

### M12 — Pre-Compress Large Source Assets
Compress these before they enter the Astro pipeline:
- `src/assets/team/abanob-saleh.jpg` (5.9 MB → under 1 MB)
- `src/assets/office/dr_mik_looking_xray.jpg` (4.6 MB → under 1 MB)
- `src/assets/office/dr_mik_looking_dentures.jpg` (4.2 MB → under 1 MB)
- `src/assets/office/dr_mik_showing_denturess.jpg` (3.6 MB → under 1 MB)
- `src/assets/office/thrivedental-2386.jpg` (5.9 MB → under 1 MB)
- `src/assets/services/emergency.jpg` (3.3 MB → ~140 KB to match peers)

### M13 — Move `reviewCount` to a Shared Constant
Create `src/config/site.ts` with `REVIEW_COUNT = 500`, used in `index.astro`, `ServicePage.astro`, and `NeighborhoodPage.astro`.

---

## 🟢 LOW — Backlog

### L1 — Remove Ineffective Meta Tag From Base.astro
**File:** `src/layouts/Base.astro:74` — Remove `<meta http-equiv="X-Content-Type-Options" content="nosniff">`.

### L2 — Verify IndexNow Key File Exists
Check that `dist/b7e3f94a2d5c8e1f6b9a3d7e2c5f8a1b.txt` is served at the URL in `robots.txt:42`.

### L3 — Remove `priority` and `changefreq` from Sitemap
**File:** `astro.config.mjs` — Google ignores both. Simplifies the serializer.

### L4 — Strip Unused XML Namespaces from Sitemap
`sitemap-0.xml` declares news, xhtml, image, and video namespaces not in use.

### L5 — Add Per-Page OG Images for Service and Blog Pages
Pass a page-specific `ogImage` prop through `ServicePage.astro` and `BlogPost.astro`.

### L6 — Add `MedicalProcedure` Schema to High-Value Service Pages
Target: `/services/dental-implants`, `/services/invisalign`, `/services/root-canal-therapy`

### L7 — Migrate CSP to Hash-Based Instead of `unsafe-inline`
Replace `script-src 'self' 'unsafe-inline'` with a nonce or hash-based approach.

### L8 — Implement Google Maps Facade
Replace Maps iframe with static image + click-to-load on neighborhood and service-location pages.

### L9 — Add Structured Credential Tables to Doctor Profiles (HTML)
Visible HTML credential tables (not just schema) — degree, institution, residency, certifications.

### L10 — Update Doctor Profile Image Alt Text
`alt={doc.name}` → `"Dr. Alla Hart, DDS — General and Cosmetic Dentist at Thrive Dental in Bayside, Queens NY"`

### L11 — Add Freshness Disclosure to Blog Posts
Add "Last updated: [month year]" within the article body of the main blog posts.

### L12 — Update `dayOfWeek` in Schema to Full URLs
Change `"Tuesday"` to `"https://schema.org/Tuesday"` in all `openingHoursSpecification` blocks.

### L13 — Review `/why-thrive` and `/testimonials` for Thin Content
If either page is under ~300 words of substantive content, expand or add `noIndex={true}`.

### L14 — Add AVIF Format to Astro Image Config
`format: 'avif'` in the image service configuration for 30–50% additional size reduction.

---

## Summary

| Priority | Count | Est. Effort |
|---|---|---|
| 🔴 Critical | 5 | ~1.5 hours |
| 🟠 High | 8 | ~4 hours |
| 🟡 Medium | 13 | ~1–2 days |
| 🟢 Low | 14 | Backlog |

**Fixing Critical + High items alone should move the overall score from 72 → ~83/100.**
