// src/app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from '@/lib/auth'
import { pool } from '@/lib/db'
import { serialize } from 'cookie'
import type { RowDataPacket } from 'mysql2'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ message: '用户名和密码不能为空' }, { status: 400 })
    }

    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [
      username,
    ])

    const user = rows[0]
    if (!user) {
      return NextResponse.json({ message: '用户不存在' }, { status: 404 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: '密码错误' }, { status: 401 })
    }

    const accessToken = await generateAccessToken({
      userId: user.id,
      username: user.username,
      role: user.role,
    })

    const refreshToken = await generateRefreshToken({
      userId: user.id,
      username: user.username,
      role: user.role,
    })

    const accessCookie = serialize('token', accessToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60,
    })

    const refreshCookie = serialize('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    })

    return new NextResponse(
      JSON.stringify({
        message: '登录成功',
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        avatar: user.avatar,
        role: user.role,
      }),
      {
        status: 200,
        headers: {
          'Set-Cookie': [accessCookie, refreshCookie].join(', '),
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('登录失败:', error)
    return NextResponse.json({ message: '服务器错误' }, { status: 500 })
  }
}
