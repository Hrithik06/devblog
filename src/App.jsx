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
        <div className="min-h-screen flex flex-wrap content-between font-inter bg-[#f3f3f3] max-w-5xl">
            <div className="w-full block">
                <ScrollToTop />
                <Header />
                <main className="">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    ) : (
        // <div className="flex items-center justify-center h-screen">
        //     <div className="relative">
        //         <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        //         <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
        //     </div>
        // </div>
        <Loader />
    );
}

export default App;
