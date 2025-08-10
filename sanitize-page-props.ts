import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'

const ROOT_DIR = 'src/app'
const PAGE_PATTERN = '**/page.tsx'

function sanitizePageProps(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8')
  let updated = content

  // 修复 PageProps 泛型定义
  updated = updated.replace(/\{\s*params\s*\}\s*:\s*PageProps<.*?>/, '{ params: { id: string } }')

  // 替换错误命名函数（如 Create 页面函数名却叫 Edit）
  if (filePath.includes('/create/')) {
    updated = updated.replace(
      /export\s+default\s+async\s+function\s+\w+/,
      'export default function CreateProjectPage',
    )
  }

  // 移除任何 Promise<any> 类型约束
  updated = updated.replace(/: Promise<any>/g, '')

  // 防止 async 客户端组件函数声明（误用）
  if (updated.includes("'use client'")) {
    updated = updated.replace(/export\s+default\s+async\s+function/, 'export default function')
  }

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf-8')
    console.log(`✅ 已修复: ${filePath}`)
  } else {
    console.log(`✔️ 无需修复: ${filePath}`)
  }
}

function run() {
  const files = glob.sync(path.join(ROOT_DIR, PAGE_PATTERN), { absolute: true })
  console.log('🧼 正在扫描并修复 page.tsx 文件中的 PageProps 问题...')
  for (const file of files) {
    sanitizePageProps(file)
  }
  console.log('🎉 所有目标文件处理完毕。')
}

run()
