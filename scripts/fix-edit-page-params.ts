// scripts/fix-edit-page-params.ts
import fs from 'fs'
import path from 'path'

const filePath = path.resolve(process.cwd(), 'src/app/dashboard/[id]/edit/page.tsx')

if (!fs.existsSync(filePath)) {
  console.error(`❌ 找不到目标文件: ${filePath}`)
  process.exit(1)
}

let content = fs.readFileSync(filePath, 'utf-8')

const pattern = /export\s+default\s+function\s+\w+\s*\(\s*\{\s*params\s*\}\s*\)/

if (pattern.test(content)) {
  content = content.replace(
    pattern,
    'export default async function EditProjectPage({ params }: { params: { id: string } })',
  )
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`✅ 已修复: ${filePath}`)
} else {
  console.log(`✔️ 无需修复: ${filePath}`)
}
