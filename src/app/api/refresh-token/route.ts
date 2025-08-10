// src/app/api/refresh-token/route.ts
import { NextResponse } from 'next/server'
import { verifyRefreshToken, generateAccessToken } from '@/lib/auth'

import { getRefreshTokenFromRequest } from '@/lib/auth'

export async function POST() {
  const refreshToken = await getRefreshTokenFromRequest() // ✅ 加上 await

  if (!refreshToken) {
    return NextResponse.json({ message: '未提供 refreshToken' }, { status: 401 })
  }

  try {
    const payload = await verifyRefreshToken(refreshToken)
    const accessToken = await generateAccessToken(payload)

    const response = NextResponse.json({ message: 'access token refreshed' })
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    })

    return response
  } catch (error) {
    console.error('刷新 token 失败:', error)
    return NextResponse.json({ message: '无效或过期的 refreshToken' }, { status: 401 })
  }
}
