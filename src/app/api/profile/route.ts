import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { updateUserProfile } from '@/lib/db'

export async function PATCH(req: NextRequest) {
  const authUser = (await getUserFromRequest()) as { userId: number }
  if (!authUser) {
    return NextResponse.json({ message: '未授权' }, { status: 401 })
  }

  const { nickname, email, avatar } = await req.json()
  await updateUserProfile(authUser.userId, { nickname, email, avatar })

  return NextResponse.json({ message: '资料已更新' })
}
