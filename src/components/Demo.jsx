import React, { useState, useEffect } from 'react';

function Demo() {
    const [message, setMessage] = useState('');

    const test = async () => {
        await fetch('/api/hello')
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);

                setMessage(data.message);
            });
    };

    useEffect(() => {
        test();
    }, []);

    return <div>{<h1>{console.log(message)}</h1>}</div>;
}

export default Demo;
