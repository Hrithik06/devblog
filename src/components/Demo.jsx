import { useForm } from 'react-hook-form';
import React from 'react';
import { Input, Button, RTE } from './index';

const Demo = () => {
    const [errorMsg, setErrorMsg] = React.useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handleLogin = (data) => {
        setErrorMsg('');

        console.log(data);
    };
    return (
        <div>
            <form onSubmit={handleSubmit(handleLogin)}>
                <Input
                    label="Email: "
                    placeholder="Enter your email address"
                    type="email"
                    className="p-2 rounded-md m-2 w-96"
                    {...register('email', {
                        required: true,
                        validate: {
                            matchPatern: (value) =>
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                    value,
                                ) || 'Email address must be a valid address',
                        },
                    })}
                />

                <div className="flex">
                    <Input
                        label="Password: "
                        placeholder="Enter your password "
                        type="password"
                        className="p-2 rounded-md m-2 w-96"
                        {...register('password', {
                            required: true,
                            validate: {
                                matchPatern: (value) =>
                                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                                        value,
                                    ) ||
                                    `- min 8 characters
                                    - at least 1 uppercase letter, 1 lowercase letter, and 1 number
                                    - Can contain special characters`,
                            },
                        })}
                    />
                </div>
                <Button type="submit" className="w-96 bg-blue-500">
                    Sign in
                </Button>
            </form>
            {errorMsg && (
                <p className="text-red-600 mt-8 text-center">{errorMsg}</p>
            )}
            {errors.email && (
                <p className="text-red-600 mt-2">{errors.email.message}</p>
            )}
            {errors.password && (
                <p className="text-red-600 mt-2">{errors.password.message}</p>
            )}
            <RTE />
        </div>
    );
};

export default Demo;
