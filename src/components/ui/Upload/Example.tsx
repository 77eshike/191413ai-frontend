'use client'

import { useState } from 'react'
import { Upload } from './Upload'

export default function ExampleUpload() {
  const [fileList, setFileList] = useState<File[]>([])

  return (
    <div className="p-4 space-y-4">
      <Upload
        fileList={fileList}
        onChange={files => setFileList(files)}
        accept="image/*"
        multiple
      />
      <div className="text-sm text-gray-500">已上� 文件数：{fileList.length}</div>
    </div>
  )
}
