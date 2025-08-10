// src/lib/jwt-core.ts
import { SignJWT, jwtVerify } from 'jose'
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.JWT_SECRET!
const encoder = new TextEncoder()
const decoder = new TextDecoder()

const secretKey = encoder.encode(secret)

export interface TokenPayload {
  userId: number
  username: string
  role: string
  iat?: number
  exp?: number
  [key: string]: unknown // ✅ 添加这一行兼容 JWTPayload 要求
}

// 签发 AccessToken
export async function generateAccessToken(payload: TokenPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30m') // 可根据需要调整
    .sign(secretKey)
}

// 签发 RefreshToken
export async function generateRefreshToken(payload: TokenPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey)
}

// 验证 AccessToken
export async function verifyToken(token: string): Promise<TokenPayload> {
  const { payload } = await jwtVerify<TokenPayload>(token, secretKey)
  return payload
}

// 验证 RefreshToken
export async function verifyRefreshToken(token: string): Promise<TokenPayload> {
  const { payload } = await jwtVerify<TokenPayload>(token, secretKey)
  return payload
}
