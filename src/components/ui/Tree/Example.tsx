'use client'

import { Tree } from './Tree'

const treeData = [
  {
    key: '1',
    label: '� �节点',
    children: [
      {
        key: '1-1',
        label: '子节点 1',
        children: [
          { key: '1-1-1', label: '叶子节点 A' },
          { key: '1-1-2', label: '叶子节点 B' },
        ],
      },
      {
        key: '1-2',
        label: '子节点 2',
      },
    ],
  },
]

export default function ExampleTree() {
  return (
    <div className="p-4">
      <Tree data={treeData} />
    </div>
  )
}
