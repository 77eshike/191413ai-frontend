// src/components/ui/Card/CardContent.tsx
import React from 'react'
import { cn } from '@/lib/utils'

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode // ✅ 必须添� 这一行
}

const CardContent = ({ children, className, ...props }: CardContentProps) => {
  return (
    <div className={cn('p-4', className)} {...props}>
      {children}
    </div>
  )
}

export default CardContent
