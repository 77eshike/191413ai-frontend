// src/components/ui/Table/Table.tsx
import React from 'react'

export type TableColumn<T> = {
  key: keyof T
  label: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  className?: string
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  className = '',
}: TableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map(col => (
              <th key={String(col.key)} className="px-4 py-2 text-left border-b">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center px-4 py-6 text-gray-400">
                � 数据
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map(col => (
                  <td key={String(col.key)} className="px-4 py-2 border-b">
                    {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
