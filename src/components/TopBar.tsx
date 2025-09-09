'use client';
import React, { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useViewTransition } from '@/hooks/useViewTransition';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
    { name: 'Log in', href: '#' },
]

const TopBar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { navigateWithTransition } = useViewTransition();
    const pathname = usePathname();
    console.log(pathname);
    return (
        <header className="absolute inset-x-0 top-0 z-50 mix-blend-difference">
            <div className="mx-auto max-w-7xl px-6 pt-6 lg:pr-0 lg:pl-8 ">
                {/* <div className="px-6 pt-6 lg:max-w-2xl lg:pr-0 lg:pl-8 bg-red-400"> */}
                <nav aria-label="Global" className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="-m-1.5 p-1.5"
                        onClick={(e) => {
                            e.preventDefault();
                            if (pathname !== '/') {
                                navigateWithTransition('/');
                            }
                        }}
                    >
                        <span className="sr-only">Your Company</span>
                        {/* <img
                            alt="Your Company"
                            src="https://cdn.cosmos.so/7d926916-feea-442f-9657-f75b223072dc?format=jpeg"
                            className="h-10 w-auto rounded-full"
                        /> */}

                        <p className='text-white text-3xl font-bold'>/R</p>
                    </Link>
                    {/* <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-200 lg:hidden"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button> */}
                    <div className="-m-2.5 rounded-md p-2.5">
                        {/* {navigation.map((item) => ( */}
                        <a
                            key={'login'}
                            href={'/login'}
                            className="text-lg font-semibold flex items-center text-white mix-blend-darken"
                            onClick={(e) => {
                                e.preventDefault();
                                navigateWithTransition('/login');
                            }}
                        >
                            Login
                            <ArrowRightIcon aria-hidden="true" className="size-4 ml-1 text-white" />
                        </a>
                        {/* ))} */}
                    </div>
                </nav>
                {/* </div> */}
            </div>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-200"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-white/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}

export default TopBar