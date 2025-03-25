import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 如果需要添加全局变量或mixins
        // additionalData: `@import "./src/scss/_variables.scss";`
      }
    }
  }
});