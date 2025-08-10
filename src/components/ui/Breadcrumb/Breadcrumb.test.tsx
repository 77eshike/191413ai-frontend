import { render, screen } from '@testing-library/react'
import { Breadcrumb } from './Breadcrumb'
import { describe, it, expect } from 'vitest'

describe('Breadcrumb', () => {
  it('renders all breadcrumb items', () => {
    render(
      <Breadcrumb
        items={[
          { label: '首页', href: '/' },
          { label: '项目', href: '/projects' },
          { label: '详情', isCurrent: true },
        ]}
      />,
    )
    expect(screen.getByText('首页')).toBeInTheDocument()
    expect(screen.getByText('项目')).toBeInTheDocument()
    expect(screen.getByText('详情')).toBeInTheDocument()
  })

  it('renders current item as plain text', () => {
    render(
      <Breadcrumb
        items={[
          { label: '控制台', href: '/dashboard' },
          { label: '当前页', isCurrent: true },
        ]}
      />,
    )
    expect(screen.getByText('当前页').closest('a')).toBeNull()
  })
})
