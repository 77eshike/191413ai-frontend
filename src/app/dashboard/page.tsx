'use client';

import { useEffect, useState } from 'react';

type Project = {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
};

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects/list', {
          credentials: 'include', // 确保 Cookie 被发送
        });

        if (res.status === 401) {
          setError('未登录或Token失效，请重新登录');
          return;
        }

        if (!res.ok) {
          setError('服务器错误，请稍后再试');
          return;
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          setError('数据格式异常');
        }
      } catch (err) {
        console.error('加载项目失败:', err);
        setError('网络错误，请检查连接');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">我的项目</h1>
      <input
        type="text"
        placeholder="搜索项目名称..."
        className="border p-2 rounded w-full max-w-md"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>加载中...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : filteredProjects.length === 0 ? (
        <p>暂无项目</p>
      ) : (
        <ul className="space-y-2">
          {filteredProjects.map(project => (
            <li key={project.id} className="p-4 border rounded shadow hover:bg-gray-50 transition">
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <p className="text-sm text-gray-500">{project.description}</p>
              <p className="text-xs text-gray-400">
                创建时间：{project.created_at?.slice(0, 10) || '未知'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
