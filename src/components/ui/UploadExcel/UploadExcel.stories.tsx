// src/components/ui/UploadExcel/UploadExcel.stories.tsx
import React from 'react'
import { UploadExcel } from './UploadExcel'

export default {
  title: 'UI/UploadExcel',
  component: UploadExcel,
}

export const Basic = () => (
  <UploadExcel
    onDataParsed={data => {
      alert(`成功读取 ${data.length} 行`)
    }}
  />
)
