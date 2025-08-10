'use client'

import React from 'react'
import { Breadcrumb } from './Breadcrumb'

export default function Example() {
  return (
    <Breadcrumb
      items={[
        { label: '首页', href: '/' },
        { label: '分类', href: '/category' },
        { label: '当前页', href: '/category/current' },
      ]}
    />
  )
}
