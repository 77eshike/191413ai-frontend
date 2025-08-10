// src/components/ui/Skeleton/Skeleton.tsx
import React from 'react'
import clsx from 'clsx'

interface SkeletonProps {
  width?: string
  height?: string
  circle?: boolean
  className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  circle = false,
  className = '',
}) => {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-300 dark:bg-gray-700',
        circle ? 'rounded-full' : 'rounded',
        className,
      )}
      style={{ width, height }}
    />
  )
}
