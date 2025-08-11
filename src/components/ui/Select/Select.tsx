import React from 'react'

type Option = { label: string; value: string }
type Props = {
  options: Option[]
  value?: string
  onChange?: (val: string) => void
  placeholder?: string
}

export default function Select({ options, value, onChange, placeholder = '请选择' }: Props) {
  const [val, setVal] = React.useState(value ?? '')

  return (
    <select
      className="border rounded px-2 py-1"
      value={val}
      onChange={e => {
        setVal(e.target.value)
        onChange?.(e.target.value)
      }}
    >
      <option value="">{placeholder}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
