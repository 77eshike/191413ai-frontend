import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { findUserByUsername } from '@/lib/db';
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ message: '用户名或密码不能为空' }, { status: 400 });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      return NextResponse.json({ message: '用户不存在' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: '密码错误' }, { status: 401 });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const accessCookie = serialize('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 15, // 15分钟
    });

    const refreshCookie = serialize('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7天
    });

    const res = NextResponse.json({ message: '登录成功' });
    res.headers.set('Set-Cookie', [accessCookie, refreshCookie]);

    return res;
  } catch (error) {
    console.error('登录接口异常:', error);
    return NextResponse.json({ message: '服务器错误' }, { status: 500 });
  }
}
