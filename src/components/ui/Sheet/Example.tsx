'use client'

import { Sheet } from './Sheet'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

export default function ExampleSheet() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>打开抽屉</Button>
      <Sheet isOpen={open} onClose={() => setOpen(false)} title="侧边� �">
        <p className="text-gray-700">这里是 Sheet 内容展示区域。</p>
      </Sheet>
    </div>
  )
}
