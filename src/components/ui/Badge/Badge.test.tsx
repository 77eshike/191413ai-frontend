import { render, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as Mod from './Badge'

const Badge: any = (Mod as any).Badge ?? (Mod as any).default

describe('Badge', () => {
  it('shows number count when count > 0', () => {
    const { container } = render(
      <Badge count={5}>
        <span>Inbox</span>
      </Badge>,
    )
    const utils = within(container)
    expect(utils.getByText('5')).toBeTruthy()
  })

  it('shows dot when dot=true', () => {
    const { container } = render(
      <Badge dot>
        <span>Msg</span>
      </Badge>,
    )
    const utils = within(container)
    // 允许实现不同：找有 aria-label 的红点 或者含有 "•"
    const dot = utils.queryByLabelText(/dot|badge/i) || utils.getByText(/•/i)
    expect(dot).toBeTruthy()
  })

  it('does not render badge when count=0 and showZero=false', () => {
    const { container } = render(
      <Badge count={0} showZero={false}>
        <span>Zero</span>
      </Badge>,
    )
    const utils = within(container)
    expect(utils.queryByText('0')).toBeNull()
  })

  it('shows 99+ when count exceeds maxCount', () => {
    const { container } = render(
      <Badge count={123} maxCount={99}>
        <span>Many</span>
      </Badge>,
    )
    const utils = within(container)
    expect(utils.getByText(/99\+/)).toBeTruthy()
  })
})
