import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
export default function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((store) => store.auth.status);
    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login');
        } else if (!authentication && authStatus !== authentication) {
            const redirectTo = location.state?.from || '/';
            // console.log(redirectTo);
            // navigate('/');
            navigate(redirectTo);
        }

        // if (authentication && authStatus !== authentication) {
        //     if (location.pathname !== '/login') {
        //         navigate('/login', { state: { from: location.pathname } });
        //     }
        // } else if (!authentication && authStatus !== authentication) {
        //     if (location.pathname === '/login') {
        //         navigate('/');
        //     }
        // }
        setLoader(false);
    }, [authStatus, authentication, navigate]);
    return loader ? <h1>Loading...</h1> : <>{children}</>;
}
