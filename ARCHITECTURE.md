# SOCIALMORE Preview Architecture

This project is the editable preview site for SOCIALMORE. It is designed to run now with local content and later connect to an API, CMS, or database-backed backend without rewriting page components.

## Current Runtime

- Framework: Vue 3 + Vite
- Routing: Vue Router
- Styling: SCSS and scoped Vue styles
- Local content: `src/composables/useI18n.js`, `src/data/news.js`
- Runtime adapters: `src/services/*`
- Production output: `docs/`

## Data Flow

```text
Vue page/component
  -> composable or repository
  -> src/services/*
  -> local data fallback OR backend API
```

The important rule is that page components should not call a database directly. They call a repository function. The repository decides whether to use local mock data or a backend endpoint based on environment variables.

## Environment Variables

Copy `.env.example` to `.env.local` for local-only configuration.

```bash
cp .env.example .env.local
```

Use local content during preview:

```bash
VITE_CONTENT_MODE=local
VITE_CONTACT_MODE=mock
```

Use backend APIs later:

```bash
VITE_CONTENT_MODE=api
VITE_API_BASE_URL=https://api.socialmore.co.jp
VITE_CONTACT_MODE=api
VITE_CONTACT_ENDPOINT=/api/contact
```

Expected backend endpoints:

- `GET /api/news`
- `GET /api/news/:id`
- `POST /api/contact`

## Suggested Backend Contract

`GET /api/news` should return:

```json
[
  {
    "id": 3,
    "date": "2026-02-20",
    "title": { "ja": "記事タイトル", "en": "Article title", "zh": "文章标题" },
    "summary": { "ja": "概要", "en": "Summary", "zh": "摘要" },
    "cover": "/news/news2.png",
    "content": {
      "ja": ["本文1", "本文2"],
      "en": ["Body 1", "Body 2"],
      "zh": ["正文1", "正文2"]
    }
  }
]
```

`POST /api/contact` receives:

```json
{
  "name": "Name",
  "email": "user@example.com",
  "phone": "080-0000-0000",
  "organization": "Company",
  "inquiryType": "コミュニティ運営支援について",
  "message": "Message"
}
```

It should return:

```json
{ "ok": true, "id": "inquiry_123" }
```

## Development Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

Do not edit `docs/` by hand. It is the generated build output.
