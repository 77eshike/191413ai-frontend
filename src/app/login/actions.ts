// src/app/login/actions.ts
'use client'

import { useRouter } from 'next/navigation'
import { withToken } from '@/lib/request'
import { User } from '@/store/useUserStore'

type SetUserFn = (user: User) => void

export async function loginAction(
  username: string,
  password: string,
  router: ReturnType<typeof useRouter>,
  setUser: SetUserFn,
) {
  try {
    const res = await withToken.post('/api/login', { username, password })
    const data = res.data

    setUser({
      id: data.id,
      username: data.username,
      nickname: data.nickname,
      avatar: data.avatar,
      role: data.role,
    })

    router.push('/dashboard')
  } catch (error) {
    console.error('登录失败:', error)
    throw error
  }
}
