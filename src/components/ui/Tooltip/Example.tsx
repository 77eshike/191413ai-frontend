'use client'

import { Tooltip } from './Tooltip'
import { Button } from '@/components/ui/Button'

export default function ExampleTooltip() {
  return (
    <div className="p-20 text-center">
      <Tooltip content="这是提示信息">
        <Button>悬停查看提示</Button>
      </Tooltip>
    </div>
  )
}
