// src/components/ui/Label/Label.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as Mod from './Label'

const Label: any = (Mod as any).Label ?? (Mod as any).default

describe('Label', () => {
  it('renders correctly with text', () => {
    render(<Label htmlFor="input-id">输入框</Label>)
    expect(screen.getByText('输入框')).toBeInTheDocument()
  })

  it('has correct htmlFor attribute', () => {
    render(
      <>
        <Label htmlFor="input-id">输入框</Label>
        <input id="input-id" />
      </>,
    )
    // 有关联的控件就不会再报警
    expect(screen.getByLabelText('输入框')).toBeInTheDocument()
  })
})
