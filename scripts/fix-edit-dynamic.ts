// scripts/fix-edit-dynamic.ts
import fs from 'fs'
import path from 'path'

const filePath = path.resolve('src/app/dashboard/[id]/edit/page.tsx')

let content = fs.readFileSync(filePath, 'utf-8')

// 检查是否包含错误 params 类型定义
const fixedContent = content.replace(
  /export default async function EditProjectPage\(\{\s*params\s*\}:\s*\{\s*params:.*?\}\)/s,
  `export default async function EditProjectPage({ params }: { params: { id: string } })`,
)

if (content !== fixedContent) {
  fs.writeFileSync(filePath, fixedContent, 'utf-8')
  console.log(`✅ 已修复: ${filePath}`)
} else {
  console.log(`ℹ️ 无需修复: ${filePath} 已符合规范`)
}
