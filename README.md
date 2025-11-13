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

## GitHub Pages deployment

This project is configured to build into the `docs` folder for GitHub Pages.

- Build locally with:

  ```bash
  npm install
  npm run build
  ```

  This will output the production build into `docs/`.

- In the GitHub repository settings:
  - Go to **Settings → Pages**.
  - Set the source to:  
    Branch: `main`  
    Folder: `/docs`.

The site will then be available at:

https://pppoly.github.io/socialmore-website/

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

## Design Assets

The `src/assets` directory now ships with lightweight SVG placeholders (hero visuals, icons, news cover, photo frames, etc.). They
keep the UI fully rendered during development and production builds. When final photography or brand files are ready, simply
replace the corresponding SVG in the matching subfolder—the Vue components import assets via bundler-friendly URLs, so no further
code changes are required.

## Internationalization
All key UI texts, navigation, and CTA labels are pulled from `src/composables/useI18n.js`. The global language switcher in the header toggles between Japanese and English and updates all routes instantly.

## Troubleshooting
A blank white page usually means a JavaScript runtime error prevented Vue from mounting. Open the browser developer tools console to inspect the error message; it typically points to the missing import, router mismatch, or asset path that needs to be fixed.

## Contact
This project is a demo. The contact form performs client-side validation and displays a confirmation message but does not send data to a backend.
