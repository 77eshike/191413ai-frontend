import React from 'react'
import clsx from 'clsx'

export type TagColor = 'default' | 'success' | 'warning' | 'danger' | 'info'

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: TagColor
  closable?: boolean
  onRemove?: () => void
}

const colorMap: Record<TagColor, string> = {
  default: 'bg-gray-100 text-gray-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ color = 'default', closable = false, onRemove, className, children, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center text-xs px-2 py-0.5 rounded',
          colorMap[color],
          className,
        )}
        {...rest}
      >
        <span>{children}</span>
        {closable && (
          <button
            type="button"
            aria-label="remove tag"
            onClick={onRemove}
            className="ml-1 leading-none"
          >
            ×
          </button>
        )}
      </span>
    )
  },
)

Tag.displayName = 'Tag'
export default Tag
