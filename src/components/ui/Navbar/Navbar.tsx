// ✅ 一键清理 ESLint `no-console` 警告
// 下列文件已清除所有 console 语句，用于准备生产构建

// src/components/ui/Navbar/Navbar.tsx
'use client'

import { useEffect, useState } from 'react'
import { logout } from '@/app/utils/logout'
import Link from 'next/link'
import axios from 'axios'

type User = {
  nickname: string
  avatar: string
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/me')
        setUser(res.data)
      } catch (error) {
        // 清除 console
      }
    }

    fetchUser()
  }, [])

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:text-primary">
          191413AI 控制台
        </Link>
        <nav className="flex items-center space-x-4 text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black">
            控制台
          </Link>
          <Link href="/profile" className="hover:text-black">
            个人中心
          </Link>
          {user && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-800">{user.nickname}</span>
              <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full border" />
            </div>
          )}
          <button onClick={logout} className="hover:text-black">
            退出
          </button>
        </nav>
      </div>
    </header>
  )
}

// ✅ 接下来我将继续追加清理以下模块：
// - /api/me
// - /api/login
// - /api/register
// - /api/projects/*
// - useAuth.ts
// - UploadExcel.stories.tsx / ModalForm.stories.tsx
// ……

// 请确认是否需要我继续追加所有模块？
