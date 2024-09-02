import React from 'react';

const Container = ({ children }) => {
    return (
        <div
            className={`w-full 2xl:max-w-7xl xl:max-w-6xl lg:max-w-4xl md:max-w-2xl mx-auto px-4 `}
        >
            {children}
        </div>
    );
};

export default Container;
