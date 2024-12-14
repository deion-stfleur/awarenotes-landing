import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [bgColor, setBgColor] = useState("white");
  const [title, setTitle] = useState("Awarenotes");

  const toggleBackgroundAndTitle = () => {
    setBgColor((prevColor) => (prevColor === "white" ? "#1b1b1b" : "white"));
    setTitle((prevTitle) =>
      prevTitle === "Awarenotes" ? "Awarenotes" : "Awarenotes"
    );
  };

  return (
    <ThemeContext.Provider value={{ bgColor, title, toggleBackgroundAndTitle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
