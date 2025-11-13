import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/socialmore-website/',
  plugins: [vue()],
  // 不再强制 outDir=docs；用默认 dist 就好
  // build: { outDir: 'dist' },
});
