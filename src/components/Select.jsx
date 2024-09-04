import React, { useId } from 'react';

const Select = ({ options, label, className = '', ...props }, ref) => {
    console.log(ref);

    const id = useId();
    return (
        <div className="">
            {label && (
                <label className="mb-1 block pl-1" htmlFor={id}>
                    {label}
                </label>
            )}
            <select
                id={id}
                ref={ref}
                className={`w-full rounded-lg border border-gray-200 bg-white p-2 text-black outline-none duration-200 focus:bg-gray-50 ${className}`}
                {...props}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default React.forwardRef(Select); //another type of syntax
