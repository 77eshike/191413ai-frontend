// src/app/register/actions.ts
'use client'

import { useRouter } from 'next/navigation'
import { withToken } from '@/lib/request'
import { type User } from '@/store/useUserStore'

type SetUserFn = (user: User) => void

export async function registerAction(
  data: { username: string; password: string; nickname: string },
  router: ReturnType<typeof useRouter>,
  setUser: SetUserFn,
) {
  try {
    await withToken.post('/api/register', data)

    const res = await withToken.get('/api/me')
    setUser(res.data) // 保存登录用户信息
    router.push('/dashboard')
  } catch (error) {
    console.error('注册失败:', error)
    throw error
  }
}
