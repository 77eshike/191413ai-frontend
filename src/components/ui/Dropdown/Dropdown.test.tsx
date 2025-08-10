import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Dropdown } from './Dropdown'

const options = [
  { label: '一号', value: '1' },
  { label: '二号', value: '2' },
]

describe('Dropdown', () => {
  it('renders placeholder correctly', () => {
    render(<Dropdown options={options} onSelect={() => {}} />)
    expect(screen.getByText('请选择')).toBeInTheDocument()
  })

  it('opens and selects option', () => {
    const onSelect = vi.fn()
    render(<Dropdown options={options} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('请选择'))
    fireEvent.click(screen.getByText('一号'))
    expect(onSelect).toHaveBeenCalledWith('1')
  })
})
