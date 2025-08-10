// src/lib/authService.ts
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { NextRequest } from 'next/server'
import { getUserById } from './db'
import type { User } from '@/types'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh_secret'
const encoder = new TextEncoder()

// 生成 Access Token（短期）
export async function generateAccessToken(user: User): Promise<string> {
  return new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(encoder.encode(JWT_SECRET))
}

// 生成 Refresh Token（长期）
export async function generateRefreshToken(user: User): Promise<string> {
  return new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encoder.encode(REFRESH_SECRET))
}

// 解析 Access Token
export async function verifyAccessToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encoder.encode(JWT_SECRET))
    return payload
  } catch {
    return null
  }
}

// 解析 Refresh Token
export async function verifyRefreshToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encoder.encode(REFRESH_SECRET))
    return payload
  } catch {
    return null
  }
}

// 从请求中提取用户信息（推荐接口中使用）
export async function getUserFromRequest(req: NextRequest): Promise<User | null> {
  const token = req.cookies.get('access_token')?.value
  if (!token) return null

  const payload = await verifyAccessToken(token)
  if (!payload?.userId) return null

  const user = await getUserById(Number(payload.userId))
  return user || null
}
