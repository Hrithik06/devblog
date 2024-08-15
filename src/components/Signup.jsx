import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as storeLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import appwriteAuthService from '../appwrite/auth';
const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState('');
    const { register, handleSubmit } = useForm();

    //data comes from react-hook-form when submitted
    const handleSignUp = async (data) => {
        setErrorMsg('');
        try {
            //this returns a session
            const newUserData = appwriteAuthService.createAccount(data);
            if (newUserData) {
                const userData = appwriteAuthService.getCurrentUser();
                if (userData) dispatch(storeLogin(userData));
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
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Create account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 text-blue-700 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {errorMsg && (
                    <p className="text-red-600 mt-8 text-center">{errorMsg}</p>
                )}
                <form onSubmit={handleSubmit(handleSignUp)} className="mt-8">
                    <div className="mt-8">
                        <Input
                            label="Name"
                            type="text"
                            placeholder="John Doe"
                            className="p-2 rounded-lg"
                            {...register('name', {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="johndoe@abc.com"
                            className="p-2 rounded-lg"
                            {...register('email', {
                                required: true,
                                validate: {
                                    //matchPattern is a custom arrow function
                                    matchPattern: (value) =>
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
                            placeholder="Enter Password"
                            className="p-2 rounded-lg"
                            {...register('password', {
                                required: true,
                            })}
                        />
                        <Button className="w-full" type="submit">
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
