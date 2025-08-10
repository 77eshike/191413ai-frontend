// src/components/ui/FormField/FormField.tsx
'use client'

import React from 'react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'

export interface FormFieldProps {
  label: string
  value: string
  onChange: (val: string) => void
  name: string
  type?: 'text' | 'textarea' | 'email' | 'password'
  placeholder?: string
  className?: string
}

export const FormField = ({
  label,
  value,
  onChange,
  name,
  type = 'text',
  placeholder,
  className,
}: FormFieldProps) => {
  const commonProps = {
    id: name,
    name,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    placeholder,
  }

  return (
    <div className={cn('grid w-full items-center gap-1.5', className)}>
      <Label htmlFor={name}>{label}</Label>
      {type === 'textarea' ? <Textarea {...commonProps} /> : <Input type={type} {...commonProps} />}
    </div>
  )
}
