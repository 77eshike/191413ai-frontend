import { render } from '@testing-library/react'
import { Progress } from './Progress'

describe('Progress', () => {
  it('渲染正确百分比宽度', () => {
    const { container } = render(<Progress value={50} max={100} />)
    const progressBar = container.querySelector('div > div') as HTMLDivElement
    expect(progressBar).toHaveStyle('width: 50%')
  })

  it('处理 value 超出 max 的情况', () => {
    const { container } = render(<Progress value={200} max={100} />)
    const progressBar = container.querySelector('div > div') as HTMLDivElement
    expect(progressBar).toHaveStyle('width: 100%')
  })

  it('处理负值情况', () => {
    const { container } = render(<Progress value={-10} max={100} />)
    const progressBar = container.querySelector('div > div') as HTMLDivElement
    expect(progressBar).toHaveStyle('width: 0%')
  })
})
