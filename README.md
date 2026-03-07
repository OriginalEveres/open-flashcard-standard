# Open Flashcard Standard (OFS)

**A simple, open, JSON-based format for portable flashcard decks.**

OFS defines a minimal, interoperable structure for flashcard content — what cards *contain* and how they're grouped into sets. It deliberately excludes study progress, scheduling, and SRS logic, which belong to individual applications.

---

## Manifest

| Property          | Value                                      |
|-------------------|--------------------------------------------|
| Version           | `0.1.0`                                    |
| Primary format    | JSON (`.json`)                             |
| Optional bundle   | `.fcpkg` (renamed `.zip`, for local media) |
| npm org           | `@openflashcard`                           |
| Packages       | `@openflashcard/spec`, `@openflashcard/validator` |
| License        | MIT                                        |
| Repo           | https://github.com/OriginalEveres/open-flashcard-standard |

---

## Why OFS?

Existing flashcard formats are proprietary, tightly coupled to their apps, or carry scheduling data that makes them hard to reuse. OFS is:

- **App-agnostic** — no SRS data, no study history
- **Human-readable** — plain JSON you can read and write by hand
- **Portable** — one file, any app that speaks OFS can open it
- **Extensible** — a `metadata` escape hatch on cards and sets for app-specific fields

---

## Packages

| Package                      | Description                                   |
|------------------------------|-----------------------------------------------|
| `@openflashcard/spec`        | Core TypeScript types (no runtime dependency) |
| `@openflashcard/validator`   | Zod-based schema validation                   |

---

## File format

The primary format is a plain `.json` file — a JSON object conforming to the `CardSet` schema, hostable anywhere.

When a deck needs to bundle local media (images, GIFs) into a single portable file, it can be packaged as a `.fcpkg` — a renamed `.zip`:

```
my-deck.fcpkg
├── deck.json
└── media/
    ├── dog.gif
    └── cat.png
```

If all your media is hosted via `https://` URLs, a plain `.json` is all you need.

---

## Quick example

```json
{
  "id": "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
  "name": "Bitcoin Basics",
  "description": "Core concepts behind Bitcoin and how it works.",
  "author": "OFS Project",
  "tags": ["bitcoin", "crypto", "beginner"],
  "cards": [
    {
      "id": "11111111-1111-4111-8111-111111111111",
      "front": [
        { "type": "text", "value": "What is the maximum supply of Bitcoin?" }
      ],
      "back": [
        { "type": "text", "value": "21 million BTC. This hard cap is enforced by the protocol and cannot be changed without consensus from the network." }
      ],
      "tags": ["fundamentals", "supply"]
    }
  ]
}
```

---

## Repo structure

```
open-flashcard-standard/
├── packages/
│   ├── spec/           # Core TypeScript types (no runtime)
│   └── validator/      # Zod-based validation library
├── examples/           # Example .json and .fcpkg files
├── docs/
├── SPEC.md             # Full specification
└── README.md
```

---

## Roadmap

### Milestone 1 — Spec & packages _(current)_

Goal: a stable, publishable foundation that developers can build on.

- [x] Core spec — card and card set schema (`SPEC.md`)
- [x] TypeScript types (`@openflashcard/spec`)
- [ ] Zod-based validator (`@openflashcard/validator`) — validate any JSON against the spec
- [ ] Publish both packages to npm under `@openflashcard`
- [ ] Spec reaches `v1.0.0` (no more breaking changes)

### Milestone 2 — Website & editor

Goal: make OFS accessible to non-developers with a visual tool.

- [ ] Docs & landing site — spec reference, getting started, examples
- [ ] Visual card set editor — create and edit cards in the browser
- [ ] Live preview — see cards as they'll appear when studied
- [ ] Export — download as `.json` or `.fcpkg`
- [ ] Import — load an existing `.json` or `.fcpkg` to edit it

### Later

- [ ] CLI tool — validate and bundle from the command line

---

## Contributing

The spec is in `SPEC.md`. Proposals go through GitHub Issues before anything is merged into the spec.
