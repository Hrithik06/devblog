import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import appwriteAuthService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (data) => {
        setErrorMsg('');
        try {
            const session = await appwriteAuthService.login(data);
            if (session) {
                const userData = await appwriteAuthService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                // const redirectTo = location.state?.from || '/';
                // navigate(redirectTo, { replace: true });
                navigate('/');
            }
        } catch (error) {
            setErrorMsg(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
            >
                {/* <div className="text-right">
                    <Button
                        className=""
                        onClick={() => navigate(location.state?.from?.pathname)}
                    >
                        X
                    </Button>
                </div> */}
                <Button
                    className=""
                    onClick={() => navigate(location.state?.from?.pathname)}
                >
                    Go Back
                </Button>

                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {errorMsg && (
                    <p className="text-red-600 mt-8 text-center">{errorMsg}</p>
                )}
                <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Email"
                            placeholder="johndoe@abc.com"
                            type="email"
                            className="p-2 rounded-lg"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPatern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                            value,
                                        ) ||
                                        'Email address must be a valid address',
                                },
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter password"
                            className="p-2 rounded-lg"
                            {...register('password', {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full">
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
