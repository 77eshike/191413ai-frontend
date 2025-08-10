// check-dynamic-params.ts
import fs from 'fs'
import path from 'path'

const APP_DIR = path.resolve('src/app')

const dynamicParamRegex = /\[([^\]]+)\]/ // 捕获动态路由参数如 [id]、[[slug]]
const paramTypeRegex = /params\s*:\s*{[^}]*}/

function findAllDynamicRoutes(dir: string): string[] {
  const results: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (dynamicParamRegex.test(entry.name)) {
        const pageTsx = path.join(fullPath, 'page.tsx')
        const layoutTsx = path.join(fullPath, 'layout.tsx')
        if (fs.existsSync(pageTsx)) results.push(pageTsx)
        if (fs.existsSync(layoutTsx)) results.push(layoutTsx)
      }
      results.push(...findAllDynamicRoutes(fullPath))
    }
  }

  return results
}

function checkParamsType(filePath: string): void {
  const content = fs.readFileSync(filePath, 'utf-8')
  const matches = content.match(paramTypeRegex)

  if (!matches) {
    console.warn(`⚠️  ${filePath} 未检测到 params 类型定义`)
    return
  }

  const typeStr = matches[0]
  const keyMatch = typeStr.match(/id:\s*(\w+)/)

  if (!keyMatch || (keyMatch[1] !== 'string' && keyMatch[1] !== 'number')) {
    console.error(`❌  ${filePath} 中的 params 类型定义可能有误: ${typeStr}`)
  } else {
    console.log(`✅  ${filePath} params 类型看起来正常: ${typeStr}`)
  }
}

function run() {
  console.log('🧩 正在扫描动态路由参数类型...')
  const files = findAllDynamicRoutes(APP_DIR)

  if (files.length === 0) {
    console.log('✅ 未发现动态路由文件')
    return
  }

  for (const file of files) {
    checkParamsType(file)
  }
}

run()
