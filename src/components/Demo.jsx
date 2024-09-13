import React from 'react';

const Demo = () => {
    return (
        <div className={`m-4 h-96 w-1/2 border border-black p-4`}>
            <input
                type="number"
                name="inputNumber"
                className={`border border-black p-2`}
                placeholder="input"
            />
            <input
                // type="number"
                name="firstName"
                className={`border border-black p-2`}
            />
            <input
                // type="number"
                name="lastName"
                className={`border border-black p-2`}
            />

            <button className="mb-4 border border-black bg-gray-700 p-2 text-white">
                Submit
            </button>
        </div>
    );
};

export default Demo;
