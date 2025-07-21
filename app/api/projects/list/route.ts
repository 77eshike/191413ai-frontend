import { NextResponse } from 'next/server';

export async function GET() {
  const mockProjects = [
    {
      id: 'p001',
      name: 'AI助手训练平台',
      description: '为内部团队提供GPT微调及会话管理功能。',
      status: '进行中',
    },
    {
      id: 'p002',
      name: '知识库系统重构',
      description: '统一企业知识结构，提升搜索效率。',
      status: '已暂停',
    },
    {
      id: 'p003',
      name: '191413AI 前端平台',
      description: '负责控制台界面、用户模块、CI集成等开发任务。',
      status: '已上线',
    },
  ];

  return NextResponse.json({ projects: mockProjects });
}
