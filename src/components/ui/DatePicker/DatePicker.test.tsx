// src/components/ui/DatePicker/DatePicker.test.tsx
import { render, screen } from '@testing-library/react'
import { DatePicker } from './DatePicker'

describe('DatePicker', () => {
  it('renders without crashing', () => {
    render(<DatePicker value={null} onChange={() => {}} />)
    expect(screen.getByText('选择日期')).toBeInTheDocument()
  })
})
