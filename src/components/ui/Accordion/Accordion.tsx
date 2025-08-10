'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AccordionItem {
  title: string
  content: React.ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
  defaultOpenIndex?: number
  className?: string
}

export function Accordion({ items, defaultOpenIndex = -1, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number>(defaultOpenIndex)

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index} className="border rounded-md overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-2 text-left font-medium hover:bg-gray-100 transition"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
              />
            </button>
            {isOpen && <div className="px-4 py-2 border-t">{item.content}</div>}
          </div>
        )
      })}
    </div>
  )
}
