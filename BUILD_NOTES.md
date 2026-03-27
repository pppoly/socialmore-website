# Build Notes

## News chunk root cause
- Root cause: `src/data/news.js` statically imported `src/assets/news/news1.png` and `src/assets/news/news2.png`, pulling large PNG bytes into the `news-*.js` bundle.
- Fix: moved the images to `public/news/` and replaced imports with string URLs (`/news/news1.png`, `/news/news2.png`). This keeps the JS bundle small and serves images as static assets.

## Chunk size comparison
- Before: `news-*.js` 6,766.08 kB (gzip 5,044.93 kB); `index-*.js` ~2,758.04 kB (gzip ~2,007.04 kB).
- After: `news-*.js` 2.71 kB (gzip 1.25 kB); `index-*.js` 2,758.04 kB (gzip 2,007.05 kB).
- Remaining warning: the chunk size warning now comes from `index-*.js` (> 500 kB). `news-*.js` no longer carries image bytes.

## Notes
- `vite.config.js` now uses `build.emptyOutDir = true` so each build recreates `docs/` from a clean state.
