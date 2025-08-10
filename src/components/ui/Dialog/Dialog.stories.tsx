import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Feedback/Dialog',
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>打开 Dialog</Button>
        <Dialog
          title="示例对话框"
          description="这是一个简单的 Dialog 示例"
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            action('Dialog 已关闭')();
          }}
        />
      </>
    );
  },
};
