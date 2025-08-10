// src/components/ui/Table/Table.test.tsx
import { render, screen } from '@testing-library/react'
import { Table, TableColumn } from './Table'

type Row = { name: string; age: number }
const data: Row[] = [{ name: 'Alice', age: 30 }]
const columns: TableColumn<Row>[] = [
  { key: 'name', label: '姓名' },
  { key: 'age', label: '年龄' },
]

describe('Table', () => {
  it('renders table headers and data', () => {
    render(<Table<Row> data={data} columns={columns} />)
    expect(screen.getByText('姓名')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
  })

  it('renders empty state when no data', () => {
    render(<Table<Row> data={[]} columns={columns} />)
    expect(screen.getByText('无数据')).toBeInTheDocument()
  })
})
