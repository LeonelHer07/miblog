import { useTheme } from "../../context/useTheme";

function ThemeToggle() {
  const { dark, toggleTheme } = useTheme();

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
