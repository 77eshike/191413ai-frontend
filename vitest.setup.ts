// vitest.setup.ts
import { vi, afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react' // ✅ 新增

// ✅ 每个测试后清理 DOM 和 mocks（解决“multiple elements”）
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  vi.restoreAllMocks()
  vi.resetModules()
})

// 让使用了 jest API 的老用例在 Vitest 下工作
;(globalThis as any).jest = vi

// matchMedia
if (!window.matchMedia) {
  ;(window as any).matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // 旧 API
    removeListener: vi.fn(),
    addEventListener: vi.fn(), // 新 API
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

// ResizeObserver
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
;(globalThis as any).ResizeObserver = MockResizeObserver as any

// URL.createObjectURL / revokeObjectURL
if (!window.URL.createObjectURL) {
  window.URL.createObjectURL = vi.fn(() => 'blob:mock-url')
}
if (!window.URL.revokeObjectURL) {
  window.URL.revokeObjectURL = vi.fn()
}

// 放在文件底部（URL mocks 之后）
vi.mock('next/navigation', () => {
  const push = vi.fn()
  const replace = vi.fn()
  const refresh = vi.fn()
  const back = vi.fn()
  const forward = vi.fn()
  const prefetch = vi.fn()
  return {
    useRouter: () => ({ push, replace, refresh, back, forward, prefetch }),
    usePathname: () => '/tests',
    useSearchParams: () => new URLSearchParams(),
  }
})
