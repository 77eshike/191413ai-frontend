'use client'

import { useState } from 'react'
import { Notification } from './Notification'
import { Button } from '@/components/ui/Button'

export default function ExampleNotification() {
  const [visible, setVisible] = useState(false)

  return (
    <div className="p-4 space-y-4">
      <Button onClick={() => setVisible(true)}>显示通知</Button>
      {visible && (
        <Notification type="info" onClose={() => setVisible(false)}>
          这是一个通知内容示例。
        </Notification>
      )}
    </div>
  )
}
