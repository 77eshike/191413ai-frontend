import { useState } from 'react';
import { Form } from './Form';
import { action } from '@storybook/addon-actions';

export default function ExampleForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = () => {
    action('提交表单数据')(formData);
  };

  return (
    <div className="p-4">
      <Form
        fields={[
          { label: '姓名', name: 'name', type: 'text' },
          { label: '邮箱', name: 'email', type: 'email' },
        ]}
        onChange={setFormData}
        onSubmit={handleSubmit}
        submitText="提交"
      />
    </div>
  );
}
