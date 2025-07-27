'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface AuthUser {
  userId: number;
  username: string;
  role: string;
  nickname?: string;
  avatar?: string;
  email?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMe = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/me');
      setUser(res.data);
    } catch (err) {
      setUser(null);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError('未登录');
        } else {
          setError(err.message);
        }
      } else {
        setError('未知错误');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout');
      setUser(null);
    } catch (err) {
      console.error('登出失败:', err);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return { user, loading, error, refresh: fetchMe, logout };
}
