import React from 'react';

const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-blur-600',
    textColor = 'white',
    className = '',
    ...props //if user sends any other properties for button
}) => {
    return (
        <button
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} ${type}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
