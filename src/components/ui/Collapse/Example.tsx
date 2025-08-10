'use client'

import { Collapse } from './Collapse'
import { useState } from 'react'

export default function ExampleCollapse() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-4">
      <button onClick={() => setOpen((prev) => !prev)}>
        {open ? '收起' : '展开'}
      </button>
      <Collapse isOpen={open}>
        <div className="mt-4 p-4 border rounded bg-gray-50">
          这是 Collapse 组件中折叠的内容。
        </div>
      </Collapse>
    </div>
  )
}
