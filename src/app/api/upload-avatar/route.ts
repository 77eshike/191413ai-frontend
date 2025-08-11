import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/jwt'
import path from 'path'
import fs from 'fs/promises'
import crypto from 'crypto'

export const runtime = 'nodejs'

const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif'])

export async function POST(req: NextRequest) {
  try {
    // 1) 鉴权
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ message: '未授权' }, { status: 401 })

    // 2) 取文件
    const formData = await req.formData()
    const file = formData.get('avatar') as File | null
    if (!file) return NextResponse.json({ message: '缺少文件' }, { status: 400 })

    // 3) � �验
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ message: '不支持的文件类型' }, { status: 415 })
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ message: '文件过大（上限 5MB）' }, { status: 413 })
    }

    // 4) 目录
    const uploadsDir = path.join(process.cwd(), 'public/uploads')
    await fs.mkdir(uploadsDir, { recursive: true })

    // 5) 文件名
    const ext =
      path.extname(file.name) ||
      (
        {
          'image/png': '.png',
          'image/jpeg': '.jpg',
          'image/webp': '.webp',
          'image/gif': '.gif',
        } as Record<string, string>
      )[file.type] ||
      '.bin'
    const filename = `${crypto.randomUUID()}${ext}`

    // 6) 写入
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(arrayBuffer))
    await fs.writeFile(path.join(uploadsDir, filename), buffer)

    // 7) 返回相对路径
    return NextResponse.json({ message: '上� 成功', path: `/uploads/${filename}` })
  } catch {
    return NextResponse.json({ message: '上� 失败' }, { status: 500 })
  }
}
