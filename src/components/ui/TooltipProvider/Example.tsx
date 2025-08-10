// src/components/ui/TooltipProvider/Example.tsx
'use client'

import React from 'react'
import { TooltipProvider } from './TooltipProvider'
import { Tooltip } from '../Tooltip'

export default function Example() {
  return (
    <TooltipProvider>
      <Tooltip content="提示文字">
        <button className="p-2 bg-blue-500 text-white rounded">悬停查看</button>
      </Tooltip>
    </TooltipProvider>
  )
}
