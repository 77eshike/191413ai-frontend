import React from 'react'

export interface DatePickerProps {
  value: Date | null
  onChange: (value: Date | null) => void
}

function DatePickerBase({ value, onChange }: DatePickerProps) {
  const toStr = (d: Date | null) => (d ? d.toISOString().slice(0, 10) : '')
  const fromStr = (s: string) => (s ? new Date(`${s}T00:00:00`) : null)

  return (
    <div>
      <span>选择日期</span>
      <input type="date" value={toStr(value)} onChange={e => onChange(fromStr(e.target.value))} />
    </div>
  )
}

export default DatePickerBase
export { DatePickerBase as DatePicker }
