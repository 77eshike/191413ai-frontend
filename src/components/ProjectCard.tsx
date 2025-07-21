'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

export interface ProjectCardProps {
  title: string;
  description: string;
  status: 'active' | 'archived' | 'draft';
  updatedAt: string; // ISO 格式时间字符串
}

export default function ProjectCard({ title, description, status, updatedAt }: ProjectCardProps) {
  const statusColor = {
    active: 'bg-green-100 text-green-700',
    archived: 'bg-gray-100 text-gray-600',
    draft: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <Card className="w-full max-w-md shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Badge className={statusColor[status]}>{status}</Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <p className="text-xs text-gray-500">
          更新于 {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
        </p>
      </CardContent>
    </Card>
  );
}
