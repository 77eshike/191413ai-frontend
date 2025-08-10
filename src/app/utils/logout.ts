// src/app/utils/logout.ts
'use client'

export function logout() {
  // 清除 JWT 和 Refresh Token（设置过期时间为过去）
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  window.location.href = '/login'
}
