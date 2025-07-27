'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export interface Project {
  id: number;
  name: string;
  status?: string;
  description?: string;
  createdAt?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="w-full shadow-md transition-all hover:shadow-lg">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <Badge variant="outline">{project.status || '进行中'}</Badge>
        </div>
        {project.description && (
          <p className="text-sm text-muted-foreground">{project.description}</p>
        )}
        {project.createdAt && (
          <p className="text-xs text-muted-foreground">
            创建时间：{format(new Date(project.createdAt), 'yyyy-MM-dd HH:mm')}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
