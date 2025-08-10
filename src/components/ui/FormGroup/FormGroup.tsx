// src/components/ui/FormGroup/FormGroup.tsx
import React from 'react'
import { cn } from '@/lib/utils'

export interface FormGroupProps {
  label: string
  description?: string
  children: React.ReactNode
  className?: string
}

export const FormGroup = ({ label, description, children, className }: FormGroupProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <div>{children}</div>
    </div>
  )
}
