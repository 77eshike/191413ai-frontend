// src/lib/useAuth.ts
'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export interface AuthUser {
  userId: number
  username: string
  role: string
  nickname?: string
  avatar?: string
  email?: string
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMe = async (): Promise<void> => {
    try {
      setLoading(true)
      const res = await axios.get<AuthUser>('/api/me')
      setUser(res.data)
      setError(null)
    } catch (e: unknown) {
      setUser(null)
      if (axios.isAxiosError(e)) {
        setError(e.response?.status === 401 ? '未登录' : e.message)
      } else {
        setError('未知错误')
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await axios.post('/api/logout')
      setUser(null)
    } catch {
      // 忽略登出错误，前端状态已清
    }
  }

  useEffect(() => {
    void fetchMe() // ✅ 避免 no-floating-promises
  }, [])

  return { user, loading, error, refresh: fetchMe, logout }
}
