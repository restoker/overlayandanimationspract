"use client";
import { useViewTransition } from "@/hooks/useViewTransition";

export default function Home() {
  const { navigateWithTransition } = useViewTransition();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-[10rem] font-bold uppercase">Hola</h1>
      <a href="/about" onClick={(e) => {
        e.preventDefault();
        navigateWithTransition("/about");
      }}>About</a>
      <a href="/contact" onClick={(e) => {
        e.preventDefault();
        navigateWithTransition("/contact");
      }}>Contact</a>
    </div>
  );
}
