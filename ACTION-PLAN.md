# SEO Action Plan — Thrive Dental Bayside
**Updated:** 2026-03-11 (v2 — post second audit round)
**Overall Score: 84/100** → Target: 92/100

---

## ✅ COMPLETED THIS SESSION

| # | Fix | Score Impact |
|---|-----|-------------|
| ✅ | `employee[].@type` → `Person` (was `Dentist`) | +1 pt |
| ✅ | `honorificSuffix` + `jobTitle` on BlogPosting author schema | +1 pt |
| ✅ | `Service` schema added to all service pages | +1 pt |
| ✅ | `llms.txt` created with correct hours + credentials | +2 pts |
| ✅ | 11 meta descriptions trimmed to 140–160 chars | +1 pt |
| ✅ | 5 title tags fixed to under 60 chars | +1 pt |
| ✅ | `trailingSlash: 'never'` in astro.config.mjs | +1 pt |
| ✅ | `lastmod` added to all sitemap entries | +0.5 pt |
| ✅ | BreadcrumbList on blog index | +0.5 pt |
| ✅ | Blog index migrated to `Astro.glob()` | +0.5 pt |
| ✅ | Outbound citations (ADA/CDC/NIH) on all 6 blog posts | +1 pt |
| ✅ | `relatedService` cross-links rendered on all blog posts | +1 pt |
| ✅ | `relatedPosts` added to general-dentistry service page | +0.5 pt |
| ✅ | X-Frame-Options conflict fixed (removed conflicting meta tag) | +0.5 pt |
| ✅ | `og:image:type` meta added | +0.5 pt |
| ✅ | `X-Content-Type-Options` meta fallback added | +0.5 pt |
| ✅ | Hero LCP: `fetchpriority="high"` preload on hero poster | +1 pt |
| ✅ | Service page heroes: `fetchpriority="high"` + `quality={80}` | +0.5 pt |
| ✅ | Hero CLS fix: `min-h-[92svh]` | +0.5 pt |
| ✅ | Service page mobile: sidebar hidden, compact CTA bar added | UX |
| ✅ | Homepage carousel: responsive card sizing + edge fades | UX |
| ✅ | `Applebot-Extended` blocked in robots.txt | +0.5 pt |
| ✅ | `url` property added to BlogPosting schema | +0.5 pt |
| ✅ | `BlogPosting` author → `url` linking to doctor profile page | E-E-A-T |
| ✅ | Doctors page title fixed (52 chars) | +0.5 pt |

---

## 🔴 CRITICAL (Fix Immediately)

### 1. Create Individual Doctor Profile Pages — **HIGHEST PRIORITY**
**Issue:** `/doctors/yelena-mikhaylova`, `/doctors/alla-hart`, `/doctors/abanob-saleh` return 404. Every blog post author byline and BlogPosting schema `author.url` links to these pages. Breaks E-E-A-T author chain entirely — Google cannot verify author expertise.
**Estimated Score Impact:** +3–4 pts
**Fix:** Create `src/pages/doctors/[slug].astro` with:
- Full bio, credentials (DDS/DMD), dental school + graduation year
- Photo
- `Person` schema with `alumniOf`, `hasCredential`, `jobTitle`
- Link back to blog posts authored by that doctor

### 2. Convert Hero Poster to AVIF
**File:** `public/office/hero-2057.jpg`
**Issue:** JPEG served as LCP image — largest performance drag on site. Estimated 200–500KB.
**Estimated LCP improvement:** 400–900ms on mobile
**Fix:**
```bash
npx @squoosh/cli --avif '{"quality":65}' public/office/hero-2057.jpg
# Output: hero-2057.avif
```
Then update `index.astro` preload:
```html
<link rel="preload" as="image" type="image/avif" href="/office/hero-2057.avif" fetchpriority="high">
```
And update the `<img>` or `<picture>` source.

---

## 🟠 HIGH (Fix Within 1 Week)

### 3. Expand 5 Thin Blog Posts to 1,500+ Words
**Issue:** Only 1 of 6 posts meets the 1,500-word floor for health content. Thin posts rank poorly and don't earn AI citations.

| Post | Est. Words | Gap |
|------|-----------|-----|
| dental-emergency-what-to-do | ~750 | +750 words needed |
| invisalign-vs-braces-bayside | ~900 | +600 words needed |
| how-often-dental-cleaning | ~850 | +650 words needed |
| porcelain-veneers-guide | ~1,100 | +400 words needed |
| gum-disease-signs-treatment | ~1,100 | +400 words needed |

**For each post, add:**
- 1–2 new H2 sections addressing follow-up questions
- A comparison table or numbered list for skimmability
- 1–2 additional ADA/NIH citations

### 4. Fix "Board-Certified" Language
**Files:** `src/pages/doctors.astro`, `src/layouts/NeighborhoodPage.astro`
**Issue:** General dentists don't hold board certifications (ADA recognizes 12 specialty boards only). This phrase is technically inaccurate and could mislead patients.
**Fix:** Replace "board-certified" with:
- "Advanced Training in [specialty]" (preferred)
- "ADA Member"
- "Fellowship-trained" (if applicable)

### 5. Differentiate Neighborhood Page Content
**Issue:** Flushing and Douglaston pages have near-identical 40–50 word blurbs — meets Google's QRG definition of unhelpful programmatic content.
**Fix:** For each neighborhood page, write 200–300 words of genuinely unique content:
- Specific cross-streets or landmarks near the practice
- Transportation/commute details from that neighborhood
- Community-specific patient context (e.g., "Many of our Flushing patients speak Mandarin...")
- Unique patient testimonial if available

---

## 🟡 MEDIUM (Fix Within 1 Month)

### 6. Add `wordCount` to BlogPosting Schema
**File:** `src/layouts/BlogPost.astro`
**Issue:** Missing `wordCount` property — minor AI citability signal.
**Fix:**
```astro
// In frontmatter: add wordCount to Props interface
// In schema: wordCount: wordCount ?? undefined
```

### 7. Complete Dr. Mikhaylova Bio Details
**File:** `src/pages/doctors.astro`
**Issue:** Dr. Mikhaylova's bio lacks dental school name and graduation year. Dr. Hart and Dr. Saleh both have this information.
**Fix:** Add school name + graduation year to Mikhaylova bio section.

### 8. Add NeighborhoodPage Hub Level to Breadcrumb
**Issue:** Neighborhood page breadcrumbs have only 2 levels (Home → [Neighborhood]). No hub page exists.
**Options:**
- Add a `/neighborhood-dentist` hub page and include it as breadcrumb level 2
- Or accept 2-level breadcrumb as acceptable (lower priority)

### 9. Add Doctor `image` to Person Schema
**File:** `src/pages/doctors.astro` (Person @graph)
**Issue:** Doctor Person nodes lack `image` property.
**Fix:** Add `"image": "https://www.thrivedentalny.com/images/[doctor-photo].jpg"` to each Person node.

---

## 🔵 LOW (Backlog)

### 10. Add `employee` Array to ServicePage Dentist Block
**Issue:** ServicePage Dentist schema doesn't repeat the employee array (homepage is canonical node). Fine architecturally, but could strengthen relevance signals on individual service pages.

### 11. Add Image Sitemap
- List hero images and blog images for Google Image Search indexing

### 12. Blog Author Hub Pages
- `/blog/authors/[name]` listing all posts per doctor
- Strengthens author E-E-A-T chain once doctor profile pages exist

---

## Score Impact Estimate

| Remaining Action | Est. Score Gain |
|-----------------|----------------|
| Doctor profile pages (#1) | +3–4 pts |
| Hero AVIF conversion (#2) | +1–2 pts |
| Blog post expansion (#3) | +2–3 pts |
| Fix "board-certified" (#4) | +0.5 pt |
| Neighborhood differentiation (#5) | +1–2 pts |
| wordCount schema (#6) | +0.5 pt |
| Dr. Mikhaylova bio (#7) | +0.5 pt |

**Projected score after all High fixes: ~90–92/100**
