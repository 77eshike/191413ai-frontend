// src/app/api/projects/create/route.ts
import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { pool } from '@/lib/db'

export async function POST(req: Request) {
  const user = await getUserFromRequest()
  if (!user) return NextResponse.json({ message: '未登录' }, { status: 401 })

  const { name, description } = await req.json()
  if (!name || !name.trim()) {
    return NextResponse.json({ message: '项目名称不能为空' }, { status: 400 })
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO projects (owner_id, name, description) VALUES (?, ?, ?)',
      [user.userId, name, description || null],
    )

    return NextResponse.json({
      id: (result as any).insertId,
      name,
      description: description || '',
    })
  } catch (error) {
    console.error('创建项目失败:', error)
    return NextResponse.json({ message: '项目创建失败' }, { status: 500 })
  }
}
