// src/app/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { logout } from '../utils/logout';

type User = {
  nickname: string;
  avatar: string;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get('/api/me')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <nav className="flex items-center justify-between bg-white shadow p-4">
      <Link href="/" className="text-xl font-bold">
        191413AI 控制台
      </Link>
      {user ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">{user.nickname}</span>
          <img
            src={user.avatar || '/default-avatar.png'}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <button onClick={logout} className="text-sm text-red-500 hover:underline ml-2">
            退出
          </button>
        </div>
      ) : (
        <Link href="/login" className="text-sm text-blue-500 hover:underline">
          登录
        </Link>
      )}
    </nav>
  );
}
