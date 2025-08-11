import React from 'react'
import clsx from 'clsx'

type Props = {
  count?: number
  maxCount?: number
  dot?: boolean
  children: React.ReactNode
}

export default function Badge({ count = 0, maxCount = 99, dot, children }: Props) {
  const showDot = !!dot
  const showNumber = !showDot && count > 0
  const text = showNumber ? (count > maxCount ? `${maxCount}+` : String(count)) : ''

  return (
    <span className="relative inline-block">
      <div>{children}</div>

      {showDot ? (
        <sup
          role="status"
          aria-label="badge"
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-600"
        />
      ) : showNumber ? (
        <sup
          aria-label="badge"
          className={clsx(
            'absolute -top-1 -right-1 min-w-4 h-4 px-1 text-[10px] leading-4 text-white text-center rounded-full bg-red-600',
          )}
        >
          {text}
        </sup>
      ) : null}
    </span>
  )
}
