import { NavLink } from "react-router-dom";
import Moonwhite from "../../assets/moonwhite.svg";
import Sunwhite from "../../assets/sunwhite.svg";
import Moondark from "../../assets/moon.svg"
import Sundark from "../../assets/sun.svg"
import { useTheme } from "../../context/useTheme";

const Nav = () => {
  const { toggleTheme } = useTheme();
  const links = [
    { label: "Blog", to: "/" },
    { label: "Projects", to: "/" },
    { label: "About", to: "/" },
    { label: "Newsletter", to: "/" },
  ];

  return (
    <header className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-lg font-semibold text-slate-950 dark:text-white">Leonel</h1>

      <nav className="flex flex-wrap items-center gap-4">
        <ul className="flex flex-wrap gap-4 text-base text-slate-700 dark:text-slate-200">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive && link.label === "Blog"
                    ? "font-semibold text-slate-950 dark:text-white"
                    : "hover:text-slate-950 dark:hover:text-white"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
            onClick={toggleTheme}
            className="flex h-10 w-24 items-center justify-center gap-4 rounded-full bg-[#090D1F] px-4 py-2 dark:bg-white"
            aria-label="Toggle dark mode"
        >
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
      </nav>
    </header>
  );
};

export default Nav;
