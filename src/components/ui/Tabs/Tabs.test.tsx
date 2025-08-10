// src/components/ui/Tabs/Tabs.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Tabs } from './Tabs'

describe('Tabs', () => {
  it('renders tab buttons and switches content on click', () => {
    render(
      <Tabs
        tabs={[
          { label: 'Tab1', content: <p>Content 1</p> },
          { label: 'Tab2', content: <p>Content 2</p> },
        ]}
      />,
    )

    expect(screen.getByText('Content 1')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Tab2'))
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })
})
