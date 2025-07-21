'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  status: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <CardContent className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <Badge variant="outline">{project.status || '进行中'}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <p className="text-xs text-muted-foreground">
          创建时间：{format(new Date(project.createdAt), 'yyyy-MM-dd HH:mm')}
        </p>
      </CardContent>
    </Card>
  );
}
