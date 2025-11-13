import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/socialmore-website/',
  plugins: [vue()],
  build: {
    outDir: 'docs',   // ✅ 用 docs 当输出目录
  },
});
