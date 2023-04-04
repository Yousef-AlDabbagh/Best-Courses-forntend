import React, {createContext, useEffect} from 'react'

export const ThemeContext = createContext()

const defaultTheme = 'light';
const darkTheme = 'dark';

export default function ThemeProvider({children}) {
// to toggle theme
    const toggelTheme = () => {
        const oldTheme = getTheme()
        const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;

        updateTheme(newTheme, oldTheme);
    }
  // to choose theme
    useEffect(() => {
      const theme = getTheme()
      if (!theme) updateTheme(defaultTheme);
      else updateTheme(theme);
    }, [])
  return (
    <ThemeContext.Provider value={{ toggelTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

const getTheme = () => localStorage.getItem('theme');
// to update theme 
const updateTheme = (theme, themeToRemove) => {
    if (themeToRemove) document.documentElement.classList.remove(themeToRemove);

    document.documentElement.classList.add(theme);
    //The setItem() method sets the value of the specified Storage Object item.
    localStorage.setItem("theme", theme);
}  