import { render, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import * as Mod from './Button'

const Button: any = (Mod as any).Button ?? (Mod as any).default

describe('Button', () => {
  it('renders children', () => {
    const { getByRole } = render(<Button>Click me</Button>)
    expect(getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('applies variant and size classes', () => {
    const { getByRole } = render(
      <Button variant="danger" size="lg">
        Go
      </Button>,
    )
    const btn = getByRole('button', { name: /go/i })
    expect(btn.className).toMatch(/bg-red-600/)
    expect(btn.className).toMatch(/h-10/)
  })

  it('shows loader UI when loading', () => {
    const { getByRole } = render(<Button loading>OK</Button>)
    const btn = getByRole('button')
    expect(btn).toHaveAttribute('aria-busy', 'true')
    expect(within(btn).getByRole('status')).toBeInTheDocument()
  })

  it('supports custom loadingText', () => {
    const { getByRole } = render(<Button loading>提交中...</Button>)
    const btn = getByRole('button')
    expect(within(btn).getByText(/提交中/i)).toBeInTheDocument()
  })

  it('fires click when not loading/disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { getByRole } = render(<Button onClick={onClick}>OK</Button>)
    await user.click(getByRole('button', { name: /ok/i }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not fire click when loading', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { getByRole } = render(
      <Button loading onClick={onClick}>
        OK
      </Button>,
    )
    await user.click(getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
