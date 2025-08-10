//ProjectCard.tsx

'use client'

import Card from '@/components/ui/Card/Card'
import CardContent from '@/components/ui/Card/CardContent'
import { Avatar } from '@/components/ui/Avatar'

interface ProjectCardProps {
  name: string
  description: string
  owner: string
  avatarUrl?: string
}

export const ProjectCard = ({ name, description, owner, avatarUrl }: ProjectCardProps) => {
  return (
    <Card className="p-4 w-full max-w-md rounded-2xl shadow-md">
      <CardContent className="flex items-center gap-4">
        <Avatar src={avatarUrl} alt={`${owner} avatar`} fallback={owner.slice(0, 1)} size="md" />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-xs mt-1 text-gray-500">由 {owner} 创建</p>
        </div>
      </CardContent>
    </Card>
  )
}
