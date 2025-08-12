'use client'

import { useCallback, useEffect, useState } from 'react'

interface Me {
  userId?: number
  username?: string
  nickname?: string
  role?: string
  [k: string]: any
}

export function useAuthStatus() {
  const [user, setUser] = useState<Me | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refresh = useCallback(async () => {
    const controller = new AbortController()
    try {
      setIsLoading(true)
      const res = await fetch('/api/me', {
        cache: 'no-store',
        signal: controller.signal,
      })
      if (res.ok) {
        const data: Me = await res.json()
        setUser(data)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
      // 不需要在这里 abort；controller 会在本次调用结束时被回收
    }
    return () => controller.abort()
  }, [])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      await refresh()
      if (cancelled) return
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [refresh])

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    refresh, // 手动刷新：登录/退出后可调用
  }
}
