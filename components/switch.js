import { useEffect, useState } from "react";

const Switch = () => {
  // const [darkTheme, setDarkTheme] = useState(undefined);
  const [darkTheme, setDarkTheme] = useState("");

  const handleToggle = (e) => {
    setDarkTheme(e.target.checked);
  };

  useEffect(() => {
    if (darkTheme !== undefined) {
      if (darkTheme) {
        window.localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        window.localStorage.setItem("theme", "light");
        document.documentElement.removeAttribute("data-theme");
      }
    }
  }, [darkTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );
    // Set initial darkmode to light
    setDarkTheme(initialColorValue === "ligth");
  }, []);

  return (
    <form action="" className="c-switch__wrapper">
      <label className="c-switch">
        <input type="checkbox" checked={darkTheme} onChange={handleToggle} />
        <span className="c-switch__button"></span>
      </label>
    </form>
  );
};

export default Switch;
