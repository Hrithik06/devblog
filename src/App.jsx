import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import appwriteAuthService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header, Loader, ScrollToTop } from './components';
import { Outlet } from 'react-router-dom';

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        appwriteAuthService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login(userData));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, []);

    return !loading ? (
        <div className="flex min-h-screen flex-wrap content-between bg-[#f3f3f3] font-inter">
            <div className="block w-full">
                <ScrollToTop />
                <Header />
                <main className="">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    ) : (
        <Loader />
    );
}

export default App;
