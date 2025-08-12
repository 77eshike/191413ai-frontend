// src/components/ui/Upload/Upload.test.tsx
import { fireEvent, render, screen } from '@testing-library/react'
import { Upload } from './Upload'

describe('Upload', () => {
  it('renders upload button', () => {
    render(<Upload onChange={() => {}} />)
    expect(screen.getByRole('button', { name: '上� 文件' })).toBeInTheDocument()
  })

  it('triggers file input click on button click', () => {
    const { container } = render(<Upload onChange={() => {}} />)
    const input = container.querySelector('input[type="file"]')!
    const clickSpy = jest.spyOn(input, 'click')
    fireEvent.click(screen.getByRole('button'))
    expect(clickSpy).toHaveBeenCalled()
  })
})
