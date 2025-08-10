// src/app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { pool } from '@/lib/db'
import { generateAccessToken, generateRefreshToken } from '@/lib/auth'
import { serialize } from 'cookie'

export async function POST(req: NextRequest) {
  try {
    const { username, password, email, nickname, avatar } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ message: '用户名和密码不能为空' }, { status: 400 })
    }

    const [rows] = await pool.query('SELECT id FROM users WHERE username = ?', [username])
    if ((rows as any[]).length > 0) {
      return NextResponse.json({ message: '用户名已存在' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const [result] = await pool.query(
      `INSERT INTO users (username, password, email, nickname, avatar, role)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [username, hashedPassword, email || '', nickname || '', avatar || '', 'user'],
    )

    const userId = (result as any).insertId

    const accessToken = await generateAccessToken({ userId, username, role: 'user' })
    const refreshToken = await generateRefreshToken({ userId, username, role: 'user' })

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
        message: '注册成功',
        id: userId,
        username,
        nickname,
        avatar,
        role: 'user',
      }),
      {
        status: 201,
        headers: {
          'Set-Cookie': [accessCookie, refreshCookie].join(', '),
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('注册失败:', error)
    return NextResponse.json({ message: '服务器错误' }, { status: 500 })
  }
}
