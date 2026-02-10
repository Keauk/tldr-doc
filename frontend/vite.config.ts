import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/summarize': {
        target: 'http://localhost:5055',
        changeOrigin: true,
      },
    },
  },
})
