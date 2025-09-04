
import React from "react";
// import "./MenuBtn.css";

const MenuBtn = ({ isOpen, toggleMenu }: { isOpen: boolean; toggleMenu: () => void }) => {
  return (
    <div
      className={`menu-toggle fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[1000] w-[130px] h-[53px] cursor-pointer bg-white/70 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.075, 0.82, 0.165, 1)] rounded-4xl origin-right ${isOpen ? "opened" : "closed"}`}
      onClick={toggleMenu}
    >
      <div className="menu-toggle-icon absolute top-[27px] left-0.5 transform -translate-y-1/2 z-[10] transition-all duration-500 ease-[cubic-bezier(0.075, 0.82, 0.165, 1)] overflow-hidden rounded-full w-12 h-12 bg-white">
        <div className="hamburger absolute top-[45%] left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-7 h-7 flex justify-center items-center transition-all duration-1000 ease-[cubic-bezier(0.075, 0.82, 0.165, 1)] hover:opacity-100">
          <div className={`menu-bar absolute w-4 h-0.5 bg-black transition-all duration-300 ease-out transform translate-y-[3px] ${isOpen ? "opened translate-y-0 rotate-45 scale-x-1.05" : "closed"}`} data-position="top"></div>
          <div className={`menu-bar absolute w-4 h-0.5 bg-black transition-all duration-300 ease-out transform translate-y-[3px] ${isOpen ? "opened translate-y-0 -rotate-45 scale-x-1.05" : "closed"}`} data-position="bottom"></div>
        </div>
      </div>
      <div className="menu-copy absolute top-1/2 right-6 transform -translate-y-1/2 z-[1] transition-all duration-500 ease-[cubic-bezier(0.075, 0.82, 0.165, 1)]">
        <p className="text-[var(--base-500)] font-manrope font-semibold text-[0.9rem]">Menu</p>
      </div>
    </div>
  );
};

export default MenuBtn;
