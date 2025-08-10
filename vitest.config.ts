import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: './', // ✅ 解决 "Failed to fetch dynamically imported module" 问题
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0', // ✅ 支持远程 IP/域名访问
    port: 6006,
  },
})
