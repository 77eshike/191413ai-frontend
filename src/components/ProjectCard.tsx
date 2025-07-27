'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

interface ProjectCardProps {
  name: string;
  description: string;
  owner: string;
  avatarUrl?: string;
}

export const ProjectCard = ({ name, description, owner, avatarUrl }: ProjectCardProps) => {
  return (
    <Card className="p-4 w-full max-w-md rounded-2xl shadow-md">
      <CardContent className="flex items-center gap-4">
        <Avatar>
          {avatarUrl ? (
            <img src={avatarUrl} alt={`${owner} avatar`} className="rounded-full" />
          ) : (
            <span className="text-xl">{owner.slice(0, 1)}</span>
          )}
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-xs mt-1 text-gray-500">由 {owner} 创建</p>
        </div>
      </CardContent>
    </Card>
  );
};
