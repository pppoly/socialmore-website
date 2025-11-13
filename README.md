# SOCIALMORE Website

A bilingual (Japanese / English) marketing site for SOCIALMORE, a tech company that provides SaaS and community services for foreign workers in Japan. Built with Vue 3 + Vite.

## Tech Stack
- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- Vue Router
- Custom lightweight i18n composable (JA / EN)
- SCSS for styling

## Getting Started

```bash
npm install
npm run dev
```

Open the dev server URL (usually <http://localhost:5173>) to view the site.

### Build for production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure
```
src/
  assets/        # global styles
  components/    # shared UI components (header, footer)
  composables/   # custom i18n store
  data/          # mock news data
  router/        # Vue Router setup
  views/         # page-level components
```

## Internationalization
All key UI texts, navigation, and CTA labels are pulled from `src/composables/useI18n.js`. The global language switcher in the header toggles between Japanese and English and updates all routes instantly.

## Troubleshooting
A blank white page usually means a JavaScript runtime error prevented Vue from mounting. Open the browser developer tools console to inspect the error message; it typically points to the missing import, router mismatch, or asset path that needs to be fixed.

## Contact
This project is a demo. The contact form performs client-side validation and displays a confirmation message but does not send data to a backend.
