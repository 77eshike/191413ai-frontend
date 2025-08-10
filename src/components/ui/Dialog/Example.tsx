// src/components/ui/Dialog/Example.tsx
'use client'

import React, { useState } from 'react'
import { Dialog } from './Dialog'

export default function DialogExample() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setOpen(true)}>
        打开对话框
      </button>
      <Dialog isOpen={open} title="示例对话框" onClose={() => setOpen(false)}>
        <p>这是一个对话框内容的示例。</p>
      </Dialog>
    </div>
  )
}
