'use client'

import React from 'react'
import { Accordion } from './Accordion' // ✅ 改为具名导入

export default function Example() {
  return (
    <Accordion
      items={[
        {
          title: '标题一',
          content: '内容一：这是折叠面板的内容。',
        },
        {
          title: '标题二',
          content: '内容二：支持多项展开。',
        },
      ]}
    />
  )
}
