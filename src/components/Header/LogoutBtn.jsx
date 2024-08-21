import React from 'react';
import { useDispatch } from 'react-redux';
import appwriteAuthService from '../../appwrite/auth';
import { logout as storeLogout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        appwriteAuthService.logout().then(() => {
            dispatch(storeLogout());
            navigate('/');
        });
    };
    return (
        <button
            className="inline-bock px-4 py-2 duration-200 hover:bg-blue-100 rounded-full"
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
};

export default LogoutBtn;
