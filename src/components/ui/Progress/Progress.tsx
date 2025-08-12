import React from 'react'

export interface ProgressProps {
  value: number
  max?: number
}

function ProgressBase({ value, max = 100 }: ProgressProps) {
  const clamp = (n: number) => Math.min(Math.max(n, 0), max)
  const now = clamp(value)
  const pct = (now / max) * 100

  // 只渲染一个 div：测试会命中它，并断言 width: xx%
  return (
    <div
      data-testid="progress-bar"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={now}
      style={{ width: `${pct}%`, height: 8 }}
    />
  )
}

export default ProgressBase
export { ProgressBase as Progress }
