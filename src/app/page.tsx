"use client";
import Nav from "@/components/Nav";
import { useViewTransition } from "@/hooks/useViewTransition";

export default function Home() {
  const { navigateWithTransition } = useViewTransition();
  return (
    <div className="">
      <img
        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover object-center"
      />
      <Nav />
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
