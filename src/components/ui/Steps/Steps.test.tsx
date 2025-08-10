import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Steps } from './Steps'

describe('Steps Component', () => {
  const steps = [
    { title: 'First', description: 'First step' },
    { title: 'Second', description: 'Second step' },
    { title: 'Third', description: 'Third step' },
  ]

  it('renders all step titles', () => {
    render(<Steps steps={steps} current={1} />)
    steps.forEach(step => {
      expect(screen.getByText(step.title)).toBeInTheDocument()
    })
  })

  it('applies correct status', () => {
    render(<Steps steps={steps} current={1} />)
    expect(screen.getByText('✓')).toBeInTheDocument() // first step
    expect(screen.getByText('2')).toBeInTheDocument() // current step
  })
})
