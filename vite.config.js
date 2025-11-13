import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // base ensures assets work when the site is served from the /socialmore-website/ sub-path on GitHub Pages.
  base: '/socialmore-website/',
  plugins: [vue()],
  build: {
    // GitHub Pages serves from docs/ on the main branch, so build output must live there.
    outDir: 'docs',
  },
});
