import { NextRequest, NextResponse } from 'next/server'
import { getProjectById } from '@/lib/db'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const id = url.pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ error: '缺少项目ID' }, { status: 400 })
  }

  const project = await getProjectById(Number(id))
  if (!project) {
    return NextResponse.json({ error: '项目不存在' }, { status: 404 })
  }

  return NextResponse.json(project)
}
