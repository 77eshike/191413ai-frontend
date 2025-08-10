import { fireEvent, render, screen } from '@testing-library/react'
import { Select } from './Select'

describe('Select', () => {
  it('renders placeholder and selects value', () => {
    const handleChange = vi.fn()

    render(
      <Select
        placeholder="请选择"
        options={[{ label: '选项一', value: 'one' }]}
        onChange={handleChange}
      />,
    )

    expect(screen.getByText('请选择')).toBeInTheDocument()
    fireEvent.click(screen.getByText('请选择'))
    fireEvent.click(screen.getByText('选项一'))
    expect(handleChange).toHaveBeenCalledWith('one')
  })
})
