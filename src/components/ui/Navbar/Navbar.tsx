// src/components/ui/Navbar/Navbar.tsx
'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStatus } from '@/hooks/useAuthStatus'

export default function Navbar() {
  const router = useRouter()
  const { user, isLoading } = useAuthStatus()

  // 主题状态：首帧已通过 layout 注入了 class，这里仅同步一次 state
  const [isDark, setIsDark] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme')
      const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(stored ? stored === 'dark' : prefers)
    } catch {
      setIsDark(false)
    }
  }, [])

  const applyTheme = useCallback((dark: boolean) => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    setIsDark(dark)
  }, [])

  const toggleTheme = useCallback(() => {
    if (isDark === null) return
    applyTheme(!isDark)
  }, [isDark, applyTheme])

  // 退出：不需要 await router.push
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* 品牌区（使用 Link，键盘可达） */}
        <Link
          href="/dashboard"
          aria-label="返回控制台首页"
          className="flex cursor-pointer items-center gap-2"
        >
          <div className="size-7 rounded-lg bg-primary/15" aria-hidden />
          <span className="text-sm font-semibold tracking-wide">191413AI 控制台</span>
        </Link>

        {/* 右侧：导航 + 主题 + 登录/退出 */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard">控制台</Link>
          <Link href="/profile">个人中心</Link>

          <ThemeToggleButton isDark={isDark} onToggle={toggleTheme} />

          {isLoading ? (
            <span>加载中...</span>
          ) : user ? (
            <>
              <span>{user.nickname || user.username}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
              >
                退出
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
            >
              登录
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

/* 子组件：主题切换按钮（纯 SVG，无依赖） */
function ThemeToggleButton({ isDark, onToggle }: { isDark: boolean | null; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={isDark === null}
      aria-pressed={isDark ?? false}
      aria-label="切换主题"
      className={[
        'group inline-flex items-center justify-center rounded-md border border-border',
        'bg-background px-3 py-2 text-sm transition',
        'hover:bg-primary/10 active:scale-[0.98]',
        'disabled:cursor-not-allowed disabled:opacity-60',
      ].join(' ')}
    >
      <span
        className={[
          'inline-flex size-4 items-center justify-center transition',
          'duration-300 ease-out will-change-transform',
          isDark ? 'rotate-0 scale-100' : 'rotate-180 scale-95',
        ].join(' ')}
        aria-hidden
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
      <span className="ml-2 hidden sm:inline">{isDark ? '深色模式' : '浅色模式'}</span>
    </button>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4">
      <circle cx="12" cy="12" r="4" className="fill-foreground" />
      <g className="stroke-foreground" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="M4.93 4.93l1.41 1.41" />
        <path d="M17.66 17.66l1.41 1.41" />
        <path d="M4.93 19.07l1.41-1.41" />
        <path d="M17.66 6.34l1.41-1.41" />
      </g>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4">
      <path className="fill-foreground" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" />
    </svg>
  )
}
