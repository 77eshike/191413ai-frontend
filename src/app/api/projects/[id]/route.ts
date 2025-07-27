import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/jwt';

// GET /api/projects/[id]
export async function GET(req: NextRequest) {
  const authUser = await getUserFromToken();

  if (!authUser) {
    return NextResponse.json({ message: '未登录或Token失效' }, { status: 401 });
  }

  // 从 URL 中解析 id（最后一个路径段）
  const url = req.nextUrl;
  const idStr = url.pathname.split('/').pop();
  const id = parseInt(idStr || '', 10);

  if (isNaN(id)) {
    return NextResponse.json({ message: '项目ID无效' }, { status: 400 });
  }

  try {
    // === 模拟查找逻辑 ===
    const project = {
      id,
      name: '示例项目',
      owner: authUser.username,
      description: '这是一个模拟项目详情',
    };

    return NextResponse.json(project);
  } catch (error) {
    console.error('获取项目详情失败:', error);
    return NextResponse.json({ message: '服务器异常' }, { status: 500 });
  }
}
