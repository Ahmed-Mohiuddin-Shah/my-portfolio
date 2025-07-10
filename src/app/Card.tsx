import React, { ReactNode } from 'react';

type CardProps = {
    children: ReactNode;
    className?: string;
};

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
    <div
        className={`rounded-2xl p-4 shadow ${className}`}
    >
        {children}
    </div>
);

export default Card;