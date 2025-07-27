import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/jwt';
import { pool } from '@/lib/db';

export async function POST(req: NextRequest) {
  const authUser = await getUserFromToken();

  if (!authUser) {
    return NextResponse.json({ message: '未登录或Token失效' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, description } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ message: '缺少或无效的项目名称' }, { status: 400 });
    }

    const [result] = await pool.query(
      'INSERT INTO projects (name, description, user_id) VALUES (?, ?, ?)',
      [name, description ?? '', authUser.userId],
    );

    return NextResponse.json({
      message: '项目创建成功',
      projectId: (result as any).insertId,
    });
  } catch (error) {
    console.error('创建项目失败:', error);
    return NextResponse.json({ message: '服务器错误' }, { status: 500 });
  }
}
