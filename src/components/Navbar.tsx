// src/components/Navbar.tsx
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStatus } from '@/hooks/useAuthStatus'

export default function Navbar() {
  const router = useRouter()
  const { user, isLoading } = useAuthStatus()

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' })
    } catch {
      // 忽略登出错误，继续跳转
    } finally {
      router.push('/login')
    }
  }

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div
        className="text-lg font-semibold cursor-pointer"
        onClick={() => router.push('/dashboard')}
      >
        191413AI 控制台
      </div>
      <div className="flex items-center space-x-4">
        {isLoading ? (
          <span>加载中...</span>
        ) : user ? (
          <>
            <span>{user.nickname || user.username}</span>
            <button
              onClick={() => {
                void handleLogout()
              }}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              退出
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
          >
            登录
          </button>
        )}
      </div>
    </nav>
  )
}
