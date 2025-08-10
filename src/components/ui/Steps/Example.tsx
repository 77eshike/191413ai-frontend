'use client'

import { useState } from 'react'
import { Steps } from './Steps'

export default function ExampleSteps() {
  const [current, setCurrent] = useState(1)

  const steps = [
    { title: '提交申请' },
    { title: '审核中' },
    { title: '已通过' },
  ]

  return (
    <div className="p-4 space-y-4">
      <Steps steps={steps} current={current} />
      <div className="space-x-2">
        <button onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}>
          上一步
        </button>
        <button onClick={() => setCurrent((prev) => Math.min(prev + 1, steps.length - 1))}>
          下一步
        </button>
      </div>
    </div>
  )
}
