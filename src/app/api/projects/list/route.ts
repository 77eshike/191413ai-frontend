import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/jwt';

// GET /api/projects/list
export async function GET() {
  const authUser = await getUserFromToken();

  if (!authUser) {
    return NextResponse.json({ message: '未登录或Token失效' }, { status: 401 });
  }

  // 模拟项目列表数据（后续可替换为数据库查询）
  const mockProjects = [
    {
      id: 1,
      name: '191413AI 控制台',
      description: '前端平台与项目管理中心',
      status: 'active',
      createdAt: '2025-07-15T10:00:00.000Z',
    },
    {
      id: 2,
      name: 'AI 模型实验室',
      description: '支持模型训练与测试',
      status: 'pending',
      createdAt: '2025-07-20T14:30:00.000Z',
    },
  ];

  return NextResponse.json({ projects: mockProjects }, { status: 200 });
}
