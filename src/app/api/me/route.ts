import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/jwt';
import { getUserById } from '@/lib/db';

// GET /api/me
export async function GET() {
  try {
    const authUser = await getUserFromToken();
    if (!authUser) {
      return NextResponse.json({ message: '未登录或Token失效' }, { status: 401 });
    }

    const user = await getUserById(authUser.userId);
    if (!user) {
      return NextResponse.json({ message: '用户不存在' }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error('获取当前用户信息失败:', error);
    return NextResponse.json({ message: '服务器错误' }, { status: 500 });
  }
}
