// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: '191413AI 控制台',
  description: '智能控制平台',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
