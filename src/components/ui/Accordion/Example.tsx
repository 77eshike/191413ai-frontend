'use client'

import React from 'react'
import { Accordion } from './Accordion' // ✅ 改为具名导入

export default function Example() {
  return (
    <Accordion
      items={[
        {
          title: '� �题一',
          content: '内容一：这是折� 面板的内容。',
        },
        {
          title: '� �题二',
          content: '内容二：支持多项展开。',
        },
      ]}
    />
  )
}
