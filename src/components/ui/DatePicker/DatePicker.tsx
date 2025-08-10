// src/components/ui/DatePicker/DatePicker.tsx
'use client'

import React, { useState } from 'react'
import { Calendar } from '@/components/ui/Calendar'

export interface DatePickerProps {
  value?: Date
  onChange?: (date: Date) => void
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value)

  const handleSelect = (date: Date) => {
    setSelectedDate(date)
    onChange?.(date)
  }

  return (
    <div className="inline-block">
      <Calendar selected={selectedDate} onSelect={handleSelect} />
    </div>
  )
}
