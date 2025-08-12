import React, { useRef, useState } from 'react'
import * as XLSX from 'xlsx'

interface UploadExcelProps {
  onDataParsed: (data: any[][]) => void
  accept?: string
}

export const UploadExcel = ({ onDataParsed, accept = '.xlsx,.xls' }: UploadExcelProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [filename, setFilename] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFilename(file.name)
    setError(null)

    const reader = new FileReader()
    reader.onload = evt => {
      const bstr = evt.target?.result
      try {
        const wb = XLSX.read(bstr as string, { type: 'binary' })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][]
        onDataParsed(data)
      } catch {
        setError('解析 Excel 文件失败，请检查文件格式')
      }
    }
    reader.readAsBinaryString(file)
  }

  return (
    <div className="space-y-2">
      <button
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
        type="button"
      >
        导入 Excel
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />
      {filename && <p className="text-sm text-gray-500">文件: {filename}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
