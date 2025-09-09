'use client';
import React from 'react'
import { useViewTransition } from '@/hooks/useViewTransition';
import Link from 'next/link';

const Logo = () => {
    const { navigateWithTransition } = useViewTransition();

    return (
        <Link href="/" onClick={(e) => {
            e.preventDefault();
            navigateWithTransition("/");
        }}>
            {/* <img
                alt="Your Company"
                src="https://cdn.cosmos.so/7d926916-feea-442f-9657-f75b223072dc?format=jpeg"
                className="h-10 w-auto rounded-full"
            /> */}
            <p className='text-white text-3xl font-bold mix-blend-difference'>/R</p>
        </Link>
    )
}

export default Logo