# Уход-протокол Design System

## Overview

**Product:** Уход-протокол (Care Protocol) — a Russian-language personal skincare routine PWA  
**Platform:** Mobile-first Progressive Web App (PWA), installable on iOS/Android  
**Source:** GitHub repository `Arsid0305/Skincare-Guide` — single `index.html` (~38KB), no build step  
**Language:** Russian throughout all UI copy

The app is a personal skincare guide structured as a tabbed mobile interface with four sections:
- **Средства** (Products) — step-by-step product usage cards
- **Алгоритм** (Algorithm) — morning/evening routine flows
- **Правила** (Rules) — critical rules + timeline expectations
- **Риски** (Risks) — stop-flags and failure scenarios

---

## Sources

- **Codebase:** `https://github.com/Arsid0305/Skincare-Guide` — single `index.html`
- No Figma link was provided
- App icons extracted from repo: `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`

---

## CONTENT FUNDAMENTALS

### Voice & Tone
- **Language:** Russian. All UI copy is in Russian.
- **Tone:** Clinical, precise, authoritative — like a dermatologist's protocol, not a beauty blog.
- **Register:** Second person implied (instructions written as directives, not "you should…").
- **Casing:** Title-case for product names (brand names stay as-is). Category labels in ALL CAPS with letter-spacing. Section titles in Unbounded caps.
- **Emoji:** Used functionally as step icons and status indicators (⚠️ warning, ✔ ok, ⛔ stop, 🔥🔴💧 risk flags). Not decorative.
- **Numbers & specifics:** Highly specific — exact percentages, timings, quantities ("2–4 капли", "пауза 5–10 мин", "7 дней").
- **Warnings:** Written as failure scenarios with cause → effect arrows (→). E.g. "SPF раньше времени → скатывание + неравномерная защита"
- **Negation is prominent:** What NOT to do is as prominent as what to do. Stop-flags, pitfalls, and exceptions are first-class content.
- **No fluff:** Zero marketing language. No "luxurious", "glowing", "transform your skin". Pure protocol.

### Example Copy Patterns
- `⚠️ Не нужен: кожа чистая или есть сухость → лишнее умывание обезвоживает, хуже переносится Vit C`
- `✔ Рекомендован перед азелаиновой — компенсирует отсутствие воды в формуле`
- `❌ При любом флаге — убрать последнее введённое средство. Не несколько сразу`
- `💡 Крем утром убран — SPF содержит достаточно увлажняющих компонентов. Лишний слой = риск скатывания`

---

## VISUAL FOUNDATIONS

### Colors
Primary palette is a **dark sage green** system with a warm orange accent.
- **Dark green** (`#1A2E28`) — header background, key card, primary dark surface
- **Sage** (`#4A7C6F`) — primary interactive (active tabs, flow numbers, dots, accents)
- **Sage light** (`#7BB5A4`) — accent text on dark backgrounds, h1 color accent
- **Sage bg** (`#EDF3F0`) — app background, chip background, step icon bg, tip bg
- **Warm orange** (`#C8855A`) — exclusively for warnings, stop-flags, failure scenarios
- **Warm bg** (`#FEF2EA`) — warning card background
- **Cream** (`#FAF6EF`) — alternative warm surface (not heavily used)
- **White** — card backgrounds

### Typography
- **Unbounded** (900/700/400) — display font for all headings, product names, card titles. Very geometric, chunky. Used at 26px (h1), 14px (card titles), 13px (card headings), 12px (sub-headings).
- **Manrope** (400–700) — body font for all UI text, chips, metadata, paragraphs.
- Labels use ALL CAPS + `letter-spacing: 1–1.5px` in 10px/700 Manrope.
- Body text is 13px/500 Manrope for readability on mobile.

### Spacing & Layout
- App padding: 20px horizontal, 16px for content sections
- Card gap: 12–14px between cards
- Card inner padding: 18–20px
- All layout via flexbox with explicit `gap`

### Backgrounds
- App background: flat `#EDF3F0` (sage-bg) — no images, no textures
- Header: flat `#1A2E28` with two **radial gradient blobs** (subtle, atmospheric) — not a gradient bg but decorative elements
- Cards: pure `#ffffff` with minimal shadow
- No full-bleed images, no patterns, no textures

### Animation
- **fadeUp**: cards animate in with `opacity 0→1` + `translateY(12px→0)` over `0.3s ease`
- Staggered delay per card index (`0.05s` increments)
- Tab transitions re-trigger card animations on section switch
- Button hover/active: `transition: all 0.2s` — background color shift only. No scale, no bounce.
- No loading spinners, no skeleton screens — content appears directly

### Cards
- **Background:** `#fff`
- **Border-radius:** `20px` (cards), `14px` (step icons), `12px` (small boxes), `30px` (tabs/chips), `40px` (badges)
- **Shadow:** `0 1px 3px rgba(0,0,0,0.06)` — extremely subtle, just enough to lift from bg
- **No visible borders** on cards — shadow + background contrast does the work
- Warning/stop cards use colored backgrounds instead of borders

### Hover / Press States
- Nav tabs: background + color transition `0.2s ease`
- No explicit hover states on cards (touch-first)
- `-webkit-tap-highlight-color: transparent` — custom tap behavior

### Iconography
See ICONOGRAPHY section below.

### Corner Radii System
- `12px` — small icons, inline boxes
- `14px` — step icons (42×42)
- `20px` — cards, stop-cards, key-cards
- `30px` — nav tabs
- `40px` — badges, chips, time-tags
- `50%` — flow step numbers (circles)

### Use of Blur/Transparency
- Minimal. Badge uses `rgba` with a semi-transparent border on dark bg.
- Radial gradient blobs in header use `rgba` opacity for soft atmospheric effect.
- Tab inactive states use `rgba(255,255,255,0.06)` on dark bg.
- No backdrop-filter blur used.

### Color Vibe of Content
- No photography in the app
- Emoji provide all "imagery" — functional, not decorative
- Palette is cool-green with warm-orange contrast — clinical + natural

---

## ICONOGRAPHY

### Approach
- **No icon font, no SVG icon set.** All icons are Unicode emoji.
- Emoji are used as **functional semantic icons** within step cards and titles:
  - `🧼` cleansing, `🍊` vitamin C, `👁️` eye area, `☀️` SPF/morning, `💧` micellar/hydration
  - `🔬` azelaic acid / actives, `🧴` moisturizer, `🌞` morning routine, `🌙` evening routine
  - `⚠️` warnings, `⛔` stop flags, `✔` ok/recommended, `🧠` key concept
  - `🔥🔴🍂⚪💧` risk severity indicators
- Emoji are placed in `42×42px` rounded containers (`border-radius:14px`) with `#EDF3F0` background for step cards
- For algo cards, `36×36px` containers with thematic background colors (`#FFF5E0` for morning sun, `#EEE6FA` for evening)

### App Icons
All located in `assets/`:
- `assets/icon-192.png` — PWA 192px icon (dark green leaf mark on dark bg)
- `assets/icon-512.png` — PWA 512px icon
- `assets/apple-touch-icon.png` — iOS home screen icon (180px, rounded corners applied by OS)

### No external icon library is used or needed.

---

## File Index

```
/
├── README.md                        ← This file
├── SKILL.md                         ← Agent skill definition
├── colors_and_type.css              ← All design tokens + semantic CSS vars
├── assets/
│   ├── icon-192.png                 ← PWA icon 192px
│   ├── icon-512.png                 ← PWA icon 512px
│   └── apple-touch-icon.png         ← iOS touch icon
├── preview/
│   ├── colors-brand.html            ← Sage + warm palette swatches
│   ├── colors-semantic.html         ← Semantic color token grid
│   ├── type-display.html            ← Unbounded display specimens
│   ├── type-body.html               ← Manrope body scale specimens
│   ├── spacing-radii.html           ← Border radii + shadow tokens
│   ├── component-header.html        ← App header component
│   ├── component-tabs.html          ← Nav tabs + badge + chips
│   ├── component-step-card.html     ← Step card component
│   ├── component-algo-card.html     ← Algorithm flow card
│   └── component-warning-cards.html ← Stop card + key card
└── ui_kits/
    └── skincare-guide/
        └── index.html               ← Full interactive PWA recreation (React)
```

---

## UI Kits

### Skincare Guide PWA (`ui_kits/skincare-guide/index.html`)
Full interactive React recreation of the Уход-протокол PWA. Renders inside a 390×844px phone frame. All four tabs are functional: Средства, Алгоритм, Правила, Риски. Components include:
- `<AppHeader>` — dark header with radial blob decoration and badge
- `<NavTabs>` — sticky scrollable tab bar
- `<StepCard>` — product step card with chips and warning boxes, animated fadeUp
- `<AlgoCard>` — routine flow card with numbered steps
- `<RulesCard>` — rules list with dot indicators, dark/warn/default variants
