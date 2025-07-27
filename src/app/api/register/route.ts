import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createUser, findUserByUsername } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, email, nickname, avatar } = body;

    if (!username || !password || !email) {
      return NextResponse.json({ message: '缺少必要字段' }, { status: 400 });
    }

    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return NextResponse.json({ message: '用户名已存在' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({
      username,
      password: hashedPassword,
      email,
      nickname: nickname || '',
      avatar: avatar || '',
      role: 'user',
    });

    return NextResponse.json({ message: '注册成功', userId: newUser.id }, { status: 201 });
  } catch (error) {
    console.error('注册失败:', error);
    return NextResponse.json({ message: '服务器错误' }, { status: 500 });
  }
}
