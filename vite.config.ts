import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 后端服务器地址
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, '')  // 如果后端接口不需要 /api 前缀，可以启用这行
      }
    }
  }
})