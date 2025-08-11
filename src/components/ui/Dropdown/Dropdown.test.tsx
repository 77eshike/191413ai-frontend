import { describe, it, expect, vi } from 'vitest'
import { screen, setup } from '@/test/test-utils'
import * as Mod from './Dropdown'

const Dropdown: any = (Mod as any).Dropdown ?? (Mod as any).default

describe('Dropdown', () => {
  it('confirmable footer works', async () => {
    const onConfirm = vi.fn()
    const { user } = setup(<Dropdown defaultOpen confirmable onConfirm={onConfirm} />)

    const confirm = screen.getByTestId('dropdown-confirm-button')
    await user.click(confirm)
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })
})
