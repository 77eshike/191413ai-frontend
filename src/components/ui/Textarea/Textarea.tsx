// src/components/ui/Textarea/Textarea.tsx
import React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div>
        <textarea
          ref={ref}
          className={cn(
            'w-full min-h-[100px] rounded border px-3 py-2 text-sm outline-none',
            'focus:ring-2 focus:ring-blue-500',
            error ? 'border-red-500' : 'border-gray-300',
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
