// scripts/fix-promise-params.ts
import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'

console.log('🔧 正在修复 Promise<any> 类型的 params 签名...')

const files = glob.sync('src/app/**/page.tsx')

files.forEach(file => {
  const filePath = path.resolve(file)
  const code = fs.readFileSync(filePath, 'utf-8')

  const replaced = code.replace(/params\s*:\s*Promise<[^>]+>/g, 'params: { id: string }')

  if (code !== replaced) {
    fs.writeFileSync(filePath, replaced, 'utf-8')
    console.log(`✅ 已修复: ${file}`)
  }
})

console.log('🎉 所有非法 Promise 类型参数已修复。请重新构建项目。')
