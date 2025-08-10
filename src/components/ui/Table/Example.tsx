'use client'

import React from 'react'
import { Table } from '.'
import { Tabs } from '@/components/ui/Tabs'

type RowData = {
  name: string
  age: number
  role: string
}

export default function Example() {
  const data: RowData[] = [
    { name: 'Alice', age: 28, role: 'Engineer' },
    { name: 'Bob', age: 35, role: 'Manager' },
  ]

  const columns: { key: keyof RowData; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'role', label: 'Role' },
  ]

  return (
    <Tabs
      tabs={[
        {
          key: 'table',
          label: 'Table View',
          content: <Table data={data} columns={columns} />,
        },
      ]}
    />
  )
}
