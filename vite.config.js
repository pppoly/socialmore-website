import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // Required so assets resolve correctly when the site is deployed to GitHub Pages.
  base: '/socialmore-website/',
  plugins: [vue()],
});
