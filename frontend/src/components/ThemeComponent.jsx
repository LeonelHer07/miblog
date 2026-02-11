import { useContext } from "react";
import { ThemeContext } from "../context/ThemeCcontext";

function ThemeToggle() {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded bg-white dark:bg-gray-700"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;
