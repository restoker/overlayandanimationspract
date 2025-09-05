'use client';
import React, { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useViewTransition } from '@/hooks/useViewTransition';

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
    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <div className="mx-auto max-w-7xl px-6 pt-6 lg:pr-0 lg:pl-8">
                {/* <div className="px-6 pt-6 lg:max-w-2xl lg:pr-0 lg:pl-8 bg-red-400"> */}
                <nav aria-label="Global" className="flex items-center justify-between">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            alt="Your Company"
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                            className="h-8 w-auto"
                        />
                    </a>
                    {/* <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-200 lg:hidden"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button> */}
                    <div className="-m-2.5 rounded-md p-2.5 text-gray-200">
                        {/* {navigation.map((item) => ( */}
                        <a
                            key={'login'}
                            href={'/login'}
                            className="text-sm/6 font-semibold text-white"
                            onClick={(e) => {
                                e.preventDefault();
                                navigateWithTransition('/login');
                            }}
                        >
                            Login
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