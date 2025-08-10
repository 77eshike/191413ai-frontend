'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type User = {
  id: number
  username: string
  nickname: string
  email: string
  avatar: string
  role: string
}

export function useAuthStatus(options?: { redirectToLogin?: boolean }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/me')
        setUser(res.data)
      } catch (err) {
        setError('未登录或获取用户失败')
        setUser(null)

        if (options?.redirectToLogin) {
          router.replace('/login')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [options?.redirectToLogin, router])

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
  }
}
