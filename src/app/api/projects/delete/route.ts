import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/jwt';

// POST /api/projects/delete
export async function POST(req: NextRequest) {
  const authUser = await getUserFromToken();

  if (!authUser) {
    return NextResponse.json({ message: '未登录或Token失效' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: '缺少项目ID' }, { status: 400 });
    }

    // === 模拟删除逻辑 ===
    console.log(`用户 ${authUser.username} 请求删除项目 ID: ${id}`);

    return NextResponse.json({ message: '项目已删除（模拟操作）' });
  } catch (error) {
    console.error('删除项目失败:', error);
    return NextResponse.json({ message: '服务器错误' }, { status: 500 });
  }
}
