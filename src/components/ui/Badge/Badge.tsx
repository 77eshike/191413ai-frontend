// src/components/ui/Badge/Badge.tsx

type BadgeProps = {
  /** 数字徽标值（会被 clamp 到 >= 0） */
  count?: number
  /** 点状徽标（只显示一个小圆点，不显示数字） */
  dot?: boolean
  /** 当为 0 时是否也显示徽标（数字模式下显示 0） */
  showZero?: boolean
  /** 超出时显示为 “maxCount+” */
  maxCount?: number
  /** 包裹的元素/文本 */
  children?: React.ReactNode
}

function formatCount(count: number, maxCount: number) {
  return count > maxCount ? `${maxCount}+` : String(count)
}

function Badge({ count = 0, dot = false, showZero = false, maxCount = 99, children }: BadgeProps) {
  const safeCount = Math.max(0, count)
  const visible = dot || showZero || safeCount > 0

  return (
    <span className="relative inline-block">
      {children}
      {visible ? (
        <sup
          className={[
            'absolute -top-1 -right-1 rounded-full text-white text-center',
            dot
              ? // 点状徽标：纯装饰，不读屏
                'w-2 h-2 p-0 bg-red-600'
              : // 数字徽标：可读屏，尺寸与排版
                'min-w-4 h-4 px-1 text-[10px] leading-4 bg-red-600',
          ].join(' ')}
          aria-hidden={dot || undefined}
          role={dot ? undefined : 'status'}
          aria-live={dot ? undefined : 'polite'}
          aria-label={dot ? undefined : 'badge'}
        >
          {dot ? null : formatCount(safeCount, maxCount)}
        </sup>
      ) : null}
    </span>
  )
}

export default Badge
export { Badge }
