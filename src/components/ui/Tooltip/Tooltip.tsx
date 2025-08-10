// src/components/ui/Tooltip/Tooltip.tsx
'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = ({
  children,
  content,
  ...props
}: {
  children: React.ReactNode
  content: React.ReactNode
}) => (
  <TooltipPrimitive.Root {...props}>
    <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        className={cn(
          'z-50 overflow-hidden rounded-md bg-black px-3 py-1.5 text-xs text-white shadow-md animate-fadeIn',
        )}
        sideOffset={4}
      >
        {content}
        <TooltipPrimitive.Arrow className="fill-black" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  </TooltipPrimitive.Root>
)

const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipContent = TooltipPrimitive.Content

export { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent }
