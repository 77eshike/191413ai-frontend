import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/jwt';
import { pool } from '@/lib/db';

export async function PATCH(req: NextRequest) {
  const authUser = await getUserFromToken();

  if (!authUser) {
    return NextResponse.json({ message: '未登录或Token失效' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, name, description } = body;

    if (!id || !name || typeof name !== 'string') {
      return NextResponse.json({ message: '参数不完整或格式错误' }, { status: 400 });
    }

    const [result] = await pool.query(
      'UPDATE projects SET name = ?, description = ? WHERE id = ? AND user_id = ?',
      [name, description ?? '', id, authUser.userId],
    );

    return NextResponse.json({ message: '项目更新成功', result });
  } catch (error) {
    console.error('项目更新失败:', error);
    return NextResponse.json({ message: '服务器错误' }, { status: 500 });
  }
}
