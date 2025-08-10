'use client'

import React, { useState } from 'react'
import { Input } from './Input'

export default function InputExample() {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className="space-y-4 max-w-sm">
      <label htmlFor="input-example" className="block text-sm font-medium text-gray-700">
        输入内容
      </label>
      <Input id="input-example" value={value} onChange={handleChange} placeholder="请输入..." />
      <p className="text-sm text-gray-600">当前值：{value}</p>
    </div>
  )
}
