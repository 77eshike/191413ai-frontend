'use client'

import { useState } from 'react'
import { ModalForm } from './ModalForm'
import { Button } from '@/components/ui/Button'

export default function ExampleModalForm() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>打开表单</Button>
      <ModalForm
        isOpen={open}
        onClose={() => setOpen(false)}
        title="创建项目"
        onSubmit={async values => {
          alert(`提交成功：${JSON.stringify(values)}`)
          return true
        }}
        fields={[
          { name: 'name', label: '项目名称', type: 'text', required: true },
          { name: 'description', label: '项目描述', type: 'textarea' },
        ]}
      />
    </div>
  )
}
