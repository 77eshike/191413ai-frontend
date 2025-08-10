'use client'

import React from 'react'
import clsx from 'clsx'

export interface ProgressProps {
  value: number // 当前进度值
  max?: number // 最大值，默认为 100
  className?: string
}

export function Progress({ value, max = 100, className }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={clsx('w-full bg-gray-200 rounded h-2 overflow-hidden', className)}>
      <div
        className="bg-blue-500 h-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
