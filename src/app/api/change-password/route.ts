import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { getUserWithPasswordById, updateUserPassword } from '@/lib/db'
import { verifyPassword } from '@/lib/hash'

export async function PATCH(req: NextRequest) {
  try {
    const authUser = await getUserFromRequest()
    if (!authUser) {
      return NextResponse.json({ message: '未登录' }, { status: 401 })
    }

    const { oldPassword, newPassword } = await req.json()

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ message: '缺少参数' }, { status: 400 })
    }

    const user = await getUserWithPasswordById(authUser.userId)
    if (!user || !user.password) {
      return NextResponse.json({ message: '用户信息异常' }, { status: 400 })
    }

    const isMatch = await verifyPassword(oldPassword, user.password)
    if (!isMatch) {
      return NextResponse.json({ message: '原密� �错误' }, { status: 403 })
    }

    await updateUserPassword(user.id, newPassword)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('修改密� �失败:', error)
    return NextResponse.json({ message: '服务器内部错误' }, { status: 500 })
  }
}
