// src/components/ui/AvatarUploader/AvatarUploader.test.tsx
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { AvatarUploader } from './AvatarUploader'

describe('AvatarUploader', () => {
  it('uploads and displays new avatar', async () => {
    const mockUpload = jest.fn(async (file: File) => URL.createObjectURL(file))

    render(<AvatarUploader onUpload={mockUpload} />)

    const file = new File(['test'], 'avatar.png', { type: 'image/png' })
    const input = screen.getByRole('button', { name: '更换头像' })

    fireEvent.click(input)
    const fileInput = screen.getByTestId('file-input') || document.querySelector('input[type=file]')
    fireEvent.change(fileInput, { target: { files: [file] } })

    await waitFor(() => {
      expect(mockUpload).toHaveBeenCalledWith(file)
    })
  })
})
