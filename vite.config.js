import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/socialmore-website/',  // 这里非常关键！！
  plugins: [vue()],
});
