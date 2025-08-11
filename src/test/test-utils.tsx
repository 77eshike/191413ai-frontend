import { render } from '@testing-library/react'
import userEvent, { PointerEventsCheckLevel } from '@testing-library/user-event'
import type { ReactElement } from 'react'

export function setup(ui: ReactElement, options?: Parameters<typeof render>[1]) {
  const user = userEvent.setup({
    pointerEventsCheck: PointerEventsCheckLevel.Never,
  })
  return { user, ...render(ui, options) }
}

export * from '@testing-library/react'
