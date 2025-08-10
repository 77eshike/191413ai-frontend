// src/app/logout/actions.ts
'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'

export async function logoutAction(router: ReturnType<typeof useRouter>, clearUser: () => void) {
  try {
    await axios.post('/api/logout') // 清除 cookie
    clearUser() // 清除状态
    router.push('/login') // 跳转登录页
  } catch (error) {
    console.error('登出失败:', error)
  }
}
