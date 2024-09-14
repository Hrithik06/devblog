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
            console.log(newUserData);

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
        <div className="flex w-full items-center justify-center">
            <div
                className={`mx-auto w-full max-w-lg rounded-xl border border-black/10 bg-gray-100 p-10`}
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
                        className="text-primary font-medium text-blue-700 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {errorMsg && (
                    <p className="mt-8 text-center text-red-600">{errorMsg}</p>
                )}
                <form
                    onSubmit={handleSubmit(handleSignUp)}
                    className="mt-8 space-y-4"
                >
                    <Input
                        label="Name"
                        type="text"
                        placeholder="John Doe"
                        className="rounded-lg p-2"
                        {...register('name', {
                            required: true,
                        })}
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="johndoe@abc.com"
                        className="rounded-lg p-2"
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
                        className="rounded-lg p-2"
                        {...register('password', {
                            required: true,
                        })}
                    />
                    <Button className="w-full" type="submit">
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
