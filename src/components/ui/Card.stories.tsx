// src/components/ui/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from './Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: '卡片标题',
    description: '这是卡片的说明文字内容，支持多行展示。',
  },
};

export const WithFooter: Story = {
  args: {
    title: '带底部操作的卡片',
    description: '说明文字段落。',
    footer: <Button label="了解更多" />,
  },
};
