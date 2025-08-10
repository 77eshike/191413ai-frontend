'use client'

import { Tag } from './Tag'

export default function ExampleTag() {
  return (
    <div className="p-4 space-x-2">
      <Tag color="blue">信息</Tag>
      <Tag color="green">成功</Tag>
      <Tag color="red">错误</Tag>
      <Tag color="yellow">警告</Tag>
    </div>
  )
}
