import React, { useMemo, useState } from 'react';
import { findNthPrime } from '../conf/helper';

const Demo = () => {
    const [text, setText] = useState(0);
    const [isDark, setIsDark] = useState(false);
    console.log('REdnering');

    // const prime = () => {
    //     console.log('Prime Function');
    //     return findNthPrime(text);
    // };

    const prime = useMemo(() => findNthPrime(text), [text]);
    return (
        <div
            className={`m-4 h-96 w-1/2 border border-black p-4 ${isDark && 'bg-black text-white'}`}
        >
            <button
                onClick={() => setIsDark(!isDark)}
                className="mb-4 border border-black bg-gray-700 p-2 text-white"
            >
                Dark Mode
            </button>
            <div>
                <input
                    type="number"
                    name="inputNumber"
                    className={`border border-black p-2 ${isDark && 'text-black'}`}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className="mt-4 text-xl font-bold">
                nth Prime Number: {prime}
            </div>
        </div>
    );
};

export default Demo;
