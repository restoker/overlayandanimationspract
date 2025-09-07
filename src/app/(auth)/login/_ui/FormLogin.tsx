'use client';
import React from 'react'
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';

const FormLogin = () => {

    const input1Ref = useRef<HTMLLabelElement>(null);
    const input2Ref = useRef<HTMLLabelElement>(null);

    const { context, contextSafe } = useGSAP();

    const onHandleFocus1 = contextSafe(() => {
        gsap.to(input1Ref.current, {
            scrambleText: {
                text: "Email address",
                chars: "01!<>-_\/[]{}—=+*^?#________",
            },
            ease: "power3.out",
            duration: 1.2,
        })
    })

    const onHandleFocus2 = contextSafe(() => {
        gsap.to(input2Ref.current, {
            scrambleText: {
                text: "Password",
                chars: "01!<>-_\/[]{}—=+*^?#________",
            },
            ease: "power3.out",
            duration: 1.2,
        })
    })

    return (
        <>
            <form className="space-y-6">
                <div>
                    <label ref={input1Ref} htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            onFocus={onHandleFocus1}
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div>
                    <label ref={input2Ref} htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                        Password
                    </label>
                    <div className="mt-2">
                        <input

                            onFocus={onHandleFocus2}
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                        <div className="flex h-6 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-white/10 bg-white/5 checked:border-indigo-500 checked:bg-indigo-500 indeterminate:border-indigo-500 indeterminate:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                    <path
                                        d="M3 8L6 11L11 3.5"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-checked:opacity-100"
                                    />
                                    <path
                                        d="M3 7H11"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-indeterminate:opacity-100"
                                    />
                                </svg>
                            </div>
                        </div>
                        <label htmlFor="remember-me" className="block text-sm/6 text-gray-300">
                            Remember me
                        </label>
                    </div>
                    <div className="text-sm/6">
                        <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                            Forgot password?
                        </a>
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </>
    )
}

export default FormLogin