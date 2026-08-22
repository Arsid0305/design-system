# Claude Adapter — design-system

> Тонкий адаптер для Claude. Универсальные правила экосистемы — в `docs/rules/core/*.md` (синкается из AI_OS).
> Читай этот файл, `docs/rules/README.md` и `tasks/lessons.md` в начале каждого чата.

---

## ⛔ ГЛАВНОЕ ПРАВИЛО

Никаких изменений без явного согласования с пользователем.
Заметил баг или улучшение — сообщи и жди разрешения. Не трогай.

**Исключение:** баг внутри уже согласованного скоупа задачи — чини сам, сообщи после.

---

## LLM_Wiki — контекст экосистемы

В начале каждой сессии прочитать из `arsid0305/llm_wiki` (main):
- `wiki/lessons.md`, `wiki/decisions.md` — кросс-проектные уроки и решения
- `wiki/rules-architecture.md` — canon rules-архитектуры (если ещё не читал)

---

## Каноны (rules как атомы)

Универсальные правила — в `docs/rules/core/*.md` (SSOT в AI_OS, синкается автоматически). Читать нужное по имени:

- Начало / конец сессии — [`docs/rules/core/session-lifecycle.md`](docs/rules/core/session-lifecycle.md)
- Стиль общения — [`docs/rules/core/communication-style.md`](docs/rules/core/communication-style.md)
- Git flow, запрет флагов, правила редактирования — [`docs/rules/core/git-flow.md`](docs/rules/core/git-flow.md)
- GitHub anti-abuse — [`docs/rules/core/github-anti-abuse.md`](docs/rules/core/github-anti-abuse.md)
- Критерии SMALL / BIG — [`docs/rules/core/task-classification.md`](docs/rules/core/task-classification.md)
- Принципы работы с кодом — [`docs/rules/core/code-principles.md`](docs/rules/core/code-principles.md)
- Subagents (worktree, JSON-schema контракты, выбор модели) — [`docs/rules/core/subagents.md`](docs/rules/core/subagents.md)
- Audit-триггер — [`docs/rules/core/audit-trigger.md`](docs/rules/core/audit-trigger.md)

**Специфика design-system** (scoped): [`docs/rules/scoped/design-system-specific.md`](docs/rules/scoped/design-system-specific.md) — review превью, CSS-токены, безопасность HTML, структура preview/.

Архитектура rules и правила синка — [`docs/rules/README.md`](docs/rules/README.md).

---

## TEMPLATE репо — автодоступ

`github.com/Arsid0305/TEMPLATE` содержит шаблоны для всех проектов.

```bash
git clone https://github.com/Arsid0305/TEMPLATE /tmp/arsid-template
```

Репо публичное — работает без токена.

---

## Инфраструктура

- Репо: github.com/Arsid0305/design-system
- Тип: дизайн-система, статические HTML-превью компонентов
- Подключается к проектам как git submodule
- Стек: HTML + CSS + JavaScript (без фреймворков, без Node.js)

## Среда Claude

- Node.js / npm: не требуется
- Supabase CLI: не используется

## Рабочий процесс

Ветка `claude/...` → PR в `main` → `automerge.yml` через GitHub API (squash). Никогда не пушить в `main` напрямую.

---

## Открытые баги

_(пусто)_
