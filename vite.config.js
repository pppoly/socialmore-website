import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/socialmore-website/',
  plugins: [vue()],
  build: {
    outDir: 'docs',   // ✅ 用 docs 当输出目录
    // Inline static assets to avoid generating extra binary files (e.g. hero JPG) in docs/
    assetsInlineLimit: 5 * 1024 * 1024,
  },
});
