---
name: уход-протокол-design
description: Use this skill to generate well-branded interfaces and assets for Уход-протокол, a Russian-language skincare routine PWA. Contains essential design guidelines, colors, typography, assets, and UI kit components for prototyping or production.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

Key design facts to internalize immediately:
- Fonts: Unbounded (900/700 for headings) + Manrope (400–700 for body) via Google Fonts
- Primary palette: dark sage `#1A2E28`, sage `#4A7C6F`, sage-light `#7BB5A4`, sage-bg `#EDF3F0`
- Warning/accent: warm orange `#C8855A` on `#FEF2EA` background
- Cards: white, `border-radius: 20px`, shadow `0 1px 3px rgba(0,0,0,0.06)`
- Icons: emoji only — no SVG icon set, no icon font
- All copy is in Russian; tone is clinical and precise (protocol-style, no fluff)
- Animations: fadeUp `0→1 opacity + translateY(12px→0)` over `0.3s ease`, staggered per card

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
