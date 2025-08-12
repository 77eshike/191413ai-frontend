// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '191413AI 控制台',
  description: 'Frontend console for 191413AI',
}

const themeScript = `
(() => {
  try {
    const stored = localStorage.getItem('theme');
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const dark = stored ? stored === 'dark' : mql.matches;
    const root = document.documentElement;
    if (dark) root.classList.add('dark'); else root.classList.remove('dark');
  } catch {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* 在水合前设置主题，避免首帧闪烁 */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground">{children}</body>
    </html>
  )
}
