'use client'

import React from 'react'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
  placeholder?: string // ✅ 新增支持 placeholder
}

export const Select = ({
  options,
  value,
  onChange,
  defaultValue,
  placeholder = '请选择',
}: SelectProps) => {
  const [selected, setSelected] = React.useState(defaultValue ?? '')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value)
    onChange?.(e.target.value)
  }

  return (
    <select
      value={value ?? selected}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {placeholder && !selected && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
