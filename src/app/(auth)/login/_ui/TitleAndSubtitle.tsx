'use client';
import gsap from 'gsap';
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrambleTextPlugin);

const TitleAndSubtitle = () => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    useGSAP(() => {
        const tl = gsap.timeline();
        tl
            .from("h2", {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 1,
            })

    }, []);

    const handleHoverTittle = () => {
        gsap.to(titleRef.current, {
            scrambleText: {
                text: "Sign in to your account",
                chars: "01!<>-_\\/[]{}—=+*^?#________",
            },
            ease: "power3.out",
            duration: 0.9,
        });
    }

    return (
        <>
            <div className='overflow-hidden'>
                <h2
                    ref={titleRef}
                    className="mt-8 text-2xl/9 font-extrabold font-cabinet tracking-tight text-white"
                    onMouseEnter={handleHoverTittle}
                >
                    Sign in to your account
                </h2>
            </div>
            <p className="mt-2 text-sm/6 text-gray-400">
                Not a member?{' '}
                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Start a 14 day free trial
                </a>
            </p>
        </>
    )
}

export default TitleAndSubtitle