// src/app/api/projects/list/route.ts
import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { pool } from '@/lib/db'

export async function GET() {
  const user = await getUserFromRequest()
  if (!user) return NextResponse.json({ message: '未登录' }, { status: 401 })

  try {
    const [rows] = await pool.query(
      'SELECT id, name, description, created_at AS createdAt, updated_at AS updatedAt FROM projects WHERE owner_id = ? ORDER BY created_at DESC',
      [user.userId],
    )
    return NextResponse.json(rows)
  } catch (error) {
    console.error('获取项目列表失败:', error)
    return NextResponse.json({ message: '获取项目失败' }, { status: 500 })
  }
}
