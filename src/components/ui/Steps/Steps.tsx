import React from 'react'
import clsx from 'clsx'

export interface Step {
  title: string
  description?: string
  status?: 'wait' | 'process' | 'finish' | 'error'
}

export interface StepsProps {
  steps: Step[]
  current: number
  direction?: 'horizontal' | 'vertical'
  className?: string
}

export const Steps: React.FC<StepsProps> = ({
  steps,
  current,
  direction = 'horizontal',
  className,
}) => {
  return (
    <div className={clsx('flex', direction === 'vertical' ? 'flex-col' : 'flex-row', className)}>
      {steps.map((step, index) => {
        const status = index < current ? 'finish' : index === current ? 'process' : 'wait'

        return (
          <div
            key={index}
            className={clsx(
              'flex items-start',
              direction === 'vertical' ? 'mb-4' : 'mr-8',
              'last:mr-0 last:mb-0',
            )}
          >
            <div
              className="flex items-center justify-center w-6 h-6 rounded-full text-white text-sm font-bold"
              style={{
                backgroundColor:
                  status === 'finish' ? '#52c41a' : status === 'process' ? '#1890ff' : '#d9d9d9',
              }}
            >
              {status === 'finish' ? '✓' : index + 1}
            </div>
            <div className="ml-2">
              <div className="font-medium">{step.title}</div>
              {step.description && <div className="text-sm text-gray-500">{step.description}</div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
