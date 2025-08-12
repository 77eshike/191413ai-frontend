'use client'

import React from 'react'
import { cn } from '@/lib/utils'

type Status = 'wait' | 'process' | 'finish' | 'error'

export interface StepItem {
  title: React.ReactNode
  description?: React.ReactNode
  status?: Status
}

export interface StepsProps extends React.HTMLAttributes<HTMLOListElement> {
  /** 显式传 items，或用 <Steps.Item/> 作为 children 二选一 */
  items?: StepItem[]
  /** 当前步骤索引（从 0 开始），仅在未指定 item.status 时用于推导 */
  current?: number
  children?: React.ReactNode
}

function iconByStatus(status: Status, index: number) {
  if (status === 'finish') return <span aria-hidden>✓</span>
  if (status === 'error') return <span aria-hidden>!</span>
  if (status === 'process') return <span aria-hidden>{index + 1}</span>
  return <span aria-hidden>{index + 1}</span>
}

export function Steps({ items, current = 0, children, className, ...rest }: StepsProps) {
  const childItems: StepItem[] =
    items ??
    (React.Children.toArray(children)
      .map((c: any) => {
        if (c?.type?.displayName === 'Steps.Item') {
          return { title: c.props.title, description: c.props.description, status: c.props.status }
        }
        return null
      })
      .filter(Boolean) as StepItem[])

  return (
    <ol className={cn('flex items-start gap-6', className)} {...rest}>
      {childItems.map((it, idx) => {
        const derived: Status =
          it.status ?? (idx < current ? 'finish' : idx === current ? 'process' : 'wait')
        return (
          <li key={idx} className="flex items-start gap-3">
            <span
              className={cn(
                'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs',
                derived === 'finish' && 'bg-green-600 text-white border-green-600',
                derived === 'process' && 'bg-blue-600 text-white border-blue-600',
                derived === 'error' && 'bg-red-600 text-white border-red-600',
              )}
              aria-label={derived}
            >
              {iconByStatus(derived, idx)}
            </span>
            <div>
              <div className="font-medium">{it.title}</div>
              {it.description ? (
                <div className="text-xs text-gray-500 mt-0.5">{it.description}</div>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function StepsItem(_props: StepItem) {
  // 仅用于声明式 children，真实渲染在 Steps 内部完成
  return null
}
StepsItem.displayName = 'Steps.Item'

Steps.Item = StepsItem as unknown as React.FC<StepItem>
export default Steps
