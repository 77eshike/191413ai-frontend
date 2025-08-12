// src/lib/jwt.ts
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import {
  type JwtPayload,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from './jwt-core'

// 统一导出（兼容旧代� �）
export {
  type JwtPayload,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
}

// 从请求（NextRequest）解析用户：优先读 Authorization，其次读 Cookie
export async function getUserFromRequest(req: NextRequest): Promise<JwtPayload | null> {
  try {
    // 1) Authorization: Bearer xxx
    const auth = req.headers.get('authorization') ?? req.headers.get('Authorization')
    if (auth?.startsWith('Bearer ')) {
      const token = auth.slice('Bearer '.length).trim()
      return verifyAccessToken(token)
    }

    // 2) Cookies: access_token
    const cookieToken =
      req.cookies.get('access_token')?.value || (await cookies()).get('access_token')?.value
    if (cookieToken) {
      return verifyAccessToken(cookieToken)
    }

    return null
  } catch {
    return null
  }
}

// 如果� 需要一次性生成两种 token：
export function generateTokens(payload: JwtPayload) {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  }
}
