// src/app/api/projects/delete/route.ts
import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { pool } from '@/lib/db'

export async function DELETE(req: Request) {
  const user = await getUserFromRequest()
  if (!user) return NextResponse.json({ message: '未登录' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ message: '缺少项目 ID' }, { status: 400 })

  try {
    await pool.query('DELETE FROM projects WHERE id = ? AND owner_id = ?', [id, user.userId])
    return NextResponse.json({ message: '� 除成功' })
  } catch (error) {
    console.error('� 除项目失败:', error)
    return NextResponse.json({ message: '项目� 除失败' }, { status: 500 })
  }
}
