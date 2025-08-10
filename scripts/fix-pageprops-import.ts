import { promises as fs } from 'fs'
import path from 'path'
import fg from 'fast-glob'

async function fixPagePropsImport() {
  const files = await fg('src/app/**/page.tsx')

  for (const file of files) {
    const absPath = path.resolve(file)
    const content = await fs.readFile(absPath, 'utf-8')

    if (!content.includes('PageProps')) continue

    let updated = content

    // 移除导入 PageProps
    updated = updated.replace(/import\s+type\s+{\s*PageProps\s*}\s+from\s+['"]next['"];?/g, '')

    // 替换函数参数中使用 PageProps 的写法
    updated = updated.replace(
      /export\s+default\s+async\s+function\s+(\w+)\s*\(\s*{\s*params\s*}\s*:\s*PageProps\s*\)/g,
      'export default async function $1({ params }: { params: { id: string } })',
    )

    // 写回文件
    await fs.writeFile(absPath, updated, 'utf-8')
    console.log(`✅ 已修复: ${file}`)
  }

  console.log('🎉 所有非法 PageProps 导入已修复完毕。请重新构建。')
}

fixPagePropsImport().catch(console.error)
