'use client'

import { useState } from 'react'
import { DrawerMenu } from './DrawerMenu'
import { Button } from '@/components/ui/Button'

export default function ExampleDrawerMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>打开菜单</Button>
      <DrawerMenu
        isOpen={open}
        onClose={() => setOpen(false)}
        items={[
          { label: '首页', key: 'home' },
          { label: '项目', key: 'projects' },
          { label: '设置', key: 'settings' },
        ]}
      />
    </div>
  )
}
