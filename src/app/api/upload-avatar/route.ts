import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import formidable from 'formidable'
import fs from 'fs/promises'
import path from 'path'

// 解决 formidable 类型不识别问题
import type { IncomingMessage } from 'http'
import { Readable } from 'stream'

// 禁用默认的 body 解析
export const config = {
  api: {
    bodyParser: false,
  },
}

function parseForm(req: IncomingMessage): Promise<formidable.Files> {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
    uploadDir: path.join(process.cwd(), 'public/uploads'),
    filename: (_name, _ext, part) => {
      const timestamp = Date.now()
      const clean = (part.originalFilename || 'upload').replace(/\s+/g, '_')
      return `${timestamp}_${clean}`
    },
  })

  return new Promise((resolve, reject) => {
    form.parse(req, (err, _fields, files) => {
      if (err) reject(err)
      else resolve(files)
    })
  })
}

export async function POST(req: NextRequest): Promise<Response> {
  const user = getUserFromRequest()
  if (!user) {
    return NextResponse.json({ message: '未授权' }, { status: 401 })
  }

  const uploadsDir = path.join(process.cwd(), 'public/uploads')
  await fs.mkdir(uploadsDir, { recursive: true })

  // 获取原始 req 流
  const body = await req.body?.getReader().read()
  if (!body || !body.value) {
    return NextResponse.json({ message: '无上传内容' }, { status: 400 })
  }

  const buffer = body.value
  const stream = Readable.from(buffer)

  // 构造兼容的 Node.js 请求
  const fakeReq = Object.assign(stream, {
    headers: Object.fromEntries(req.headers),
    method: req.method,
    url: req.nextUrl.pathname,
  }) as unknown as IncomingMessage

  const files = await parseForm(fakeReq)
  const file = files.file as formidable.File | formidable.File[]

  if (!file || Array.isArray(file)) {
    return NextResponse.json({ message: '文件上传失败' }, { status: 400 })
  }

  const relativePath = `/uploads/${path.basename(file.filepath)}`
  return NextResponse.json({ message: '上传成功', path: relativePath })
}
