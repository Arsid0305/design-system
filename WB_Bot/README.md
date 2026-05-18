# ReviewBot Design System

## Overview

**ReviewBot** (brand entity: **Arols**) is an AI-powered tool for marketplace sellers to automatically generate and send replies to customer reviews. It supports two major Russian e-commerce platforms:

- **Wildberries (WB)** — purple theme (`#a500ff → #7b00ff`)
- **Ozon** — blue theme (`#005BFF → #0041CC`)

The seller configures their brand name, tone, response length, and GPT model once. ReviewBot then fetches unanswered reviews via platform APIs, generates replies using OpenAI GPT-4o/mini, and lets the seller review, edit, and send with one tap.

### Architecture
| Layer | Tech |
|---|---|
| Frontend SPA | React 18, inline Babel JSX, localStorage state |
| Backend API | Python FastAPI (`web/app.py`) |
| AI | OpenAI GPT-4o-mini / GPT-4o |
| Connectors | `connectors/wb_connector.py`, `connectors/ozon_connector.py` |
| Queue UI | Jinja2 template (`web/templates/queue.html`) |

### Source
- GitHub: https://github.com/Arsid0305/WB-Bot
- Main app: `wb-reviewbot-v3.html` (standalone React SPA)
- Backend: `web/app.py`

---

## CONTENT FUNDAMENTALS

### Language
- All copy is **Russian only** — the product is exclusively for the Russian market.
- UI labels use **formal imperative** style for actions: *Загрузить отзывы*, *Сгенерировать ИИ*, *Отправить*.
- Error messages are direct and helpful: *WB токен недействителен*, *Недостаточно средств на счёте OpenAI*.

### Tone
- **Professional but warm.** Not corporate stiffness — practical clarity with a human touch.
- Address users formally with **«вы»** (not «ты»).
- Generated review replies support three configurable tones: *Официальный*, *Дружелюбный*, *Нейтральный*.

### Casing
- Section headers in UPPERCASE with letter-spacing: `ОЖИДАЮТ ОТВЕТА · 3 / 5`
- Button labels: Title Case equivalent in Russian — sentence-case words capitalised as nouns.
- Metric labels: small, uppercase, muted (`#999`).

### Emoji
- Used sparingly and intentionally in the UI — never decorative filler.
- Specific uses: 📭 empty state, 💬 app icon in header, ✅ success screen, 🎓 learning/feedback section, ⚠️ warnings.
- Generated responses use **1–2 emoji max** in friendly tone only.
- No emoji in formal or neutral tones.

### Numbers & Pricing
- Costs shown in USD with ~ approximation: *~$0.0002 за ответ*.
- Star ratings displayed as filled/empty ★ symbols.
- Character counts shown as `{n} / 1000` with colour-coded warnings.

---

## VISUAL FOUNDATIONS

### Color System
Two platform palettes + one shared semantic set.

**WB (Wildberries)**
- Primary gradient: `linear-gradient(135deg, #a500ff, #7b00ff)`
- Accent solid: `#a500ff`
- Accent background tint: `rgba(165,0,255,0.06)`
- Accent shadow: `rgba(165,0,255,0.12)`

**Ozon**
- Primary gradient: `linear-gradient(135deg, #005BFF, #0041CC)`
- Accent solid: `#005BFF`
- Accent background tint: `rgba(0,91,255,0.06)`
- Accent shadow: `rgba(0,91,255,0.12)`

**AI / GPT accent**
- `#10A37F` (OpenAI green) — used exclusively for AI generation actions.

**Semantic**
- Background page: `#f5f6f8`
- Surface card: `#ffffff`
- Border subtle: `#e6e8ec`
- Border input: `#d9dbe0`
- Text primary: `#1a1a1a`
- Text secondary: `#666`
- Text muted: `#999`
- Text placeholder: `#bbb`
- Success: `#34C759`
- Warning: `#FF9500`
- Error: `#FF3B30`
- Star gold: `#ffb84d`

### Typography
System font stack — no custom webfonts. Closest Google Fonts substitute: **Inter**.
```
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
```
| Role | Size | Weight | Color |
|---|---|---|---|
| App title | 17px | 700 | #fff (on gradient) |
| Section label | 12px | 700 | #999, uppercase, 0.08em spacing |
| Card title | 15–16px | 700 | #1a1a1a |
| Body / input | 15px | 400 | #1a1a1a |
| Caption / meta | 13–14px | 400 | #666–#888 |
| Micro label | 12px | 600–700 | varies |

### Spacing & Layout
- Page background: `#f5f6f8`
- Max content width: `700px` (main), `520px` (setup form)
- Page padding: `28px 20px`
- Card padding: `24px`
- Card gap between sections: `16–20px`
- Input padding: `12px 14px`
- Button padding: `13px 20px`

### Cards
- Background: `#ffffff`
- Border: `1px solid #e6e8ec`
- Border radius: `14px`
- Shadow: `0 8px 24px rgba(0,0,0,0.05)`
- Hover lift: `transform: translateY(-1px)` + accent shadow

### Inputs
- Border: `1.5px solid #d9dbe0`
- Border radius: `10px`
- Background: `#fafafa`
- Focus ring: `0 0 0 3px <accentBg>` + accent border color
- Font size: `15px`
- Transition: `all 0.15s`

### Buttons
- Primary: gradient background, white text, `border-radius: 10px`, `font-weight: 600`
- Disabled state: background `#e6e8ec`, color `#999`, cursor `not-allowed`
- Dashed outline (add manually): `border: 2px dashed <accent>`, background white → tint on hover
- Segment / pill buttons: `border-radius: 20px`, pill shape

### Animations
```css
@keyframes fadeIn   { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
@keyframes slideUp  { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
@keyframes spin     { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }
@keyframes pulse    { 0%,100% { opacity:1 } 50% { opacity:0.5 } }
```
- Modals slide up from bottom (`slideUp 0.25s ease`)
- New content fades in (`fadeIn 0.3s ease`)
- Loading spinners use `spin 1s linear infinite`
- Transitions: `all 0.15–0.2s`

### Platform Badges
Pill labels on gradient background, white text, `border-radius: 20px`, `padding: 5px 14px`, `font-size: 13px`, `font-weight: 600`.

### Backgrounds & Imagery
- No full-bleed imagery; solid `#f5f6f8` page background only.
- Cards are white on the gray page — clean, flat hierarchy.
- No illustrations or patterns in UI; logo assets only.
- Review text sections: `#f9fafc` tinted panels inside cards.

### Corner Radii
- Cards: `14px`
- Buttons & inputs: `10px`
- Pills / badges: `20px`
- Segment buttons (inner): `9px`
- App icon: `16px`
- Thumbnails / images: `8px`
- Close button: `50%` (circle)

### Shadows
Single shadow system:
- Resting card: `0 8px 24px rgba(0,0,0,0.05)`
- Hovered card: `0 12px 32px <accentShadow>`
- No inner shadows. No elevation tokens beyond card + hover.

### Icons
Inline SVGs, stroke-based, `stroke-width: 1.8–2.5`, no fill. Size: 15–18px in UI. Single accent emoji used for app identity (💬). See ICONOGRAPHY.

### Hover / Press States
- Clickable cards: `translateY(-1px)` lift + accent shadow
- Buttons: no explicit hover beyond cursor/opacity; gradient buttons stay solid
- Icon buttons: color transition from `#ccc` → accent/destructive
- Outline segmented buttons: background tint on hover via `accentBg`

### Scrollbars
Custom thin scrollbar: `width: 6px`, thumb `#d0d0d8`, `border-radius: 3px`.

---

## ICONOGRAPHY

Icons are **hand-rolled inline SVGs** — no icon library or CDN. All icons are stroke-based (no filled icons except stars).

| Icon | Usage | Stroke |
|---|---|---|
| Star ★ | Ratings — filled `#ffb84d` / empty `#e6e6e6` | text char |
| Sparkle (5-point) | AI generate button | 2 |
| Settings (gear) | Open settings | 1.8 |
| Back arrow | Navigation back | 2 |
| Check | Success / send button | 2.5 |
| Plus | Add review manually | 2.5 |
| Trash | Delete review | 2 |

Logo assets:
- `assets/logo-flat.png` — flat purple icon (app stores / dark bg)
- `assets/logo-glossy.png` — glossy 3D purple icon (marketing)
- `assets/favicon.ico` — browser favicon

No third-party icon font. No emoji as icons (except 💬 branding in header).

---

## Files Index

```
README.md                  — This file (design system reference)
SKILL.md                   — Agent skill definition
colors_and_type.css        — CSS custom properties for all tokens
assets/
  logo-flat.png            — App icon (flat, purple bg)
  logo-glossy.png          — App icon (glossy 3D)
  favicon.ico              — Browser favicon
preview/
  colors-wb.html           — WB color palette card
  colors-ozon.html         — Ozon color palette card
  colors-semantic.html     — Semantic color tokens card
  type-scale.html          — Typography scale card
  type-specimens.html      — Type specimens (labels, captions, etc.)
  spacing-radii.html       — Border radii tokens
  spacing-shadows.html     — Shadow system
  spacing-tokens.html      — Spacing scale
  components-buttons.html  — Button variants
  components-inputs.html   — Input & textarea states
  components-cards.html    — Card component
  components-badges.html   — Platform badges & status chips
  brand-logo.html          — Logo assets
  brand-icons.html         — Icon set
ui_kits/
  reviewbot/
    README.md              — UI kit overview
    index.html             — Interactive app prototype
    Header.jsx             — App header component
    ReviewCard.jsx         — Review card component
    RespondPanel.jsx       — Response editor panel
    SetupForm.jsx          — Brand setup screen
```
