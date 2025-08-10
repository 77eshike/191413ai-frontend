// scripts/fix-dynamic-route-props.ts
import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'

const targetDir = 'src/app/dashboard/[id]'
const files = glob.sync(`${targetDir}/**/page.tsx`)

files.forEach(filePath => {
  const absolutePath = path.resolve(filePath)
  let content = fs.readFileSync(absolutePath, 'utf-8')

  // 匹配错误的 params 类型定义
  const fixed = content.replace(
    /export default async function\s+\w+\s*\(\{\s*params\s*\}:\s*\{\s*params:.*?\}\)/s,
    `export default async function EditProjectPage({ params }: { params: { id: string } })`,
  )

  if (content !== fixed) {
    fs.writeFileSync(absolutePath, fixed, 'utf-8')
    console.log(`✅ 已修复: ${filePath}`)
  } else {
    console.log(`ℹ️ 无需修复: ${filePath} 已符合规范`)
  }
})
