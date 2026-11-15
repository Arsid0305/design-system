# Claude Adapter — design-system

> Тонкий адаптер для Claude. Универсальные правила экосистемы — в `AI_OS/docs/rules/core/*.md` (SSOT, копий в этом репо нет).
> Читай этот файл и `tasks/lessons.md` в начале каждого чата.

---

## ⛔ ГЛАВНОЕ ПРАВИЛО

Внутри согласованной задачи — работать без остановок, баги в её скоупе чинить сам, сообщать после.
Заметил баг или улучшение вне задачи — не трогать: записать в блок «Нужно от вас» и продолжать работу. Разбираем вместе с владелицей.

Канон — `AI_OS/docs/rules/core/communication-style.md` §«Доводить до конца» (решение владелицы, 2026-10-08).

---

## LLM_Wiki — контекст экосистемы

В начале каждой сессии прочитать из `arsid0305/llm_wiki` (main):
- `wiki/lessons.md`, `wiki/decisions.md` — кросс-проектные уроки и решения
- `wiki/rules-architecture.md` — canon rules-архитектуры (если ещё не читал)

---

## Каноны (rules как атомы)

Универсальные правила — в `AI_OS/docs/rules/core/*.md` (SSOT, копий в этом репо нет). Если AI_OS не подключён к сессии — попросить подключить, по памяти не работать. Читать нужное по имени:

- Начало / конец сессии — [`AI_OS/docs/rules/core/session-lifecycle.md`](https://github.com/Arsid0305/AI_OS/blob/main/docs/rules/core/session-lifecycle.md)
- Стиль общения — [`AI_OS/docs/rules/core/communication-style.md`](https://github.com/Arsid0305/AI_OS/blob/main/docs/rules/core/communication-style.md)
- Git flow, запрет флагов, правила редактирования — [`AI_OS/docs/rules/core/git-flow.md`](https://github.com/Arsid0305/AI_OS/blob/main/docs/rules/core/git-flow.md)
- GitHub anti-abuse — [`AI_OS/docs/rules/core/github-anti-abuse.md`](https://github.com/Arsid0305/AI_OS/blob/main/docs/rules/core/github-anti-abuse.md)
- Критерии SMALL / BIG — [`AI_OS/docs/rules/core/task-classification.md`](https://github.com/Arsid0305/AI_OS/blob/main/docs/rules/core/task-classification.md)
- Принципы работы с кодом — [`AI_OS/docs/rules/core/code-principles.md`](https://github.com/Arsid0305/AI_OS/blob/main/docs/rules/core/code-principles.md)
- Subagents (worktree, JSON-schema контракты, выбор модели) — [`AI_OS/docs/rules/core/subagents.md`](https://github.com/Arsid0305/AI_OS/blob/main/docs/rules/core/subagents.md)
- Audit-триггер — [`AI_OS/docs/rules/core/audit-trigger.md`](https://github.com/Arsid0305/AI_OS/blob/main/docs/rules/core/audit-trigger.md)
- Разрешения веб-сессий — [`AI_OS/docs/rules/core/web-permissions.md`](https://github.com/Arsid0305/AI_OS/blob/main/docs/rules/core/web-permissions.md)
- Независимость от поставщика ИИ — [`AI_OS/docs/rules/core/vendor-independence.md`](https://github.com/Arsid0305/AI_OS/blob/main/docs/rules/core/vendor-independence.md)

**Специфика design-system** (scoped): [`docs/rules/scoped/design-system-specific.md`](docs/rules/scoped/design-system-specific.md) — review превью, CSS-токены, безопасность HTML, структура preview/.

Архитектура rules — [`AI_OS/docs/rules/README.md`](https://github.com/Arsid0305/AI_OS/blob/main/docs/rules/README.md).

---

## TEMPLATE репо — автодоступ

`github.com/Arsid0305/TEMPLATE` содержит шаблоны для всех проектов.

```bash
git clone https://github.com/Arsid0305/TEMPLATE /tmp/arsid-template
```

Репо публичное — работает без токена.

---

## Инфраструктура

_Проверено: 2026-08-19._

- Репо: github.com/Arsid0305/design-system
- Тип: дизайн-система, статические HTML-превью компонентов
- Подключается к проектам как git submodule (`kino-design-system/` в Kino-app, аналогично в других)
- Стек: HTML + CSS + JavaScript (без фреймворков, без Node.js)
- CI/CD: нет. Автомержа нет (удалён 2026-09-25) — PR мержит владелица кнопкой, мерж через API запрещён (`AI_OS/docs/rules/core/github-anti-abuse.md`).

## Среда Claude

- Node.js / npm: не требуется
- Supabase CLI: не используется

## Рабочий процесс

Ветка `claude/...` → PR в `main` (не draft). Автомержа нет (удалён 2026-09-25) — PR мержит владелица кнопкой, мерж через API запрещён (`AI_OS/docs/rules/core/github-anti-abuse.md`). Никогда не пушить в `main` напрямую.

---

## Открытые баги

_(пусто)_
