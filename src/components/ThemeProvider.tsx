import React, { useState } from "react";
import { PropsWithChildren } from "react";

type Theme = "dark" | "light";
type ThemeContextType = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const backgroundColor = theme === "dark" ? "#333333" : "#c0c0c0";
  document.body.style.backgroundColor = backgroundColor;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
