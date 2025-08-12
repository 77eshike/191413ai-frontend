// src/app/utils/logout.ts
'use client'

/**
 * 安全登出：清 Cookie + 跳转登录
 * 注意：后端如果设置了 domain、path 等属性，删除时也要匹配；这里做了常见兜底。
 * @param to 跳转地址（默认 /login）
 */
export function logout(to: string = '/login') {
  try {
    const names = ['token', 'refreshToken']
    const host = typeof location !== 'undefined' ? location.hostname : ''
    const domains = host ? ['', host, '.' + host.replace(/^www\./, '')] : ['']
    const paths = ['/', '']

    // 尽最大可能清理掉不同 domain/path 下的同名 cookie
    names.forEach(name => {
      domains.forEach(domain => {
        paths.forEach(path => {
          document.cookie = `${name}=; Max-Age=0; path=${path}`
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`
          if (domain) {
            document.cookie = `${name}=; Max-Age=0; domain=${domain}; path=${path}`
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${domain}; path=${path}`
          }
        })
      })
    })
  } catch {
    // 忽略清理异常，保证后续跳转
  } finally {
    window.location.assign(to)
  }
}
