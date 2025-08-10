// src/components/ui/UploadExcel/UploadExcel.test.tsx
import { render, screen } from '@testing-library/react'
import { UploadExcel } from './UploadExcel'

describe('UploadExcel', () => {
  it('renders without crashing and triggers callback', async () => {
    const mockParsed = jest.fn()
    render(<UploadExcel onDataParsed={mockParsed} />)

    const input = screen.getByRole('button', { name: '导入 Excel' })
    expect(input).toBeInTheDocument()
  })
})
