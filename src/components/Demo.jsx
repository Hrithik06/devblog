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
                const user = await appwriteAuthService.getCurrentUser();

                if (user) {
                    dispatch(authLogin(user));
                    const redirectTo = location.state?.from || '/';

                    navigate(redirectTo, { replace: true });
                    navigate('/');
                }
            }
        } catch (error) {
            setErrorMsg(error.message);
        }
    };

    // Example usage in the frontend
    const createAccount = async (formData) => {
        try {
            const response = await fetch('/api/appwrite/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'login',
                    ...formData,
                }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    return (
        <div className="flex w-full items-center justify-center">
            <div
                className={`mx-auto w-full max-w-lg rounded-xl border border-black/10 bg-gray-100 p-10`}
            >
                {/* <div className="text-right">
                    <Button
                        onClick={() => navigate(location.state?.from?.pathname)}
                    >
                        X
                    </Button>
                </div> */}

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
                        className="text-primary font-medium text-blue-700 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {errorMsg && (
                    <p className="mt-8 text-center text-red-600">{errorMsg}</p>
                )}
                <form onSubmit={handleSubmit(createAccount)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Email"
                            placeholder="johndoe@abc.com"
                            type="email"
                            className="rounded-lg p-2"
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
                            className="rounded-lg p-2"
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
