import React from 'react';
import { useDispatch } from 'react-redux';
import appwriteAuthService from '../../appwrite/auth';
import { logout as storeLogout } from '../../store/authSlice';
const LogoutBtn = () => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        appwriteAuthService.logout().then(() => {
            dispatch(storeLogout());
        });
    };
    return (
        <button
            className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
};

export default LogoutBtn;
