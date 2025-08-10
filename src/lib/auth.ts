import { cookies } from 'next/headers'
import type { TokenPayload } from './jwt-core'
import {
  verifyToken,
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from './jwt-core'

/**
 * 从请求中获取 JWT Token，并进行验证
 */
export async function getUserFromRequest(): Promise<TokenPayload | null> {
  const cookieStore = await cookies() // ✅ 加上 await
  const token = cookieStore.get('accessToken')?.value
  if (!token) return null

  try {
    const decoded = await verifyToken(token)
    return decoded
  } catch (err) {
    console.error('JWT 校验失败:', err)
    return null
  }
}

/**
 * 获取 refreshToken，用于刷新 token 接口中调用
 */
export async function getRefreshTokenFromRequest(): Promise<string | null> {
  const cookieStore = await cookies() // ✅ 加上 await
  return cookieStore.get('refreshToken')?.value || null
}

export { verifyToken, verifyRefreshToken, generateAccessToken, generateRefreshToken }

export type { TokenPayload }
