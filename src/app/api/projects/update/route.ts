// src/app/api/projects/update/route.ts
import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { pool } from '@/lib/db'

export async function PATCH(req: Request) {
  const user = await getUserFromRequest()
  if (!user) return NextResponse.json({ message: '未登录' }, { status: 401 })

  const { id, name, description } = await req.json()
  if (!id) return NextResponse.json({ message: '缺少项目 ID' }, { status: 400 })

  try {
    await pool.query(
      'UPDATE projects SET name = ?, description = ?, updated_at = NOW() WHERE id = ? AND owner_id = ?',
      [name, description, id, user.userId],
    )

    return NextResponse.json({ id, name, description })
  } catch (error) {
    console.error('更新项目失败:', error)
    return NextResponse.json({ message: '项目更新失败' }, { status: 500 })
  }
}
