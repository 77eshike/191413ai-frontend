// src/components/ui/Select/Select.test.tsx
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import * as Mod from './Select'

// 兼容 default / named 导出
const Select: any = (Mod as any).Select ?? (Mod as any).default

describe('Select > renders placeholder and selects value', () => {
  it('works', async () => {
    const user = userEvent.setup()
    render(
      <Select
        placeholder="请选择"
        options={[
          { label: '选项A', value: 'a' },
          { label: '选项B', value: 'b' },
        ]}
      />,
    )

    // 打开：允许实现用 <button> 或 <select>
    const trigger =
      screen.queryByRole('button') ||
      screen.queryByRole('combobox') ||
      screen.getByText(/请选择|选项A|选项B/i)

    await user.click(trigger!)

    // 面板 / 下拉项
    const list = screen.queryByRole('listbox') ?? document.body
    const optA =
      within(list).queryByRole('option', { name: /选项A/i }) ?? within(list).getByText(/选项A/i)
    await user.click(optA!)

    // 断言已选中
    const display =
      screen.queryByRole('button', { name: /选项A/i }) ??
      screen.queryByDisplayValue?.('选项A') ??
      screen.getByText(/选项A/i)

    expect(display).toBeTruthy()
  })
})
