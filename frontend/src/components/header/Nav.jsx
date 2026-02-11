import React, { useContext } from "react";
import Moonwhite from "../../assets/moonwhite.svg";
import Sunwhite from "../../assets/sunwhite.svg";
import Moondark from "../../assets/moon.svg"
import Sundark from "../../assets/sun.svg"
import { ThemeContext } from "../../context/ThemeCcontext";

const Nav = () => {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex justify-between mb-[50px]">
      <h1 className="text-black dark:text-white">Leonel</h1>

      <nav className="flex gap-[14px] items-center">
        <ul className="flex gap-[14px] text-lg text-black dark:text-white">
          <a href="/"><li>Blog</li></a>
          <a href="/"><li>Projects</li></a>
          <a href="/"><li>About</li></a>
          <a href="/"><li>Newsletter</li></a>
        </ul>

        {/* Toggle theme */}

        <div className="w-[96px] h-[40px] rounded-[29px] py-[8px] px-[16px] bg-[#090D1F] dark:bg-white">
        <button
            onClick={toggleTheme}
            className="flex gap-[16px] items-center"
            aria-label="Toggle dark mode"
        >
            {/* Modo claro */}
            <img
            src={Sunwhite}
            alt="Sun light"
            className="block dark:hidden"
            />
            <img
            src={Moonwhite}
            alt="Moon light"
            className="block dark:hidden"
            />

            {/* Modo oscuro */}
            <img
            src={Sundark}
            alt="Sun dark"
            className="hidden dark:block"
            />
            <img
            src={Moondark}
            alt="Moon dark"
            className="hidden dark:block"
            />
        </button>
        </div>


      </nav>
    </div>
  );
};

export default Nav;
