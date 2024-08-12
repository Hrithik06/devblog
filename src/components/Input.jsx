import React, { useId, forwardRef } from 'react';

const Input = forwardRef(
    ({ label, type = 'text', className = '', ...props }, ref) => {
        const id = useId();
        return (
            <div className="w-full flex flex-col">
                {label && (
                    <label className="inline-block mb-1.5" htmlFor={id}>
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    className={` ${className}`}
                    ref={ref}
                    {...props}
                    id={id}
                />
            </div>
        );
    },
);
export default Input;
