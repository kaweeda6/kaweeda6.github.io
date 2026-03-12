# Thrive Dental — Full SEO Audit Report
**Date:** 2026-03-12
**Site:** thrivedentalny.com
**Pages audited:** ~119 source pages / 67 indexed URLs

---

## Overall SEO Health Score: 72 / 100

| Category | Weight | Score | Status |
|---|---|---|---|
| Technical SEO | 25% | 71 | ⚠️ Issues |
| Content Quality | 25% | 74 | ⚠️ Issues |
| On-Page SEO | 20% | 78 | ✅ Pass |
| Schema / Structured Data | 10% | 75 | ⚠️ Issues |
| Performance / CWV | 10% | 68 | ⚠️ Issues |
| Images | 5% | 45 | 🔴 Critical |
| AI Search Readiness | 5% | 68 | ⚠️ Issues |

---

## Executive Summary

Thrive Dental has a solid SEO foundation — clean URL architecture, self-hosted fonts, well-structured blog content, proper canonical tags, a functioning sitemap, and good on-page keyword targeting. The blog posts are genuinely strong by 2025/2026 QRG standards and are AI citation-ready.

However, there are **5 critical issues** that need immediate attention, and a cluster of high-priority fixes limiting the site's ability to rank for its highest-value service and local keywords.

### Top 5 Critical Issues
1. **~65 service+location pages are incorrectly indexed** — `ServiceLocationPage.astro` never passes `noIndex={true}` to `Base.astro`, so thin combo pages (e.g. `/dental-implants-flushing-ny`) are fully crawlable and indexable despite being excluded from the sitemap. This is the single most urgent fix.
2. **100+ MB of unoptimized raw JPEGs in `/public/`** — `/public/results/` and `/public/office/` contain 25+ images at 5–6.7 MB each, served directly to users, bypassing Astro's image pipeline entirely.
3. **Dr. Saleh's title tag says "DDS" — his credential is DMD** — A factual error on a YMYL health page.
4. **Doctor pages use `@type: Physician` (a LocalBusiness subtype) to describe a person** — Should be `@type: Person`. Schema errors on all 3 doctor profiles.
5. **Schema `image` URLs on doctor pages will 404** — Images reference `/team/*.jpg` paths that don't exist as static assets.

### Top 5 Quick Wins
1. One-line fix in `ServiceLocationPage.astro` resolves the noindex issue for ~65 pages
2. Trim phone numbers from 6 meta descriptions that exceed 155 chars — instant SERP CTR improvement
3. Fix doctor redirects in `_redirects` to go to individual profiles, not the hub
4. Change `ratingValue: '4.9'` and `reviewCount: '500'` from strings to numbers in all Dentist schema blocks
5. Remove the ineffective `<meta http-equiv="X-Content-Type-Options">` tag from `Base.astro` (it's a response header, not an HTML meta tag)

---

## 1. Technical SEO

**Score: 71/100**

### 🔴 Critical

#### CRIT-T1: Service+Location Pages Not Noindex
**File:** `src/layouts/ServiceLocationPage.astro`, line 91

`ServiceLocationPage.astro` calls `<Base title={title} description={description}>` without passing `noIndex={true}`. The `noindex` conditional in `Base.astro` (lines 48–51) is never triggered. Every `/dental-implants-*-ny/`, `/invisalign-*-ny/`, `/cosmetic-dentist-*-ny/`, `/emergency-dentist-*-ny/`, `/porcelain-veneers-*-ny/`, `/teeth-whitening-*-ny/` page (~65 total) outputs:

```html
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">
```

The sitemap correctly excludes these, but the page-level signal is permissive. Google follows the more permissive signal — these pages are being indexed.

**Fix:** `<Base title={title} description={description} noIndex={true}>`

#### CRIT-T2: Build Integrity — `/dist/services/` Directory May Be Missing
`/dist/services/*/index.html` files were not found during audit. If this represents the production build, every service page URL returns 404. Run a fresh `astro build` and verify `/dist/services/dental-implants/index.html` exists before deploying.

### ⚠️ High

#### HIGH-T1: Periodontics + Periodontal-Treatments Are Duplicate Pages
`/services/periodontics` and `/services/periodontal-treatments` both exist in the sitemap, both cover the same topic, and `periodontics.astro` cross-links to `periodontal-treatments` as a related service. This splits ranking signals.

**Fix:** Pick one canonical URL, 301 redirect the other, and add a canonical tag pointing to the winner.

#### HIGH-T2: Sitemap `lastmod` Stamps Are All Today's Build Date
`astro.config.mjs` uses `new Date()` in `serialize()`, so every page shows `2026-03-12T00:00:00.000Z`. Google has stated this causes it to ignore `lastmod` entirely for the entire sitemap.

**Fix:** Use `frontmatter.updatedDate` for blog posts (already defined). Accept a static content-date for service pages or omit `lastmod` for those.

#### HIGH-T3: CSP `script-src` Allows `unsafe-inline`
`dist/_headers` line 7: `script-src 'self' 'unsafe-inline'` negates XSS protection. Not a ranking factor but a security posture issue flagged by Mozilla Observatory.

#### HIGH-T4: Doctor Redirects Point to Hub, Not Individual Profiles
`dist/_redirects` lines 30–34: `/meet-dr-*` redirects land on `/doctors` instead of `/doctors/abanob-saleh` etc. Backlinks and saved bookmarks lose link equity.

**Fix:**
```
/meet-dr-abanob-saleh      /doctors/abanob-saleh      301!
/meet-dr-alla-hart         /doctors/alla-hart          301!
/meet-dr-yelena-mikhaylova /doctors/yelena-mikhaylova  301!
```

### ⚠️ Medium

#### MED-T1: Privacy Page Is Not Noindex
`/privacy` is excluded from sitemap but has no `noindex` meta tag. Add `noIndex={true}` to the privacy page's `<Base>` call.

#### MED-T2: Homepage Sitemap URL vs. Canonical Mismatch
Sitemap emits `https://www.thrivedentalny.com` (no trailing slash). Canonical in HTML is `https://www.thrivedentalny.com/` (with slash). These must match.

#### MED-T3: Preconnect Hints on All Pages Including Blog/Privacy
`Base.astro` adds `preconnect` to `maps.googleapis.com`, `maps.gstatic.com`, and `app.nexhealth.com` on every page. Pages without a map or booking widget incur unnecessary TCP round-trips.

#### MED-T4: Google Maps Iframe Has No Facade
Neighborhood and service-location pages load a Maps embed eagerly. A static map image with click-to-load would eliminate the third-party JS load on initial render.

### ℹ️ Low

- **LOW-T1:** Verify IndexNow key file exists at `dist/b7e3f94a2d5c8e1f6b9a3d7e2c5f8a1b.txt`
- **LOW-T2:** `viewport-fit=cover` has no effect without `env(safe-area-inset-*)` CSS
- **LOW-T3:** `payment=()` in Permissions-Policy blocks future Google Pay / Apple Pay
- **LOW-T4:** `<meta http-equiv="X-Content-Type-Options">` in `Base.astro:74` is a response header, not an HTML meta tag — remove it (the correct header is already in `_headers`)
- **LOW-T5:** `priority` and `changefreq` in sitemap — Google ignores both; removing them simplifies the serializer
- **LOW-T6:** Unused XML namespaces (news, xhtml, image, video) in `sitemap-0.xml`

---

## 2. Content Quality

**Score: 74/100**

### 🔴 Critical

#### CRIT-C1: Dr. Saleh Title Tag Credential Error
`src/pages/doctors/abanob-saleh.astro` line 22 reads `"Dr. Abanob Saleh, DDS"`. His actual credential is DMD — correctly stated in the page body and schema. Factual error on a YMYL health page.

### ⚠️ High

#### HIGH-C1: Meta Descriptions Exceed 155 Characters on Multiple Key Pages

| Page | Length | Fix |
|---|---|---|
| Dr. Mikhaylova profile | 216 chars | Remove phone + trim |
| Services index | 181 chars | Remove last sentence |
| Flushing neighborhood | 180 chars | Remove phone |
| Blog index | 172 chars | Trim after "Queens NY." |
| Dental Implants service | 170 chars | Remove phone |
| Invisalign service | 163 chars | Remove phone |

Phone numbers in meta descriptions are never clickable from SERPs and consistently push these over the limit.

#### HIGH-C2: "Board-Certified" Claim Without Substantiation
The dental implants meta description says "Board-certified team." No doctor on the site is described as board-certified in their profile. In dentistry, board certification (e.g. ABGD) is a specific verifiable credential. Replace with "licensed and credentialed team" or substantiate the claim.

#### HIGH-C3: Neighborhood Pages Are Thin — ~85 Unique Words Per Page
All 12 indexed neighborhood pages are generated from `NeighborhoodPage.astro` with only 3 unique inputs: a 2–3 sentence blurb, a distance note, and 3 landmarks bullets. Everything else is identical template content.

**Fix:** Add 150–200 words of genuinely unique content per neighborhood page — transit options, neighborhood demographics, or community-specific context.

#### HIGH-C4: Doctor Profiles Are Flat Prose With No Subheadings
None of the 3 doctor profile pages use H2 or H3 headings. Flat prose only — no scannable structure, no AI-extractable section-level facts, no heading signals for secondary keywords.

**Fix:** Add H2 sections: "Education & Training," "Areas of Focus," "About Dr. [Name]"

### ⚠️ Medium

#### MED-C1: Homepage H1 Contains No Geo Keyword
H1 is "Dentistry you'll actually look forward to" — brand voice copy with no location signal. The "Bayside, Queens · Est. 2009" eyebrow is in a `<p>` tag. AI citation systems extract the primary heading without geo context.

#### MED-C2: Invisalign Teen Missing from Service Page
`/services/invisalign` doesn't mention Invisalign Teen despite the blog post covering it. Families searching "Invisalign teen Bayside" land on the service page and find nothing.

#### MED-C3: No Cost Range on Dental Implants Service Page
The blog post has full pricing tables but the service page says nothing about cost. AI systems answering cost queries will bypass the service page. Add a "Starting from $3,500 — full pricing breakdown in our guide" callout.

#### MED-C4: Hardcoded `reviewCount: 500` Will Stale-Date
Static value in `index.astro`, `ServicePage.astro`, and `NeighborhoodPage.astro`. Move to a shared `src/config/site.ts` constant updated in one place.

#### MED-C5: Dr. Saleh Profile Is Significantly Thinner Than Peers
~220 words vs. ~250–280 for the other doctors. No clinical interests, no CE or memberships, no H2 subheadings.

### ℹ️ Low

- Doctor profile image alt text is just the doctor's name — add descriptive context including title and location
- Blog posts would benefit from an explicit "Last updated: [date]" line in the article body
- No ADA/AACD/AAID membership statements on any doctor profile — a key E-E-A-T signal
- `og:image` is the same `og-default.jpg` on every page — per-page images would improve social CTR

---

## 3. On-Page SEO

**Score: 78/100**

### ⚠️ High

#### HIGH-O1: Title Tags Over Character Limit

| Page | Current | Chars | Fix |
|---|---|---|---|
| Dr. Mikhaylova | `Dr. Yelena Mikhaylova, DDS \| Cosmetic & Implant Dentist...` | 71 | `Dr. Yelena Mikhaylova, DDS \| Bayside NY Dentist` |
| Dr. Saleh | `Dr. Abanob Saleh, DDS \| Restorative & Emergency Dentist...` | 71 | `Dr. Abanob Saleh, DMD \| Bayside NY Dentist` |
| Dentist Flushing | `Dentist Near Flushing, NY \| Thrive Dental — Bayside, Queens` | 61 | `Dentist Near Flushing NY \| Thrive Dental Bayside` |
| Dr. Hart | `Dr. Alla Hart, DDS \| Dentist at Thrive Dental — Bayside, Queens NY` | 68 | `Dr. Alla Hart, DDS \| 30+ Years \| Bayside Dentist` |

### ✅ Pass

- Canonical tags: all self-referencing, consistent with `trailingSlash: 'never'`
- OG/Twitter meta: present on all pages with correct values
- H1 structure: clean on service and neighborhood pages
- Internal linking: service pages cross-link to related services and blog posts
- Homepage title: 57 chars, keyword + geo present

---

## 4. Schema / Structured Data

**Score: 75/100**

### Schema Types Present

| Template | Types |
|---|---|
| Homepage | `WebSite`, `Dentist` |
| Service pages | `Dentist`, `BreadcrumbList`, `Service` |
| Neighborhood pages | `Dentist`, `BreadcrumbList` |
| Blog index | `CollectionPage`, `ItemList`, `BreadcrumbList` |
| Blog posts | `BlogPosting`, `BreadcrumbList` |
| Doctor profiles | `Physician`, `Dentist` (both — incorrectly) |

### 🔴 Critical

#### CRIT-S1: `@type: Physician` Is Wrong for an Individual Person
`Physician` extends `MedicalOrganization` extends `LocalBusiness` — it represents a medical practice, not a person. All 3 doctor pages use this type. Google's parser treats these entities as places, not people.

**Fix:** Change to `@type: Person` with `hasOccupation: { @type: Occupation, name: "Dentist" }`.

#### CRIT-S2: Doctor Schema `image` URLs Will 404
Schema references `https://www.thrivedentalny.com/team/yelena-mikhaylova.jpg` etc. Doctor images are in `src/assets/team/` and processed into `/_astro/` hashed paths. Unless static copies exist in `/public/team/`, these URLs return 404.

**Fix:** Either copy images to `public/team/` as static assets, or update schema to reference actual Astro-processed paths.

### ⚠️ High

#### HIGH-S1: `ratingValue` and `reviewCount` Are Strings, Not Numbers
`ratingValue: '4.9'` and `reviewCount: '500'` in `index.astro`, `ServicePage.astro`, `NeighborhoodPage.astro`. Schema.org defines these as `Number` and `Integer`.

**Fix:** Remove the quotes — `ratingValue: 4.9, reviewCount: 500`.

#### HIGH-S2: Second `@type: Dentist` Block on Doctor Pages Misrepresents the Individual
Each doctor page emits a `Dentist` block with a personal name. `Dentist` is a `LocalBusiness` subtype — applying it to a person creates a conflated entity.

**Fix:** Remove the second `Dentist` block and consolidate credential properties into the `Person` block.

#### HIGH-S3: Healthgrades `sameAs` on Practice Entity Points to Individual Doctor Profile
Move `https://www.healthgrades.com/dentist/dr-yelena-mikhaylova` from the practice `Dentist` entity's `sameAs` to Dr. Mikhaylova's `Person` block `sameAs`.

### ⚠️ Medium

- `BreadcrumbList` missing from all 3 doctor profile pages
- `BlogPosting` missing `isPartOf` link to WebSite entity
- `alumniOf` missing from Dr. Hart and Dr. Saleh schemas (data available in prose but not emitted)

### ℹ️ Missing Schema Opportunities

| Schema Type | Priority | Where |
|---|---|---|
| `MedicalProcedure` | High | `/services/dental-implants`, `/services/invisalign`, `/services/root-canal-therapy` |
| `Review` entities | Medium | Homepage `Dentist` block — use existing testimonial quotes |
| `Person` with `hasCredential` | Medium | All doctor profiles (after fixing `@type`) |
| `dayOfWeek` as full URL | Low | Change `"Tuesday"` to `"https://schema.org/Tuesday"` everywhere |

---

## 5. Performance / Core Web Vitals

**Score: 68/100**

### 🔴 Critical

#### CRIT-P1: ~100 MB of Unoptimized Raw JPEGs in `/public/`
`/public/results/` and `/public/office/` contain 25+ images at 5.2–6.7 MB each, served verbatim to users.

**Top offenders:**
- `public/results/thrivedental-2090.jpg` — 6.7 MB
- `public/results/thrivedental-2062.jpg` — 6.2 MB
- `public/office/thrivedental-2386.jpg` — 5.9 MB
- `public/office/hero-2057.jpg` — 5.6 MB

**Fix:** Move referenced images to `src/assets/` so Astro processes them. Delete originals not referenced by any page.

### ⚠️ High

#### HIGH-P1: Hero Poster (`hero-poster.webp`) at 148 KB — LCP Impact
LCP element on homepage. Target is under 75 KB. Re-export at 1200px wide, quality 75, WebP. Reduces LCP by ~70ms on 3G.

#### HIGH-P2: Dual CSS Bundles Loading on Homepage (~167 KB Total)
`before-and-after.DS9hOBkE.css` (80 KB) and `dental-emergency-what-to-do.DjorbyP3.css` (87 KB) both load on the homepage. If both are full Tailwind CSS outputs, this doubles the CSS payload.

#### HIGH-P3: Large Source Assets Going Into Pipeline
`src/assets/team/abanob-saleh.jpg` (5.9 MB) and several office photos at 3.6–4.6 MB. Pre-compress to under 1 MB — output quality is unaffected since Astro resizes to 400–800px.

#### HIGH-P4: `src/assets/services/emergency.jpg` Is 3.3 MB vs. 88–235 KB for All Other Service Images
25× outlier. Re-export to ~140 KB to match peers.

### ⚠️ Medium

- No AVIF format in use — AVIF delivers 30–50% smaller files than WebP
- Marquee images may lack explicit width/height attributes — potential CLS source

### ✅ Pass

- JavaScript bundle: only 2.2 KB
- Font loading: 3 woff2 files self-hosted + preloaded before stylesheets — no Google Fonts CDN calls
- INP risk: low — CSS-based interactions, minimal JS
- CLS risk: low — `<Image>` calls include explicit width/height, fonts preloaded
- Resource hints: preconnect to Maps and NexHealth present
- Prefetch enabled in `astro.config.mjs`

---

## 6. Images

**Score: 45/100**

| Check | Result |
|---|---|
| Alt text on `<Image>` components | ✅ Well-implemented throughout |
| WebP format via pipeline | ✅ All pipeline images output as WebP |
| Explicit width/height on `<Image>` | ✅ Present — CLS protection in place |
| Lazy loading on below-fold images | ✅ Marquee second set uses `loading="lazy"` |
| Images in `public/` (bypass pipeline) | 🔴 25+ images at 5–6.7 MB each |
| Hero poster size | ⚠️ 148 KB — target is under 75 KB |
| AVIF format | ⚠️ Not used — 30–50% size opportunity |
| Per-page OG images | ⚠️ All pages use same `og-default.jpg` |

---

## 7. AI Search Readiness

**Score: 68/100**

| Page Type | Score | Notes |
|---|---|---|
| Blog posts | 85/100 | Excellent — structured data, named sources, price tables, author attribution |
| Service pages | 72/100 | Good structure; lack price ranges and quantitative specifics |
| Doctor profiles | 52/100 | Flat prose, no structured fact blocks, no labeled credential sections |
| Neighborhood pages | 48/100 | No unique verifiable facts per neighborhood |

### Strengths
- Blog posts cite primary sources (ADA, AAID, NIDCR, AAO, PubMed) with real URLs
- Dental implants cost post contains exact price ranges, comparison tables, and named financing options — fully AI Overview-eligible
- "70% of adult orthodontic patients choose Invisalign" is practice-specific original data — exactly what AI systems prioritize for citations
- `BlogPosting` schema with named author, `dateModified`, and `publisher` — all correct

### Gaps
- Doctor profiles have no structured credential tables visible in HTML (only in schema)
- Neighborhood pages lack any neighborhood-specific verifiable facts

---

## Appendix: Key File Reference

| File | Issues |
|---|---|
| `src/layouts/ServiceLocationPage.astro:91` | CRIT-T1 — missing `noIndex={true}` |
| `src/layouts/Base.astro:74` | LOW-T4 — ineffective X-Content-Type-Options meta tag |
| `src/pages/doctors/abanob-saleh.astro:22` | CRIT-C1 — "DDS" should be "DMD" |
| `src/pages/doctors/*.astro` | CRIT-S1, CRIT-S2, HIGH-S2, MED-S1, MED-S3 — schema errors |
| `dist/_redirects:30-34` | HIGH-T4 — doctor redirects go to hub |
| `dist/_headers:7` | HIGH-T3 — CSP `unsafe-inline` |
| `astro.config.mjs:37-38` | HIGH-T2 — build-date lastmod |
| `public/results/` | CRIT-P1 — ~80 MB unoptimized images |
| `public/office/` | CRIT-P1 — ~25 MB unoptimized images |
| `public/office/hero-poster.webp` | HIGH-P1 — 148 KB LCP image |
| `src/assets/services/emergency.jpg` | HIGH-P4 — 3.3 MB outlier |
| `index.astro`, `ServicePage.astro`, `NeighborhoodPage.astro` | HIGH-S1 — string ratingValue/reviewCount |
