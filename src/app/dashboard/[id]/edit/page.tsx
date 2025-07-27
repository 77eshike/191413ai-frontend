'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Project } from '@/types';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${id}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('加载项目详情失败:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) return <div className="p-6">加载中...</div>;

  if (!project) {
    return <div className="p-6">项目不存在</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <p>{project.description}</p>
    </div>
  );
}
