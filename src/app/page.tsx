"use client";
import Nav from "@/components/Nav";
import { useViewTransition } from "@/hooks/useViewTransition";

export default function Home() {
  const { navigateWithTransition } = useViewTransition();
  return (
    <div
      className="relative"
    >
      {/* <div
        className="h-[calc(100dvh)] w-full"
        style={{
          // backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1), oklch(84.1% 0.238 128.85/10%)), url('https://cdn.cosmos.so/419ad5d8-ccc2-4976-a744-087d7ab1d005?format=jpeg')",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(0,0,0,0.4), rgba(255,255,255,0.5)), url('https://cdn.cosmos.so/81be8635-d727-4c7d-8cdd-5d61e756876d?format=jpeg') no-repeat 10% 10%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))",
        }}
      ></div> */}
      <video
        autoPlay
        muted
        loop
        src="/videos/intro.mp4"
        className="absolute top-0 left-0 w-dvw h-dvh object-cover object-center"
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
