// src/app/utils/logout.test.ts
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { logout } from './logout'

describe('logout', () => {
  const originalLocation = window.location

  beforeEach(() => {
    // 重新挂载一个可写的 location，便于断言 assign 调用
    // @ts-expect-error override readonly
    delete (window as any).location
    // @ts-expect-error minimal stub
    window.location = { hostname: 'example.com', assign: vi.fn() } as any

    // 预置 cookies
    document.cookie = 'token=abc; path=/'
    document.cookie = 'refreshToken=xyz; path=/'
  })

  afterEach(() => {
    // 还原 location
    // @ts-expect-error restore
    window.location = originalLocation
    // 清理 cookie（双保险）
    document.cookie = 'token=; Max-Age=0; path=/'
    document.cookie = 'refreshToken=; Max-Age=0; path=/'
    vi.restoreAllMocks()
  })

  it('clears auth cookies and navigates to default /login', () => {
    logout()

    // cookie 已被清除（JSDOM 中过期 cookie 不会出现在 document.cookie）
    expect(document.cookie).not.toMatch(/(^|;\s*)token=/)
    expect(document.cookie).not.toMatch(/(^|;\s*)refreshToken=/)

    // 跳转到默认地址
    const assign = (window.location as any).assign as jest.Mock | ReturnType<typeof vi.fn>
    expect(assign).toHaveBeenCalledTimes(1)
    expect(assign).toHaveBeenCalledWith('/login')
  })

  it('navigates to provided target path', () => {
    logout('/bye')
    const assign = (window.location as any).assign as jest.Mock | ReturnType<typeof vi.fn>
    expect(assign).toHaveBeenCalledWith('/bye')
  })
})
