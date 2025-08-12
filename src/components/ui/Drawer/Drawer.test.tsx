import { describe, it, expect, vi } from 'vitest'
import { screen, within, setup } from '@/test/test-utils'
import * as Mod from './Drawer'

const Drawer: any = (Mod as any).Drawer ?? (Mod as any).default

describe('Drawer', () => {
  it('closes when cancel clicked', async () => {
    const onClose = vi.fn()
    const { user } = setup(
      <Drawer open title="Menu" onClose={onClose}>
        <div>content</div>
      </Drawer>,
    )

    const dialog = screen.getByRole('dialog')
    const cancel = within(dialog).getByTestId('drawer-cancel-button')
    await user.click(cancel)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
