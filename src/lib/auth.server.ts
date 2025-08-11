// src/lib/auth.server.ts
import 'server-only'
import { cookies, headers } from 'next/headers'
import type { CookieOptions } from 'next/dist/compiled/@edge-runtime/cookies'
import { redirect } from 'next/navigation'
import { generateAccessToken, verifyAccessToken } from '@/lib/jwt-core'

export interface Me {
  userId?: number
  username?: string
  nickname?: string
  role?: string
  [k: string]: any
}

const ACCESS_TOKEN = 'accessToken'

/** 统一的 cookie 选项（可按需调整） */
const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
}

/** 在服务端签发并写入 accessToken（允许 console） */
export async function issueAccessTokenCookie(
  payload: Record<string, unknown>,
  options?: Partial<CookieOptions>,
) {
  const token = generateAccessToken(payload)
  const store = await cookies()
  store.set(ACCESS_TOKEN, token, { ...defaultCookieOptions, ...options })
  console.info('[auth] access token issued for', payload?.['username'] ?? payload?.['userId'])
}

/** 清除 accessToken */
export async function clearAccessTokenCookie() {
  const store = await cookies()
  store.delete(ACCESS_TOKEN)
  console.info('[auth] access token cleared')
}

/** 从 cookie 验证并获取用户（验证失败返回 null） */
export async function getServerUser(): Promise<Me | null> {
  const store = await cookies()
  const token = store.get(ACCESS_TOKEN)?.value
  if (!token) return null
  try {
    const u = verifyAccessToken(token) as unknown as Me
    return u ?? null
  } catch (err) {
    console.warn('[auth] token verify failed:', (err as Error)?.message)
    return null
  }
}

/** 必须登录的场景；未登录时可选择 redirect 或抛错 */
export async function requireServerUser(opts?: { redirectTo?: string }): Promise<Me> {
  const me = await getServerUser()
  if (me) return me
  if (opts?.redirectTo) {
    console.warn('[auth] unauthenticated, redirect to', opts.redirectTo)
    redirect(opts.redirectTo)
  }
  throw new Error('Unauthenticated')
}

/** 获取来路 IP/UA 等（可用于审计日志） */
export async function getRequestMeta() {
  const h = await headers()
  return {
    ip: h.get('x-forwarded-for') ?? '',
    ua: h.get('user-agent') ?? '',
    referer: h.get('referer') ?? '',
  }
}
