'use client'

import { Tabs } from './Tabs'

export default function ExampleTabs() {
  const items = [
    { key: 'tab1', label: '标签一', content: <div>内容一</div> },
    { key: 'tab2', label: '标签二', content: <div>内容二</div> },
    { key: 'tab3', label: '标签三', content: <div>内容三</div> },
  ]

  return (
    <div className="p-4">
      <Tabs items={items} />
    </div>
  )
}
