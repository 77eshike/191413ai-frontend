import { updateUserRole } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest()
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ message: '权限不足' }, { status: 403 })
  }

  const { id, role } = await req.json()
  await updateUserRole(id, role)
  return NextResponse.json({ success: true })
}
