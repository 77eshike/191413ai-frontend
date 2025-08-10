'use client'

import React from 'react'
import clsx from 'clsx'

export interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  fallback?: string
  className?: string
}

const sizeClasses = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-14 w-14 text-lg',
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback = '?',
  className,
}) => {
  return (
    <div
      className={clsx(
        'inline-flex items-center justify-center rounded-full bg-gray-200 overflow-hidden text-gray-600',
        sizeClasses[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="object-cover w-full h-full" />
      ) : (
        <span className="font-semibold">{fallback}</span>
      )}
    </div>
  )
}
