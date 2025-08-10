import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ message: '登出成功' })
  res.cookies.set('token', '', { path: '/', maxAge: 0 })
  res.cookies.set('refreshToken', '', { path: '/', maxAge: 0 })
  return res
}
