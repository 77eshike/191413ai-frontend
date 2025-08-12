import React, { useState } from 'react'

export interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
}

export interface TreeProps {
  data: TreeNode | TreeNode[]
  onSelect?: (node: TreeNode) => void
}

function Node({ node, onSelect }: { node: TreeNode; onSelect?: (node: TreeNode) => void }) {
  const [open, setOpen] = useState(false)
  const hasChildren = !!node.children?.length

  return (
    <div>
      {hasChildren && (
        <button type="button" aria-label="toggle" onClick={() => setOpen(o => !o)}>
          {open ? '-' : '+'}
        </button>
      )}
      <span onClick={() => onSelect?.(node)}>{node.label}</span>
      {open &&
        node.children?.map(c => (
          <div key={c.id} style={{ marginLeft: 16 }}>
            <Node node={c} onSelect={onSelect} />
          </div>
        ))}
    </div>
  )
}

function TreeBase({ data, onSelect }: TreeProps) {
  const list = Array.isArray(data) ? data : [data]
  return (
    <div>
      {list.map(n => (
        <Node key={n.id} node={n} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default TreeBase
export { TreeBase as Tree }
