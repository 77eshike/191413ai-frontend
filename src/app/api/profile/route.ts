import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/jwt';
import { getUserById, updateUserProfile } from '@/lib/db';

// GET /api/profile 获取当前用户资料
export async function GET() {
  const authUser = await getUserFromToken();
  if (!authUser) {
    return NextResponse.json({ message: '未登录' }, { status: 401 });
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
}

// PATCH /api/profile 更新用户资料
export async function PATCH(req: Request) {
  const authUser = await getUserFromToken();
  if (!authUser) {
    return NextResponse.json({ message: '未登录' }, { status: 401 });
  }

  const body = await req.json();
  const { nickname, email, avatar } = body;

  const result = await updateUserProfile(authUser.userId, nickname, email, avatar);

  return result
    ? NextResponse.json({ message: '资料更新成功' })
    : NextResponse.json({ message: '资料更新失败' }, { status: 500 });
}
