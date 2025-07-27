import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/jwt';

// POST /api/projects/update
export async function POST(req: NextRequest) {
  const authUser = await getUserFromToken();

  if (!authUser) {
    return NextResponse.json({ message: '未登录或Token失效' }, { status: 401 });
  }

  try {
    const body = await req.json();

    const { id, name, description } = body;

    if (!id || !name || !description) {
      return NextResponse.json({ message: '参数不完整' }, { status: 400 });
    }

    // === 模拟更新逻辑 ===
    const updated = {
      id,
      name,
      description,
      owner: authUser.username,
    };

    return NextResponse.json({ message: '项目更新成功', data: updated });
  } catch (error) {
    console.error('更新项目失败:', error);
    return NextResponse.json({ message: '服务器异常' }, { status: 500 });
  }
}
