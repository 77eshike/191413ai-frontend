// src/components/ui/Fieldset/Fieldset.tsx
import React from 'react'
import { cn } from '@/lib/utils'

export interface FieldsetProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  legend?: string
}

export const Fieldset = ({ children, className, legend, ...props }: FieldsetProps) => {
  return (
    <fieldset className={cn('border border-gray-300 p-4 rounded-md', className)} {...props}>
      {legend && <legend className="text-sm font-medium text-gray-700">{legend}</legend>}
      {children}
    </fieldset>
  )
}
