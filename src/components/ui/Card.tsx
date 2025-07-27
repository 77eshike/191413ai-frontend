// src/components/ui/Card.tsx
import React from 'react';

export interface CardProps {
  title: string;
  description: string;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, footer }) => {
  return (
    <div className="border rounded-xl p-4 shadow-md bg-white max-w-sm">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {footer && <div className="pt-2 border-t mt-2">{footer}</div>}
    </div>
  );
};

export default Card;
