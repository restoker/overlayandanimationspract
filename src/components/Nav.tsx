"use client";
// import "./Nav.css";

import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { useRouter } from "next/navigation";

import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/SplitText";
import { useLenis } from "lenis/react";

import { useViewTransition } from "@/hooks/useViewTransition";
import MenuBtn from "./MenuBtn";

gsap.registerPlugin(SplitText);

const Nav = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef<boolean>(false);
  const splitTextRefs = useRef<SplitText[]>([]);
  const router = useRouter();
  const lenis = useLenis();

  const { navigateWithTransition } = useViewTransition();

  useEffect(() => {
    if (lenis) {
      if (isOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, isOpen]);

  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );
  }, []);

  useLayoutEffect(() => {
    if (menuRef.current) {
      const menu = menuRef.current;

      splitTextRefs.current.forEach((split) => {
        if (split.revert) split.revert();
      });
      splitTextRefs.current = [];

      gsap.set(menu, {
        clipPath: "circle(0% at 50% 50%)",
      });

      const h2Elements = menu.querySelectorAll("h2");
      const pElements = menu.querySelectorAll("p");

      h2Elements.forEach((h2, index) => {
        const split = SplitText.create(h2, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.set(split.lines, { y: "120%" });

        split.lines.forEach((line) => {
          (line as HTMLElement).style.pointerEvents = "auto";
        });

        splitTextRefs.current.push(split);
      });

      pElements.forEach((p, index) => {
        const split = SplitText.create(p, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.set(split.lines, { y: "120%" });

        split.lines.forEach((line) => {
          (line as HTMLElement).style.pointerEvents = "auto";
        });

        splitTextRefs.current.push(split);
      });

      isInitializedRef.current = true;
    }
  }, []);

  const animateMenu = useCallback((open: boolean) => {
    if (!menuRef.current) {
      return;
    }

    const menu = menuRef.current;

    setIsAnimating(true);

    if (open) {
      document.body.classList.add("menu-open");

      gsap.to(menu, {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power3.out",
        duration: 2,
        onStart: () => {
          menu.style.pointerEvents = "all";
          splitTextRefs.current.forEach((split, index) => {
            gsap.to(split.lines, {
              y: "0%",
              stagger: 0.05,
              delay: 0.35 + index * 0.1,
              duration: 1,
              ease: "power4.out",
            });
          });
        },
        onReverseComplete: () => {
        },
        onComplete: () => {
          setIsAnimating(false);
        },
      });
    } else {
      const textTimeline = gsap.timeline({
        onStart: () => {
          gsap.to(menu, {
            clipPath: "circle(0% at 50% 50%)",
            ease: "power3.out",
            duration: 1,
            delay: 0.75,
            onComplete: () => {
              menu.style.pointerEvents = "none";

              splitTextRefs.current.forEach((split) => {
                gsap.set(split.lines, { y: "120%" });
              });

              document.body.classList.remove("menu-open");

              setIsAnimating(false);
              setIsNavigating(false);
            },
          });
        },
      });

      splitTextRefs.current.forEach((split, index) => {
        textTimeline.to(
          split.lines,
          {
            y: "-120%",
            stagger: 0.03,
            delay: index * 0.05,
            duration: 1,
            ease: "power3.out",
          },
          0
        );
      });
    }
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) {
      animateMenu(isOpen);
    }
  }, [isOpen, animateMenu]);

  const toggleMenu = useCallback(() => {
    if (!isAnimating && isInitializedRef.current && !isNavigating) {
      setIsOpen((prevIsOpen) => {
        return !prevIsOpen;
      });
    } else {
    }
  }, [isAnimating, isNavigating]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault();

      const currentPath = window.location.pathname;
      if (currentPath === href) {
        if (isOpen) {
          setIsOpen(false);
        }
        return;
      }

      if (isNavigating) return;

      setIsNavigating(true);
      navigateWithTransition(href);
    },
    [isNavigating, router, isOpen, setIsOpen]
  );

  const splitTextIntoSpans = (text: string) => {
    return text
      .split("")
      .map((char, index) =>
        char === " " ? (
          <span key={index}>&nbsp;&nbsp;</span>
        ) : (
          <span key={index}>{char}</span>
        )
      );
  };

  return (
    <>
      <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />
      <div className="menu fixed top-0 left-0 w-full h-full clip-path-circle-0_at_50_50 overflow-hidden z-[100] m-2 bg-transparent rounded-4xl" ref={menuRef}>
        <div className="menu-wrapper bg-lime-50/5 backdrop-blur-xl relative w-full h-full flex flex-col justify-between gap-8 rounded-4xl">
          <div className="col col-1 relative h-full flex flex-3 p-8">
            <div className="links">
              <div className="link relative pointer-events-auto">
                <a href="/" onClick={(e) => handleLinkClick(e, "/")}>
                  <h2 className="decoration-0 text-[rgb(153, 143, 130)] text-6xl pointer-events-none transition duration-300 ease-out leading-[1.1] hover:text-amber-400 text-zinc-400">Index</h2>
                </a>
              </div>
              <div className="link relative pointer-events-auto">
                <a
                  href="/contact"
                  onClick={(e) => handleLinkClick(e, "/contact")}
                >
                  <h2 className="decoration-0 text-[rgb(153, 143, 130)] text-6xl pointer-events-none transition duration-300 ease-out leading-[1.1] hover:text-amber-400 text-zinc-400">Contact</h2>
                </a>
              </div>
              <div className="link relative pointer-events-auto">
                <a
                  href="/about"
                  onClick={(e) => handleLinkClick(e, "/about")}
                >
                  <h2 className="decoration-0 text-[rgb(153, 143, 130)] text-6xl pointer-events-none transition duration-300 ease-out leading-[1.1] hover:text-amber-400 text-zinc-400">About</h2>
                </a>
              </div>
              <div className="link relative pointer-events-auto">
                <a
                  href="/sample-space"
                  onClick={(e) => handleLinkClick(e, "/sample-space")}
                >
                  <h2 className="decoration-0 text-[rgb(153, 143, 130)] text-6xl pointer-events-none transition duration-300 ease-out leading-[1.1] hover:text-amber-400 text-zinc-400">One Installation</h2>
                </a>
              </div>
              <div className="link relative pointer-events-auto">
                <a
                  href="/blueprints"
                  onClick={(e) => handleLinkClick(e, "/blueprints")}
                >
                  <h2 className="decoration-0 text-[rgb(153, 143, 130)] text-6xl pointer-events-none transition duration-300 ease-out leading-[1.1] hover:text-amber-400 text-zinc-400">Blueprints</h2>
                </a>
              </div>
              <div className="link relative pointer-events-auto">
                <a
                  href="/connect"
                  onClick={(e) => handleLinkClick(e, "/connect")}
                >
                  <h2 className="decoration-0 text-[rgb(153, 143, 130)] text-6xl pointer-events-none transition duration-300 ease-out leading-[1.1] hover:text-amber-400 text-zinc-400">Connect</h2>
                </a>
              </div>
            </div>
          </div>
          <div className="col col-2 relative h-full flex flex-2 p-8 align-end">
            <div className="socials w-[50%] flex gap-[2em] text-zinc-400">
              <div className="sub-col flex-1 flex flex-col justify-end gap-[2rem]">
                <div className="menu-meta menu-commissions">
                  <p>Commissions</p>
                  <p>build@terrene.studio</p>
                  <p>+1 (872) 441‑2086</p>
                </div>
                <div className="menu-meta">
                  <p>Studio Address</p>
                  <p>18 Cordova Lane</p>
                  <p>Seattle, WA 98101</p>
                </div>
              </div>
              <div className="sub-col flex-1 flex flex-col justify-end gap-[2rem]">
                <div className="menu-meta">
                  <p>Social</p>
                  <p>Instagram</p>
                  <p>Are.na</p>
                  <p>LinkedIn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
