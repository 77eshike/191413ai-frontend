'use client'

import { useState } from 'react'
import { Drawer } from './Drawer'
import { Button } from '@/components/ui/Button'

export default function ExampleDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-4 space-y-4">
      <Button onClick={() => setIsOpen(true)}>打开抽屉</Button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="示例抽屉">
        <p className="text-gray-700">这是一个 Drawer 示例内容。</p>
      </Drawer>
    </div>
  )
}
