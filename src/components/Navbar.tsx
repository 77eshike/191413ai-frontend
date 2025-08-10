'use client'

import React, { useState, useEffect } from 'react'
import type { User } from '@/types/user'
import { getUserInfo } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await getUserInfo()
        setUser(userInfo)
      } catch (err) {
        console.error('获取用户信息失败', err)
        setUser(null)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
      })
      setUser(null)
      router.push('/login')
    } catch (err) {
      console.error('退出登录失败', err)
    }
  }

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
      <div className="text-xl font-bold">191413AI 控制台</div>
      {user ? (
        <div className="flex items-center space-x-4">
          <span>{user.nickname || user.username}</span>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">
            退出登录
          </button>
        </div>
      ) : (
        <button
          onClick={() => router.push('/login')}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
        >
          登录
        </button>
      )}
    </nav>
  )
}
