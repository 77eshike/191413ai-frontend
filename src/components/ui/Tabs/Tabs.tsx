'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

export interface TabItem {
  key: string
  label: string
  content: React.ReactNode
}

export interface TabsProps {
  tabs: TabItem[]
  defaultActiveKey?: string
  onChange?: (key: string) => void
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultActiveKey, onChange, className }) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || tabs[0]?.key)

  const handleClick = (key: string) => {
    setActiveKey(key)
    onChange?.(key)
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex space-x-4 border-b mb-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={cn(
              'pb-2 px-4 text-sm font-medium transition-colors border-b-2',
              activeKey === tab.key
                ? 'border-primary text-primary'
                : 'border-transparent text-muted hover:text-primary',
            )}
            onClick={() => handleClick(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 bg-background rounded border">
        {tabs.find(tab => tab.key === activeKey)?.content}
      </div>
    </div>
  )
}
