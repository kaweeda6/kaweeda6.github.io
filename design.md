# Thrive Dental — Design System Reference

This document captures the visual language, component patterns, and implementation guidance extracted from the homepage. Use it as the source of truth for building and maintaining pages across the site.

## Foundations

### Color Palette and Usage
- Primary — Teal: `brand` scale 50–900 (see `tailwind.config.cjs`).
  - Primary CTAs: `bg-brand-500 hover:bg-brand-400` with white text.
  - Dark sections: `bg-brand-900` with `text-white` / `text-white/80`.
  - Accents on light surfaces: `text-brand-600/700`.
- Secondary — Gold: `gold` scale 50–900.
  - Use for subtle highlights (eyebrow labels, small rules/dividers), tertiary buttons, and decorative UI. Avoid using gold for large backgrounds.
- Neutrals — White & Sand: `white` plus warm off‑white `sand-50/100/200` for backgrounds and borders.
- Text/Borders — Slate: Tailwind `slate` for body copy and lines (`text-slate-700`, `border-slate-200`).
- Background blur/glass: `bg-white/80 backdrop-blur-xl` on sticky nav/cards.

Guidelines
- Use teal for actions and key brand moments; gold sparingly for emphasis only.
- Pick one neutral background per section (white or sand); avoid mixing.
- Maintain WCAG AA contrast on brand/dark surfaces.

### Typography
- Fonts are defined in `src/layouts/Base.astro` and loaded from Google Fonts:
  - Display: Fraunces (`--font-display`)
  - Sans: DM Sans (`--font-sans`)
- Heading scale (utility classes from `src/styles/global.css`):
  - `display-1`: large hero/section titles.
  - `display-2`: subsection titles.
  - `display-3`: smaller section headings.
- Body text: `text-[15px]–[17px]` and `leading-relaxed`. Use `text-slate-500/600` for secondary copy.
- Labels/eyebrows: uppercase, tight tracking (e.g., `text-[11–12px] font-bold uppercase tracking-[0.14–0.25em]`).

Guidelines
- One display style per section. Avoid mixing display classes in a single block.
- Use display font for headlines only; sans for all body/UI text.

### Layout, Spacing, Containers
- Container: `container-slim` → `max-w-5xl mx-auto px-4 sm:px-6 lg:px-8`.
- Section spacing (baseline): `py-16–24` on light backgrounds; larger on feature-heavy sections.
- Grids: Mobile-first; upgrade at `sm`, `md`, `lg`. Common patterns:
  - Two-column `lg:grid-cols-2` for hero/content blocks.
  - Three-column `lg:grid-cols-3` for cards.
- Radii: rounded card shapes are prominent:
  - Large tiles: `rounded-[2rem]–[3rem]`.
  - Pills/chips/buttons: `rounded-full`.
- Shadows: soft, layered elevation (examples)
  - Cards: `shadow-[0_4px_32px_rgba(0,0,0,0.04)]` → hover `shadow-[0_48px_80px_rgba(0,0,0,0.08)]`.
  - Media frames: deeper `shadow-[0_24px_80px_rgba(0,0,0,0.18)]`.

### Motion and Interaction
- Entrance: `fade-up` and `fade-up-delay-[1–4]` for staged reveals.
- Subtle parallax/floating badges: `.hero-float`, `.hero-float-slow`.
- Hover: small translate/scale on cards and media (`hover:-translate-y-2`, `group-hover:scale-110`).
- Marquee: continuous auto-scroll, pause on hover.

Guidelines
- Keep motion under 700ms and spatial movement minimal to feel calm and premium.
- Prefer opacity and scale over large translations.

### Imagery
- Aspect ratios: portrait media often `3/4` or `5/6`; wide `4/3`.
- Crop and cover: `object-cover`, center focal points; use gradient overlays for contrast.
- Rounding: large radii for hero media and cards to match brand feel.
- Video: silent autoplay loops for ambient office feel with gradient bottom fade.

### Accessibility
- Base layout provides skip link (`#main`) and keyboard-tab class.
- Color contrast: ensure WCAG AA on brand/dark surfaces; use `text-white`/`text-white/80` appropriately.
- Touch targets: 40–44px min; maintain adequate button padding (`px-5/6 py-3–3.5`).
- Semantic structure: landmark sections (`header`, `main`, `footer`), `nav[aria-label]`, `figure/figcaption` where appropriate.
- Remove native markers thoughtfully (e.g., `details summary`) and ensure keyboard toggling works.

### SEO and Meta
- Use `Base.astro` for pages: sets title, description, OG/Twitter, canonical.
- Use JSON‑LD for business details on location/contact sections following the homepage pattern.

## Components and Patterns

### Navigation Header (Glass)
- Fixed, blurred background:
  - Container: `fixed top-4 inset-x-0 px-4 sm:px-6`.
  - Shell: `rounded-2xl border border-slate-200/60 bg-white/80 shadow-[...] backdrop-blur-xl`.
- Desktop nav: small padded links with hover background (`hover:bg-slate-100/70`).
- CTAs: secondary call link + primary book button.
- Mobile: `<details>` menu with same link set and stacked CTAs.

### Footer
- Three columns: brand/contact, hours, quick links.
- Borders: `border-t` with comfortable `py-10` and small text.

### Buttons and Links
- Primary (solid):
  - `inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/20 hover:bg-brand-400 transition-all`
- Secondary (outline):
  - `rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50`
- Tertiary (text/link): brand-colored text with subtle underline grow-on-hover.
- Icon + label pairs use tight `gap-1.5–2` and 12–16px icons.

Guidelines
- Prefer rounded-full for primary/secondary CTAs.
- Keep button text short (≤ 2–3 words); sentence case.

### Pills and Chips
- `pill`: `rounded-full border border-slate-200 bg-sand-50 px-4 py-2 text-sm text-brand-700`.
- `chip`: `rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-medium`.

### Hero
- Left: headline + supporting copy + dual CTAs + social proof.
- Right: tall media frame (video) with floating stat cards and badges.
- Background: ambient brand blobs with heavy blur.

### Services Marquee
- Horizontal scroll of service cards (min/max width fixed to show carousel feel).
- Card anatomy:
  - Shell: `rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-[...] hover:shadow-[...] hover:-translate-y-2`.
  - Media: `h-48 rounded-[2rem] object-cover` with gradient overlay.
  - Content: title (`font-display`), short description, chevron affordance.

### Feature Grid (Why Choose Us)
- Three cards in two rows (2×3 across breakpoints) with icon tiles:
  - Icon tile: `h-14 w-14 rounded-2xl bg-brand-50 text-brand-600` → invert on hover.
  - Copy: uppercase label and short paragraph.

### Team Cards
- Tall portrait with large rounding, hover zoom/rotate, credential badge on hover.
- Content: name (display), role eyebrow, 2–3 line bio, “Learn more” link with micro-underline and circular chevron.

### Before/After Slider
- Two-layer image with movable before layer; labels for “Before/After”.
- Handle centered with circular grip; input `type=range` overlayed for interaction.
- Use provided script in `src/components/BeforeAfter.astro` to initialize on page swaps.

### Reviews Carousel
- Dark brand section with marquee `<blockquote>` tiles; pause on hover.
- Each tile: rating stars, testimonial text, avatar initial, name/location.

### CTA Banner
- Dark brand background with subtle brand blobs; centered title, short text, and primary CTA.

### Contact and Location
- Two-column: copy and contact details (address, phone, hours, action buttons) + map embed.
- Card styling for map: rounded, thin border, soft shadow.

### Mobile Call Bar
- Fixed bottom `nav` on mobile with 3 equal actions: Call, Directions, Book.
- Uses safe-area inset padding.

## Utilities and Reusable Classes
- `container-slim`, `display-1/2/3`, `pill`, `chip` in `src/styles/global.css`.
- Animation helpers: `.fade-up(-delay-N)`, `.hero-float`, `.hero-float-slow`.
- Scroll helpers: `.snap-x`, `.snap-item` where applicable.

## Content Guidelines
- Tone: warm, reassuring, modern, and clinically confident.
- Lengths: hero paragraph ≤ 2 lines; card descriptions 1–2 lines (use `line-clamp-2/3`).
- Labels: keep uppercase eyebrows short and specific.
- Numbers: prefer numerals for ratings/phone/hours; show star glyphs for reviews.

## Implementation Checklist (New Page)
1. Wrap content with `Base.astro` and set `title`, `description`, `ogImage`.
2. Use `container-slim` and baseline section paddings.
3. Apply `display-*` for section headings; body copy with `leading-relaxed`.
4. Use brand tokens and hover states per Buttons and Links.
5. Prefer card shells defined above for any grouped content.
6. Ensure a11y, focus states, and sensible landmarks.
7. Add JSON‑LD if the page presents location/business info.

---

## Service Page Design Spec (v2 — Homepage-Aligned)

**Goal:** Match the homepage's cinematic, color-layered feel — full-bleed hero, wave transitions, teal/dark-teal/white/beige rhythm — across every `ServicePage.astro` page.

### Section Color Rhythm (top → bottom)

| # | Section | Background | Wave Out |
|---|---|---|---|
| 1 | Hero | Full-bleed image + dark overlay | `#00cfc5` bright teal → |
| 2 | Why Thrive (overview) | `bg-brand-800` dark teal | `#ffffff` white → |
| 3 | Benefits | `bg-white` | `#f7f3e8` beige → |
| 4 | Process Steps | `bg-[#f7f3e8]` warm beige | (hard cut into white) |
| 5 | FAQ | `bg-white` | `#00cfc5` bright teal → |
| 6 | Related + Blog | `bg-brand-800` dark teal | (into Reviews) |
| 7 | Reviews Carousel | `bg-brand-800` top / `bg-brand-700` bottom | — |
| 8 | CTA Banner | injected into ReviewsCarousel slot | — |

---

### 1. Hero — Full-Bleed Image

**Change from current:** Replace split left-text/right-image layout with a cinematic full-bleed hero.

- Service hero image fills entire section as `position: absolute` background (`object-cover w-full h-full`)
- Dark overlays (same as homepage):
  - `bg-brand-900/70` — solid base darkness across full frame
  - `bg-gradient-to-r from-brand-900/60 via-transparent to-transparent` — extra depth on left for text
  - `bg-gradient-to-t from-brand-900/50 via-transparent to-transparent` — bottom vignette
- Section height: `min-h-[75vh]` (shorter than homepage's `92vh` — sub-page context)
- Content: `container-wide`, `max-w-3xl`, left-aligned
- h1: `display-1 !text-white` (override display-1's default dark color)
- Subtitle: `text-white/75`
- Breadcrumb: `text-white/50`, `hover:text-white`
- Category badge: `bg-white/15 text-white` frosted glass pill
- CTAs: same as homepage — solid `bg-brand-500` Book button + frosted `bg-white/10` Call button
- Trust signals: frosted `bg-white/10 backdrop-blur-sm` pill container with white text
- Wave at bottom: `fill="#00cfc5"` → Why Thrive section

---

### 2. Why Thrive — Keep As-Is ✓

`bg-brand-800` dark teal with white text — already matches homepage Team section.
- Wave out: `fill="#ffffff"` → Benefits

---

### 3. Benefits — Keep Cards, Fix Colors

- Keep `bg-white` section background
- Keep `bg-brand-700` benefit cards — matches homepage services marquee cards
- Step/icon circles: `bg-brand-500` (bright teal, not brand-600)
- Hover glow: `hover:shadow-[0_20px_48px_rgba(0,207,197,0.20)]`
- Wave out: `fill="#f7f3e8"` → Process Steps

---

### 4. Process Steps — Minor Color Fix

- Keep `bg-[#f7f3e8]` background
- Step number circles: `bg-brand-500` (was `bg-brand-600`)
- CTA button: `bg-brand-500 hover:bg-brand-700` (was `bg-brand-600`)
- No wave needed — white FAQ below creates natural hard-cut

---

### 5. FAQ — Simplify Nesting

- Remove `bg-[#f7f3e8]` inner wrapper — just use the white outer section
- Accordion borders: `border-slate-200` default, `open:border-brand-500` when expanded
- Number labels: `text-brand-500` (was `text-brand-400`)
- Wave at bottom: `fill="#00cfc5"` → Related + Blog (dark section)

---

### 6. Related + Blog — Promote to Dark Section

- Wrap in `bg-brand-800` (same as Why Thrive, Reviews header)
- Related service links: keep `border-l-[3px] border-l-brand-500` left accent, text `text-white/80`
- Blog card top stripe: `bg-brand-500` (bright teal, was `bg-brand-400`)
- Blog card shell: `bg-white/8 border-white/10` on dark bg
- This creates: white FAQ → bright teal wave → dark Related+Blog → into Reviews

---

### 7. Reviews + CTA — Consolidated

- Use `<ReviewsCarousel>` with `slot="cta"` to inject a CTA block above the reviews
- Remove the standalone CTA banner section (`bg-brand-700`) — it duplicates the injected CTA
- The slot CTA (from homepage pattern) lives inside `bg-brand-800` top of ReviewsCarousel

---

### Key Class Reference

```
Hero image bg:    absolute inset-0 h-full w-full object-cover
Overlay base:     bg-brand-900/70
Overlay left:     bg-gradient-to-r from-brand-900/60 via-transparent to-transparent
Overlay bottom:   bg-gradient-to-t from-brand-900/50 via-transparent to-transparent
Hero h1:          display-1 !text-white
Hero subtitle:    text-white/75
Eyebrow labels:   text-brand-500 (light bg) / text-brand-300 (dark bg)
Wave bright teal: fill="#00cfc5"
Wave white:       fill="#ffffff"
Wave beige:       fill="#f7f3e8"
Step circles:     bg-brand-500
Blog stripe:      bg-brand-500
Dark sections:    bg-brand-800
Mid sections:     bg-brand-700
```

## Changelog
- v1.0 Initial extraction from homepage (colors, type, components, motion, a11y, SEO, and patterns).
- v2.0 Service page spec: full-bleed hero, wave color rhythm, section-by-section changes to match homepage design language.
