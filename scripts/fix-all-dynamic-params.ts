// scripts/fix-all-dynamic-params.ts
import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'

const files = glob.sync('src/app/**/[id]/**/page.tsx')

files.forEach(filePath => {
  const fullPath = path.resolve(filePath)
  let content = fs.readFileSync(fullPath, 'utf-8')

  const oldPattern =
    /export\s+default\s+async\s+function\s+\w+\s*\(\s*\{\s*params\s*\}\s*:\s*\{[\s\S]*?params\s*:\s*.*?\}\s*\)/gm
  const corrected = content.replace(
    oldPattern,
    `export default async function Page({ params }: { params: { id: string } })`,
  )

  if (corrected !== content) {
    fs.writeFileSync(fullPath, corrected, 'utf-8')
    console.log(`✅ 修复完成: ${filePath}`)
  } else {
    console.log(`✔️ 无需修复: ${filePath}`)
  }
})
