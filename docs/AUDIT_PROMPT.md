# Repository Audit — design-system

Универсальные проверки — см. **`llm_wiki/wiki/audit-universal.md`** (canon для всех репо).

Этот файл — тонкий overlay с проектной спецификой design-system.

---

## Контекст проекта

```
Тип: дизайн-система, статические HTML-превью компонентов
Стек: HTML + CSS + JavaScript (без фреймворков)
Подключение: git submodule в проекты (kino-app, Skincare-Guide, WB_Bot)
Проекты: kino-app/, Skincare-Guide/, WB_Bot/
```

## Проектные проверки (в дополнение к universal)

**Структура проектных папок:**
- [ ] У каждого проекта в `<project>/preview/` есть стандартный набор:
  - `component-cards.html`, `component-buttons.html`, `component-chips.html`
  - `component-nav.html`, `component-chat.html`, `component-auth.html`
  - `colors-base.html`, `type-display.html`, `shadows-glow.html`, `spacing-tokens.html`
- [ ] Наименование файлов консистентно между проектами

**Токены и консистентность:**
- [ ] Цветовые токены между проектами не конфликтуют без явной причины
- [ ] CSS-токены (шрифты, отступы) — реально используются в превью, не мёртвые

**Безопасность HTML:**
- [ ] Нет `innerHTML` без санитизации
- [ ] Нет чувствительных данных захардкоженных в JS

**Как submodule:**
- [ ] Превью открываются напрямую в браузере (не требуют build-step)
- [ ] Нет зависимостей от npm-пакетов — иначе submodule ломает parent

## Формат отчёта

Как в `llm_wiki/wiki/audit-universal.md`.
