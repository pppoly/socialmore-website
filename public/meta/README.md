# Meta & Favicon Assets

Place the following files in this directory prior to release:

- `favicon.svg` and `favicon.ico`
- `apple-touch-icon.png`
- `site.webmanifest`

Using this folder keeps metadata assets versioned (as text) without storing binary icons in Git. Remember to optimize each icon (under 50KB) and ensure paths remain relative to the site root (`/`) when referenced from `index.html` or future meta tags.
