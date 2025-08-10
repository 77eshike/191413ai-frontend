'use client'

import React, { useState } from 'react'

export interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
}

export interface TreeProps {
  data: TreeNode[]
  defaultExpanded?: string[] // 默认展开项的 id 列表
  onSelect?: (node: TreeNode) => void
  selectedId?: string
}

export const Tree: React.FC<TreeProps> = ({ data, defaultExpanded = [], onSelect, selectedId }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpanded))

  const toggleExpand = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const renderTree = (nodes: TreeNode[], level = 0) => {
    return (
      <ul className="ml-4">
        {nodes.map(node => {
          const hasChildren = node.children && node.children.length > 0
          const isExpanded = expanded.has(node.id)
          const isSelected = node.id === selectedId

          return (
            <li key={node.id} className="mb-1">
              <div
                className={`flex items-center cursor-pointer space-x-1 ${
                  isSelected ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => {
                  if (hasChildren) toggleExpand(node.id)
                  onSelect?.(node)
                }}
              >
                {hasChildren && (
                  <span className="text-gray-500 w-4 text-center">{isExpanded ? '▾' : '▸'}</span>
                )}
                <span>{node.label}</span>
              </div>

              {hasChildren && isExpanded && node.children && (
                <div className="ml-4">{renderTree(node.children, level + 1)}</div>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  return <div>{renderTree(data)}</div>
}
