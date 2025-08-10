// src/components/ui/ImagePreviewer/ImagePreviewer.test.tsx
import { render } from '@testing-library/react'
import { ImagePreviewer } from './ImagePreviewer'

describe('ImagePreviewer', () => {
  it('does not render when file is null', () => {
    const { container } = render(<ImagePreviewer file={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders preview image when file is provided', () => {
    const file = new File(['dummy'], 'avatar.png', { type: 'image/png' })
    const { container } = render(<ImagePreviewer file={file} />)
    expect(container.firstChild).not.toBeNull()
  })
})
