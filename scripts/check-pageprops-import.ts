// scripts/check-pageprops-import.ts
import fs from 'fs'
import path from 'path'

const rootDir = path.resolve('src', 'app')
const illegalImport = `import type { PageProps } from 'next'`

function scanDirectory(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      scanDirectory(fullPath)
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      const content = fs.readFileSync(fullPath, 'utf-8')
      if (content.includes(illegalImport)) {
        const lines = content.split('\n')
        const lineNum = lines.findIndex(line => line.includes(illegalImport)) + 1

        console.warn(`🚫 发现非法 PageProps 导入 -> ${fullPath}:${lineNum}`)
      }
    }
  }
}

console.log('🔎 正在扫描非法 PageProps 导入...')
scanDirectory(rootDir)
console.log('✅ 扫描完成。请移除所有非法导入。')
