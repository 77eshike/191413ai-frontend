import { render, screen, fireEvent } from '@testing-library/react'
import { Tree, TreeNode } from './Tree'

const sampleData: TreeNode[] = [
  {
    id: 'root',
    label: '� �节点',
    children: [
      {
        id: 'child',
        label: '子节点',
        children: [
          {
            id: 'leaf',
            label: '叶子节点',
          },
        ],
      },
    ],
  },
]

describe('Tree', () => {
  it('renders root node label', () => {
    render(<Tree data={sampleData} />)
    expect(screen.getByText('� �节点')).toBeInTheDocument()
  })

  it('expands and collapses nodes on toggle click', () => {
    render(<Tree data={sampleData} />)
    const toggle = screen.getAllByRole('button')[0]
    fireEvent.click(toggle) // 展开
    expect(screen.getByText('子节点')).toBeInTheDocument()
    fireEvent.click(toggle) // 收起
    expect(screen.queryByText('子节点')).not.toBeInTheDocument()
  })

  it('calls onSelect callback when node clicked', () => {
    const mockSelect = vi.fn()
    render(<Tree data={sampleData} onSelect={mockSelect} />)
    fireEvent.click(screen.getByText('� �节点'))
    expect(mockSelect).toHaveBeenCalledWith(sampleData[0])
  })
})
