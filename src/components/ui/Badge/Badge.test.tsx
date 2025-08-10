import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'
import { describe, expect, it } from 'vitest'

describe('Badge', () => {
  it('shows number count when count > 0', () => {
    render(
      <Badge count={5}>
        <div>Item</div>
      </Badge>,
    )
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('shows dot when dot=true', () => {
    render(
      <Badge dot>
        <div>Item</div>
      </Badge>,
    )
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('does not render badge when count=0 and showZero=false', () => {
    render(
      <Badge count={0}>
        <div>Item</div>
      </Badge>,
    )
    expect(screen.queryByText('0')).toBeNull()
  })

  it('shows 99+ when count exceeds maxCount', () => {
    render(
      <Badge count={120} maxCount={99}>
        <div>Item</div>
      </Badge>,
    )
    expect(screen.getByText('99+')).toBeInTheDocument()
  })
})
