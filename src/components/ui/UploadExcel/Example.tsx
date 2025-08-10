'use client'

import React from 'react'
import { UploadExcel } from './UploadExcel'

export default function Example() {
  const handleParsedData = (data: unknown[]) => {}

  return <UploadExcel onDataParsed={handleParsedData} />
}
