import { render, screen, fireEvent } from '@testing-library/react'
import { Accordion } from './Accordion'

describe('Accordion', () => {
  const items = [
    { title: '项一', content: '内容一' },
    { title: '项二', content: '内容二' },
  ]

  it('默认显示第一项内容', () => {
    render(<Accordion items={items} defaultOpenIndex={0} />)
    expect(screen.getByText('内容一')).toBeInTheDocument()
    expect(screen.queryByText('内容二')).not.toBeInTheDocument()
  })

  it('点击切换展开内容', () => {
    render(<Accordion items={items} />)

    fireEvent.click(screen.getByText('项二'))
    expect(screen.getByText('内容二')).toBeInTheDocument()

    fireEvent.click(screen.getByText('项二'))
    expect(screen.queryByText('内容二')).not.toBeInTheDocument()
  })
})
