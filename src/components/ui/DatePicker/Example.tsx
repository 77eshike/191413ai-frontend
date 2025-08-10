'use client'

import React, { useState } from 'react'
import { DatePicker } from './DatePicker'

export default function DatePickerExample() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">日期选择示例</h2>
      <DatePicker value={selectedDate} onChange={setSelectedDate} />
      {selectedDate && (
        <p className="text-gray-700">当前选择：{selectedDate.toLocaleDateString()}</p>
      )}
    </div>
  )
}
