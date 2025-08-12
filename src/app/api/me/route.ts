import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { getUserById } from '@/lib/db'

export async function GET(_req: NextRequest) {
  const user = (await getUserFromRequest()) as { userId: number }

  if (!user) {
    return NextResponse.json({ message: '未登录' }, { status: 401 })
  }

  const dbUser = await getUserById(user.userId)

  if (!dbUser) {
    return NextResponse.json({ message: '用户未找到' }, { status: 404 })
  }

  return NextResponse.json({
    id: dbUser.id,
    username: dbUser.username,
    email: dbUser.email,
    nickname: dbUser.nickname,
    avatar: dbUser.avatar,
    role: dbUser.role,
  })
}
