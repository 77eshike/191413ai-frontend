'use client'

import { Popover } from './Popover'
import { Button } from '@/components/ui/Button'

export default function ExamplePopover() {
  return (
    <div className="p-20">
      <Popover
        content={<div className="text-sm text-gray-600">这是 Popover 内容</div>}
        placement="bottom"
      >
        <Button>悬停显示内容</Button>
      </Popover>
    </div>
  )
}
