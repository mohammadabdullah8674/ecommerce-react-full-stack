import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { checkUserAsync, selectError, selectLoggedInUser } from "../authSlice";



export default function Login() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const user = useSelector(selectLoggedInUser)
    const error = useSelector(selectError)

    const dispatch = useDispatch();


    return (

        <>
            {user && <Navigate to="/" replace={true}></Navigate>}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img style={{ height: "132px" }}
                        className="mx-auto w-auto"
                        src="https://iili.io/HpppNDP.png"
                        alt="apna shoppingapp"
                    />
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        noValidate
                        onSubmit={handleSubmit((data) => {
                            console.log(data)
                            dispatch(checkUserAsync({ email: data.email, password: data.password }))
                        })}
                    >
                        <div>
                            <label htmlFor="email" className="text-left block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("email",
                                        {
                                            required: "email is required",
                                            pattern: {
                                                value: /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm,
                                                message: "email is not valid"
                                            }
                                        })}
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.email && <p className='text-red-500 text-left text-xs'>{errors.email.message}</p>}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    {...register("password",
                                        {
                                            required: 'password is required',
                                        })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.password && <p className='text-red-500 text-left text-xs'>{errors.password.message}</p>}
                            </div>
                            {error && <p className='text-red-500 text-left text-xs'>{error.message}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Log in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Signup Today
                        </Link>
                    </p>
                </div>
            </div>

        </>
    );
}
