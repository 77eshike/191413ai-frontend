'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Project } from '@/types';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('加载项目失败:', error);
      } finally {
        setLoading(false);
      }
    }

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (loading) return <div className="p-6">加载中...</div>;

  if (!project) {
    return <div className="p-6">未找到项目</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <p className="text-gray-600">{project.description}</p>
    </div>
  );
}
