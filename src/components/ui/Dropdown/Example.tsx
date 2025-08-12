'use client'

import { useState } from 'react'
import { Dropdown } from './Dropdown'

export default function ExampleDropdown() {
  const [selected, setSelected] = useState<string | null>(null)

  const options = [
    { label: '选项 A', value: 'a' },
    { label: '选项 B', value: 'b' },
    { label: '选项 C', value: 'c' },
  ]

  return (
    <div className="p-4 space-y-4">
      <Dropdown
        options={options}
        value={selected}
        onChange={val => setSelected(val)}
        placeholder="请选择一个选项"
      />
      {selected && <div className="text-sm text-gray-500">已选中：{selected}</div>}
    </div>
  )
}
