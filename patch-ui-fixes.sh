#!/usr/bin/env bash
set -euo pipefail

echo "▶ Writing fixed UI components..."

mkdir -p src/components/ui/Progress \
         src/components/ui/Badge \
         src/components/ui/Tag \
         src/components/ui/ModalForm \
         src/components/ui/Select

# -------- Progress --------
cat > src/components/ui/Progress/Progress.tsx <<'TSX'
import React from 'react'
import clsx from 'clsx'

type Props = {
  value?: number
  max?: number
  className?: string
}

export default function Progress({ value = 0, max = 100, className }: Props) {
  const safeMax = max || 100
  const pct = Math.max(0, Math.min(100, (value / safeMax) * 100))

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={Math.round(pct)}
      className={clsx('relative h-2 w-full rounded bg-gray-200', className)}
    >
      <div
        data-testid="progress-inner"
        className="absolute left-0 top-0 h-full rounded bg-blue-600"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
TSX

# -------- Badge --------
cat > src/components/ui/Badge/Badge.tsx <<'TSX'
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
TSX

# -------- Tag --------
cat > src/components/ui/Tag/Tag.tsx <<'TSX'
import React from 'react'
import clsx from 'clsx'

type Props = {
  color?: 'blue' | 'green' | 'gray'
  onRemove?: () => void
  children?: React.ReactNode
}

const colorMap = {
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  gray: 'bg-gray-100 text-gray-800',
} as const

export default function Tag({ color = 'green', onRemove, children }: Props) {
  return (
    <span
      className={clsx(
        'inline-flex items-center text-xs px-2 py-0.5 rounded',
        colorMap[color],
      )}
    >
      <span>{children}</span>
      {onRemove ? (
        <button
          type="button"
          className="ml-1 leading-none"
          aria-label="移除"
          title="移除"
          onClick={onRemove}
        >
          ×
        </button>
      ) : null}
    </span>
  )
}
TSX

# -------- ModalForm --------
cat > src/components/ui/ModalForm/ModalForm.tsx <<'TSX'
import React from 'react'

type Props = {
  open: boolean
  title?: string
  onClose?: () => void
  onSubmit?: (data: Record<string, string>) => void
  children?: React.ReactNode
}

export default function ModalForm({ open, title, onClose, onSubmit, children }: Props) {
  if (!open) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const obj: Record<string, string> = {}
    fd.forEach((v, k) => {
      obj[k] = String(v)
    })
    onSubmit?.(obj)
  }

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 grid place-items-center">
      <div className="bg-white rounded shadow p-4 min-w-[320px]">
        {title ? <h2>{title}</h2> : null}
        <form onSubmit={handleSubmit}>
          <div className="my-3">{children}</div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose}>
              取消
            </button>
            <button type="submit">提交</button>
          </div>
        </form>
      </div>
    </div>
  )
}
TSX

# -------- Select --------
cat > src/components/ui/Select/Select.tsx <<'TSX'
import React from 'react'

type Option = { label: string; value: string }
type Props = {
  options: Option[]
  value?: string
  onChange?: (val: string) => void
  placeholder?: string
}

export default function Select({ options, value, onChange, placeholder = '请选择' }: Props) {
  const [val, setVal] = React.useState(value ?? '')

  return (
    <select
      className="border rounded px-2 py-1"
      value={val}
      onChange={e => {
        setVal(e.target.value)
        onChange?.(e.target.value)
      }}
    >
      <option value="">{placeholder}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
TSX

echo "▶ Cleaning hidden characters (BOM / curly quotes) in UI folder..."

# 找出含非 ASCII 的可疑文件
files=$(grep -Pl "[^\x09\x0A\x0D\x20-\x7E]" -R src/components/ui || true)
if [ -n "${files}" ]; then
  # 去 BOM / 零宽字符，替换中文引号为 ASCII
  perl -CSD -i -pe "s/\x{FEFF}//g; s/[“”]/\"/g; s/[‘’]/'/g;" ${files}
fi

# 归一化行为 LF（不依赖 dos2unix）
find src/components/ui -type f \( -name "*.ts" -o -name "*.tsx" \) -print0 \
  | xargs -0 perl -i -pe 's/\r$//'

echo "✅ Done. Now you can run: npm run lint && npm run test"
