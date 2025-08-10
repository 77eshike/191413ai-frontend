'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

export interface BreadcrumbItem {
  label: string
  href?: string
  isCurrent?: boolean
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRightIcon className="h-4 w-4 text-gray-400" />,
}) => {
  return (
    <nav className="flex items-center text-sm text-gray-500" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <div key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">{separator}</span>}
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-gray-700">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </div>
        )
      })}
    </nav>
  )
}
