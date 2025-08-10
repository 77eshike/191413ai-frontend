'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cn } from '@/lib/utils'

export interface ToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {}

export const Toggle = React.forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md bg-transparent px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    />
  ),
)
Toggle.displayName = TogglePrimitive.Root.displayName
