import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest()
  if (!user) return NextResponse.json({ message: '未授权' }, { status: 401 })

  const { name } = await req.json()

  // 模拟返回，实际场景应执行 updateProjectName(id, name)
  return NextResponse.json({ message: `项目名称已更新为 ${name}` })
}
