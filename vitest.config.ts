// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
  test: {
    environment: 'jsdom',
    globals: true, // ✅ 开启全局 describe/it/expect
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    clearMocks: true, // ✅ 每个用例清理 mock 调用记录
    restoreMocks: true, // ✅ 还原被 mock 的原生方法
    mockReset: true, // ✅ 重置 mock 的实现
    // 把备份目录的测试全部排除
    exclude: ['**/node_modules/**', '**/dist/**', '**/.quick-fix-backup/**'],
  },
})
