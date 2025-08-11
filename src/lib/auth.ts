// src/lib/auth.ts
// 客户端可用的轻薄封装：不触碰 cookies，不打印 console

export interface Me {
  userId?: number
  username?: string
  nickname?: string
  role?: string
  [k: string]: any
}

/**
 * 从 /api/me 拉取用户信息（仅客户端）
 * 失败或未登录返回 null
 */
export async function fetchMe(): Promise<Me | null> {
  try {
    const res = await fetch('/api/me', { cache: 'no-store' })
    if (!res.ok) return null
    const data = (await res.json()) as Me
    return data ?? null
  } catch {
    return null
  }
}

/** 粗略判断是否已登录（根据常见字段） */
export function isLoggedIn(user: Me | null | undefined): boolean {
  if (!user) return false
  return Boolean(user.userId ?? user.username ?? user.nickname)
}

/**
 * （可选）安全 decode JWT（不校验签名，仅 Base64 解码）
 * 仅用于读取非敏感声明；安全逻辑应放在服务端 verify。
 */
export function decodeJwtUnverified<T = Record<string, unknown>>(token?: string): T | null {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length < 2) return null
  try {
    const json = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json) as T
  } catch {
    return null
  }
}
