// src/app/api/refresh-token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyRefreshToken, generateAccessToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  const cookie = req.headers.get('cookie');
  if (!cookie) {
    return NextResponse.json({ message: '未登录或无刷新令牌' }, { status: 401 });
  }

  const refreshToken = cookie
    .split(';')
    .map(c => c.trim())
    .find(c => c.startsWith('refreshToken='))
    ?.split('=')[1];

  if (!refreshToken) {
    return NextResponse.json({ message: '刷新令牌不存在' }, { status: 401 });
  }

  const payload = verifyRefreshToken(refreshToken);

  if (!payload) {
    return NextResponse.json({ message: '刷新令牌无效或已过期' }, { status: 403 });
  }

  const newAccessToken = generateAccessToken(payload);

  const response = NextResponse.json({ message: '令牌已刷新' });
  response.cookies.set('token', newAccessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 15, // 15 分钟
  });

  return response;
}
