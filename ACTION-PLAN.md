# SEO Action Plan — Thrive Dental Bayside
**Generated:** 2026-03-11
**Overall Score: 76/100** → Target: 88/100

---

## 🔴 CRITICAL (Fix Immediately)

### 1. Confirm Production Domain & Canonical URLs
**Issue:** If site is deployed to GitHub Pages subdomain, all canonical tags point to the wrong domain. Google will index the wrong URL.
**Fix:**
- Confirm `site` in `astro.config.mjs` is set to `https://www.thrivedentalny.com`
- Ensure DNS points thrivedentalny.com to your host (Netlify recommended for `_headers` support)
- Test: `curl -I https://www.thrivedentalny.com` should return 200, not redirect

### 2. Security Headers (Deploy to Netlify or Add Meta Fallbacks)
**Issue:** `public/_headers` only works on Netlify. GitHub Pages ignores it entirely.
**Fix (Option A — Netlify):** Deploy site to Netlify. Headers file is already correct.
**Fix (Option B — Meta tags):** Add to `Base.astro` `<head>`:
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
```

---

## 🟠 HIGH (Fix Within 1 Week)

### 3. Fix `employee[].@type` Schema
**File:** `src/pages/index.astro`
**Issue:** `employee` array has `@type: 'Dentist'` — `Dentist` is an Organization subtype, not a Person.
**Fix:** Change to `@type: 'Person'` with `jobTitle: 'Dentist'`
```json
{
  "@type": "Person",
  "name": "Dr. ...",
  "jobTitle": "Dentist",
  "url": "https://www.thrivedentalny.com/doctors"
}
```

### 4. Optimize Hero Poster Image
**File:** `public/office/hero-2057.jpg`
**Issue:** Large JPEG served without WebP/AVIF. Hurts LCP score.
**Fix:**
```bash
# Install sharp or use squoosh CLI
npx @squoosh/cli --webp '{"quality":82}' public/office/hero-2057.jpg
```
Then update `index.astro` preload: `as="image" type="image/webp"`
Target: under 120KB

### 5. Shorten Long Title Tags
**Issue:** Two pages exceed 60-char recommended limit:
- `/doctors` — "Meet Our Dentists in Bayside, Queens NY | Thrive Dental Bayside" (62 chars)
**Fix:** "Meet Our Dentists | Thrive Dental Bayside, Queens NY" (53 chars)

### 6. Add `Service` Schema to Service Pages
**File:** `src/layouts/ServicePage.astro`
**Issue:** No `Service` schema — missed rich result opportunity.
**Fix:** Add to the existing JSON-LD block:
```json
{
  "@type": "Service",
  "serviceType": "{serviceName}",
  "provider": { "@id": "https://www.thrivedentalny.com/#dentist" },
  "areaServed": { "@type": "City", "name": "Bayside" }
}
```

### 7. Create `public/llms.txt`
**Issue:** No AI search discovery file. Perplexity, Claude, ChatGPT crawlers have no structured entry point.
**Fix:** Create `/public/llms.txt`:
```
# Thrive Dental Bayside
> A modern dental practice in Bayside, Queens NY offering implants, Invisalign, cosmetic and general dentistry.

## Services
- /services/dental-implants
- /services/invisalign
- /services/cosmetic-dentistry
- /services/general-dentistry
- /services/restorative-dentistry
- /services/emergency-dentistry

## Blog
- /blog/dental-implants-cost-queens-ny
- /blog/invisalign-vs-braces-bayside
- /blog/dental-emergency-what-to-do
- /blog/how-often-dental-cleaning
- /blog/porcelain-veneers-guide
- /blog/gum-disease-signs-treatment

## Locations Served
- /dentist-flushing-ny
- /dentist-douglaston-ny
- /dentist-little-neck-ny
- /dentist-fresh-meadows-ny
- /dentist-oakland-gardens-ny
```

---

## 🟡 MEDIUM (Fix Within 1 Month)

### 8. Migrate Blog Index to Dynamic `Astro.glob()`
**File:** `src/pages/blog/index.astro`
**Issue:** Posts hardcoded in array — new posts require manual index update.
**Fix:**
```astro
---
const posts = await Astro.glob('./*.astro');
// or use content collections if migrating to Astro v3+
---
```

### 9. Add Outbound Citations to Blog Posts
**Issue:** Zero outbound links to authoritative sources. Hurts E-E-A-T.
**Fix:** Add 1–2 citation links per blog post to:
- ADA.org (American Dental Association)
- CDC oral health data
- Peer-reviewed sources (NCBI/PubMed) where relevant

### 10. Add Cross-Links Between Blog Posts and Service Pages
**Issue:** Blog posts don't link to related service pages or other blog posts.
**Fix:** Add "Related Service" CTA at the bottom of each blog post.
- `/blog/dental-implants-cost-queens-ny` → `/services/dental-implants`
- `/blog/porcelain-veneers-guide` → `/services/cosmetic-dentistry`
- etc.

### 11. Add `AggregateRating` Schema
**Issue:** Site has a ReviewsCarousel component but no structured rating data.
**Fix:** Add to `Dentist` schema on homepage:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5",
  "reviewCount": "120",
  "bestRating": "5"
}
```
(Use real review count from Google My Business)

### 12. Differentiate Neighborhood Pages
**Issue:** 5 neighborhood pages share near-identical copy — Google may treat as duplicate/thin.
**Fix:** For each neighborhood, add:
- 1 unique paragraph about that neighborhood/community
- Mention of nearby landmarks or cross-streets
- Unique patient testimonial from that area (if available)

### 13. Add `lastmod` to Sitemap
**File:** `astro.config.mjs`
**Fix:** Sitemap integration supports `lastmod` — add `changefreq` and `lastmod` to frequently updated pages.

---

## 🔵 LOW (Backlog)

### 14. Create Individual Doctor Profile Pages
- `/doctors/dr-[name]` with full bio, credentials, education, specialties
- Improves E-E-A-T signals significantly for medical/health sites
- Add `Person` schema with `alumniOf`, `hasCredential`

### 15. Add Image Sitemap
- List all hero images and blog images in an image sitemap
- Helps Google Image Search discover and index practice photos

### 16. Improve Service Page Image Alt Text
- Generic alt text on service hero images
- Use descriptive: "Patient receiving dental implant consultation at Thrive Dental Bayside"

### 17. Add FAQ Content (Non-Schema)
- FAQPage schema is restricted, but FAQ content itself is fine
- Add collapsible Q&A sections to service pages for long-tail keywords

### 18. Blog Author Pages
- Create `/blog/authors/[name]` pages linking all posts by each doctor
- Strengthens author E-E-A-T signal

---

## Score Impact Estimate

| Action | Est. Score Gain |
|--------|----------------|
| Fix domain/canonical (#1) | +5 pts |
| Security headers (#2) | +2 pts |
| Fix employee schema (#3) | +1 pt |
| Optimize hero image (#4) | +2 pts |
| llms.txt (#7) | +2 pts |
| Add Service schema (#6) | +1 pt |
| Blog cross-links (#10) | +1 pt |
| AggregateRating (#11) | +2 pts |
| Neighborhood differentiation (#12) | +2 pts |

**Projected score after Critical + High fixes: ~86/100**
