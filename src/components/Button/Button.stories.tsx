import type { Meta, StoryObj } from '@storybook/react';

type ButtonProps = {
  label: string;
  onClick?: () => void;
};

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 16px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
};

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Click Me',
  },
};

export const WithAction: Story = {
  args: {
    label: 'With Action',
    onClick: () => alert('Button clicked!'),
  },
};
