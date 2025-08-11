import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as Mod from './Steps'

const Steps: any = (Mod as any).Steps ?? (Mod as any).default

describe('Steps Component', () => {
  it('renders all step titles', () => {
    render(
      <Steps items={[{ title: 'First' }, { title: 'Second' }, { title: 'Third' }]} current={1} />,
    )
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.getByText('Third')).toBeInTheDocument()
  })

  it('applies correct status', () => {
    render(
      <Steps items={[{ title: 'First' }, { title: 'Second' }, { title: 'Third' }]} current={1} />,
    )
    const lis = screen.getAllByRole('listitem')
    expect(within(lis[0]).getByLabelText('finish')).toBeInTheDocument()
    expect(within(lis[1]).getByLabelText('process')).toBeInTheDocument()
    expect(within(lis[2]).getByLabelText('wait')).toBeInTheDocument()
  })
})
