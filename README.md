# Design System

Дизайн-система для всех проектов экосистемы. Статические HTML-превью компонентов + токены (цвета, шрифты, тени, отступы). Подключается в проекты как git submodule.

## С чего начать

| Я хочу… | Открыть |
|---------|---------|
| Понять правила работы ИИ в репо | [CLAUDE.md](CLAUDE.md) |
| Найти превью компонента для проекта | папку проекта ниже → `<project>/preview/` |
| Текущие задачи | [tasks/todo.md](tasks/todo.md) |
| Уроки/паттерны | [tasks/lessons.md](tasks/lessons.md) |

## Проекты

- [kino-app/](./kino-app/)
- [Skincare-Guide/](./Skincare-Guide/)
- [WB_Bot/](./WB_Bot/)

## Структура одного проекта

```
<project>/
  preview/
    component-cards.html     — карточки
    component-buttons.html   — кнопки
    component-chips.html     — чипы
    component-nav.html       — шапка + табы
    component-chat.html      — чат-окно
    component-auth.html      — форма входа / OTP
    colors-base.html         — цвета/фоны
    type-display.html        — шрифты
    shadows-glow.html        — тени
    spacing-tokens.html      — отступы
```

Перед любым UI-изменением в основном проекте — открыть нужный файл превью и брать классы/токены оттуда. Не выдумывать UI с нуля.

## Стек

- HTML + CSS + JavaScript (без фреймворков)
- Node.js: не требуется
- Подключается через `git submodule`

## Инфраструктура

- Репо: `github.com/Arsid0305/design-system`
- CI: `automerge.yml` — автомерж `claude/*` PR через GitHub API
