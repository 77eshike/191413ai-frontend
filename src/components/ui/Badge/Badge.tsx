import React from 'react'
import clsx from 'clsx'

export interface BadgeProps {
  count?: number
  maxCount?: number
  showZero?: boolean
  dot?: boolean
  children?: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  count = 0,
  maxCount = 99,
  showZero = false,
  dot = false,
  children,
}) => {
  const displayCount = typeof count === 'number' && count > maxCount ? `${maxCount}+` : count

  const shouldDisplay = (typeof count === 'number' && count > 0) || (count === 0 && showZero) || dot

  return (
    <div className="relative inline-block">
      {children}
      {shouldDisplay && (
        <span
          className={clsx(
            'absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold',
            dot ? 'w-2.5 h-2.5 p-0' : 'min-w-[18px] h-[18px] px-1',
          )}
        >
          {!dot && displayCount}
        </span>
      )}
    </div>
  )
}
