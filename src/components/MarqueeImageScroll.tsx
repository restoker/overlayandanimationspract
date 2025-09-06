'use client';
import React, { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { dataCol1, dataCol2 } from '@/app/data';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

const MarqueeImageScroll = () => {

    const lenis = useLenis();
    const element = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!lenis) return;
        lenis.on("scroll", ({ scroll }) => {
            ScrollTrigger.update();
            // animateHero(scroll);
        });
    }, [lenis])

    useGSAP(() => {
        const scrollSelector = {
            element: element.current,
            wrapper: wrapper.current,
        };

        // const initLenis = () => {
        //   const lenis = new Lenis({
        //     lerp: 0.04,
        //     smoothWheel: true,
        //   });
        //   lenis.on("scroll", ({ scroll }) => {
        //     ScrollTrigger.update();
        //     animateHero(scroll);
        //   });
        //   gsap.ticker.add((time) => lenis.raf(time * 1000));
        //   gsap.ticker.lagSmoothing(0);
        // };

        // const animateHero = (scroll: number) => {
        //     // console.log(scroll);
        //     const heroFigure = document.querySelector(".hero_figure").children[0];
        //     heroFigure.style.transform = `translateY(${-scroll * 0.05}px) scale(${1 - scroll * 0.001})`;
        // };
        const createContents = () => {
            const datasets = [dataCol1, dataCol2];

            datasets.forEach((data) => {
                const scrollRow = document.createElement("div");
                scrollRow.classList.add("scroll_row");
                scrollSelector.wrapper!.appendChild(scrollRow);

                data.forEach((item, i) => {
                    const scrollItem = document.createElement("div");
                    scrollItem.classList.add("scroll_row_item");
                    scrollItem.id = item.id;

                    scrollItem.innerHTML = `
                    <div class="scroll_row_item_img md:h-[25rem] md:w-[18rem] h-[10rem] w-[5rem] ${i % 2 === 0 ? "rounded-tl-4xl rounded-bl-4xl" : "rounded-tr-4xl rounded-br-4xl"}">
                        <img class="${i % 2 === 0 ? "rounded-tl-4xl rounded-bl-4xl" : "rounded-tr-4xl rounded-br-4xl"} md:h-[25rem] md:w-[18rem] h-[10rem] w-[5rem] border-[1px] border-amber-400/20" src="${item.img}" alt="" />
                    </div>
                `;
                    scrollRow.appendChild(scrollItem);
                });
            });
        };

        const animateMedia = () => {
            const scrollRows = document.querySelectorAll(".scroll_row");
            let scrollRowWidth: number = 0;
            const windowWidth = window.innerWidth;

            // scrollRows.forEach((item) => {
            //     scrollRowWidth = item.getBoundingClientRect().width;
            //     // console.log(scrollRowWidth);
            // });
            for (const element of scrollRows) {
                scrollRowWidth = element.getBoundingClientRect().width;
            }
            // console.log(scrollRowWidth - windowWidth);

            gsap.set(scrollRows[0], { x: 0 });
            gsap.set(scrollRows[1], { x: `${-scrollRowWidth + windowWidth}` });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: scrollSelector.element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
            tl.to(scrollRows[0], {
                x: `-${scrollRowWidth - windowWidth}`,
            });
            tl.to(scrollRows[1], { x: 0 }, 0);
        };

        // createContents();
        // initLenis();
        animateMedia();

    }, { dependencies: [] })

    return (
        <div className='bg-black'>
            <section ref={element} className="scroll relative w-full h-full overflow-hidden py-[10rem]">
                <div ref={wrapper} className="scroll_wrapper">
                    <div className="scroll_row">
                        {dataCol1.map((item, i) => (
                            <div key={item.id} className="scroll_row_item">
                                <div className={clsx(
                                    "scroll_row_item_img md:h-[20rem] md:w-[18rem] h-[10rem] w-[5rem]",
                                    i % 2 === 0
                                        ? "rounded-tl-4xl rounded-bl-4xl"
                                        : "rounded-tr-4xl rounded-br-4xl"
                                )}>
                                    <img src={item.img} alt="" className={clsx(
                                        "md:h-[20rem] md:w-[18rem] h-[10rem] w-[5rem] border-[1px] border-amber-400/20", i % 2 === 0 ? "rounded-tl-4xl rounded-bl-4xl" : "rounded-tr-4xl rounded-br-4xl")} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="scroll_row">
                        {dataCol2.map((item, i) => (
                            <div key={item.id} className="scroll_row_item">
                                <div className={clsx("scroll_row_item_img md:h-[20rem] md:w-[18rem] h-[10rem] w-[5rem]", i % 2 === 0 ? "rounded-tl-4xl rounded-bl-4xl" : "rounded-tr-4xl rounded-br-4xl")}>
                                    <img src={item.img} alt="" className={clsx("md:h-[20rem] md:w-[18rem] h-[10rem] w-[5rem] border-[1px] border-amber-400/20", i % 2 === 0 ? "rounded-tl-4xl rounded-bl-4xl" : "rounded-tr-4xl rounded-br-4xl")} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MarqueeImageScroll