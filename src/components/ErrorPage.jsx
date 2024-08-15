import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <h1 className="text-3xl font-semibold">404</h1>
            It looks like this page doesn't exist. Let's get you{' '}
            <Link to={'/'}>back home</Link>.
        </div>
    );
};

export default ErrorPage;
