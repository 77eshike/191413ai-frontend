// src/components/ui/Form/Form.tsx
import React, { ReactNode, FormEvent } from 'react'

interface FormProps {
  onSubmit: (formData: Record<string, string>) => void
  children: ReactNode
  className?: string
}

export function Form({ onSubmit, children, className = '' }: FormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const values: Record<string, string> = {}
    formData.forEach((value, key) => {
      values[key] = String(value)
    })
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  )
}
