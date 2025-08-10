'use client'

import { useState } from 'react'
import { Slider } from './Slider'

export default function ExampleSlider() {
  const [value, setValue] = useState(50)

  return (
    <div className="p-4 space-y-4">
      <Slider
        value={value}
        onChange={(val) => setValue(val)}
        min={0}
        max={100}
        step={1}
      />
      <div className="text-sm text-gray-500">当前值：{value}</div>
    </div>
  )
}
