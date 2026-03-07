# Open Flashcard Standard — Specification

**Version:** `0.1.0`
**Status:** Draft

---

## 1. Goals

OFS defines a minimal, interoperable data format for flashcard content. It specifies:

- What content a **card** can carry (front and back) and how it looks (background colors)
- How cards are grouped into a **card set**

---

## 2. Content types

A card face is an ordered array of one or more **Content** items. Mixing types is allowed — e.g. a text prompt followed by an image.

### 2.1 Text — `TextContent`

| Field    | Type     | Required | Notes                          |
|----------|----------|----------|--------------------------------|
| `type`   | `"text"` | ✓        |                                |
| `value`  | string   | ✓        | Plain text or Markdown         |

```json
{ "type": "text", "value": "What does **hola** mean?" }
```

### 2.2 Image — `ImageContent`

Supports any image format the host app can render: JPEG, PNG, WebP, GIF (including animated GIFs).

| Field   | Type      | Required | Notes                                    |
|---------|-----------|----------|------------------------------------------|
| `type`  | `"image"` | ✓        |                                          |
| `src`   | string    | ✓        | Filename relative to `media/` in bundle, or a `https://` URL |
| `alt`   | string    | —        | Accessibility description                |

```json
{ "type": "image", "src": "dog.gif", "alt": "Excited dog" }
```

### 2.3 Video — `VideoContent`

Embeddable video via URL. Intended for hosted video (YouTube, Vimeo, etc.). Autoplay and controls are left to the host app.

| Field   | Type      | Required | Notes                            |
|---------|-----------|----------|----------------------------------|
| `type`  | `"video"` | ✓        |                                  |
| `url`   | string    | ✓        | `https://` URL to the video      |
| `title` | string    | —        | Accessible title for the iframe  |

```json
{ "type": "video", "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "title": "Example video" }
```

---

## 3. Card

A **Card** represents a single question/answer pair.

| Field              | Type       | Required | Notes                                          |
|--------------------|------------|----------|------------------------------------------------|
| `id`               | string     | ✓        | Globally unique card identifier                |
| `front`            | Content[]  | ✓        | One or more content items                      |
| `frontBackground`  | HexColor   | —        | Background color of the front face             |
| `back`             | Content[]  | ✓        | One or more content items                      |
| `backBackground`   | HexColor   | —        | Background color of the back face              |
| `tags`             | string[]   | —        | Free-form tags                                 |
| `metadata`         | object     | —        | App-specific escape hatch                      |

`HexColor` is a hex color string matching `^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$` — e.g. `#fff` or `#1a1a1a`.

### Rules

- `front` and `back` must each contain at least one Content item.
- `id` must be a non-empty string, unique within its card set. UUID v4 and SHA-256 hashes are recommended formats.
- `metadata` values may be any JSON-serializable type.

### Example

```json
{
  "id": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
  "front": [
    { "type": "text", "value": "What animal is this?" },
    { "type": "image", "src": "dog.gif", "alt": "Animated dog" }
  ],
  "back": [
    { "type": "text", "value": "A dog 🐕" }
  ],
  "tags": ["animals", "beginner"]
}
```

---

## 4. Card Set

A **CardSet** is a named collection of cards.

| Field         | Type             | Required | Notes                                    |
|---------------|------------------|----------|------------------------------------------|
| `id`          | string           | ✓        | Globally unique set identifier           |
| `name`        | string           | ✓        | Display name                             |
| `description` | string           | —        | Short description of the set             |
| `author`      | string           | —        | Creator name or handle                   |
| `cards`       | Card[]           | ✓        | Ordered array of cards                   |
| `tags`        | string[]         | —        | Free-form tags for the whole set         |
| `metadata`    | object           | —        | App-specific escape hatch                |

### Rules

- `id` must be a non-empty string. UUID v4 and SHA-256 hashes are recommended formats.
- `cards` may be an empty array for an unpopulated set.
- Card `id` values must be unique within a set.

### Example

```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "name": "Spanish Basics",
  "description": "Essential Spanish vocabulary for absolute beginners.",
  "author": "OFS Project",
  "tags": ["spanish", "beginner"],
  "cards": [ ]
}
```

---

## 5. Distribution formats

### 5.1 JSON file (primary)

The primary format is a plain `.json` file containing a `CardSet` object. This is the recommended format for:

- Decks hosted at a URL
- Decks where all media is referenced via `https://` URLs
- Programmatic generation and consumption

```
https://example.com/decks/spanish-basics.json
```

### 5.2 Bundle (`.fcpkg`) — optional

When a deck includes **local media files** (images, GIFs) that need to travel with it, it can be packaged as a `.fcpkg` file — a renamed `.zip` archive:

```
my-deck.fcpkg
├── deck.json      ← required, root CardSet object
└── media/         ← local media files referenced by ImageContent.src
    ├── dog.gif
    └── cat.png
```

Rules:
- `deck.json` must be at the archive root.
- `media/` is only required if cards reference local filenames in `src`.
- `ImageContent.src` local paths are filenames relative to `media/` (no prefix needed).
- External `https://` URLs in `src` or `url` fields do not require files in `media/`.

> If your deck only uses external URLs for media, a plain `.json` file is sufficient. Use `.fcpkg` only when bundling local media.

---

## 6. Versioning

OFS follows [Semantic Versioning](https://semver.org/).

- Validators must reject decks with an incompatible **major** version.
- New optional fields are minor-version changes.
- Breaking removals or renames are major-version changes.

The current version is `0.1.0`. During the `0.x` series the spec may have breaking changes between minor versions.

