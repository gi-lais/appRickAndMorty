import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider } from 'styled-components';

const lightTheme = {
    backgroundPrimary: '#F5F5F5',
    backgroundSecondary: '#FFFFFF',
    textPrimary: '#000000',
    textSecondary: '#666666',
    buttonBackground: '#E0E0E0',
    buttonText: '#000000',
};

const darkTheme = {
    backgroundPrimary: '#121212',
    backgroundSecondary: '#1F1F1F',
    textPrimary: '#FFFFFF',
    textSecondary: '#BBBBBB',
    buttonBackground: '#696969',
    buttonText: '#FFFFFF',
};

const ThemeContext = createContext<any>(null);

export const ThemeProviderWrapper = ({ children }: any) => {
    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme((prev) => (prev === lightTheme ? darkTheme : lightTheme));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
