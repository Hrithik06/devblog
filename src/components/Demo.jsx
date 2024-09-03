// src/App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Demo() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Call the serverless function
                const response = await axios.get('/api/hello'); // Vercel will route this correctly
                setData(response.data);
            } catch (err) {
                setError(`Error: ${err.message}`);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Demo;
