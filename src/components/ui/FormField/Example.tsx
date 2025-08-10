'use client';

import React, { useState } from 'react';
import { FormField } from './FormField';
import { action } from '@storybook/addon-actions';

export default function Example() {
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    action('提交邮箱')(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label="邮箱"
        type="email"
        value={email}
        onChange={handleChange}
        name="email"
      />
      <button type="submit">提交</button>
    </form>
  );
}
