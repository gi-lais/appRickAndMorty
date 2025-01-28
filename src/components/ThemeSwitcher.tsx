import React from 'react';
import { View, Switch } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useThemeContext();
    const isDarkMode = theme.backgroundPrimary === '#121212';

    return (
        <View
            style={{
                alignItems: 'flex-end',
                marginBottom: 20,
            }}
        >
            <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                thumbColor={isDarkMode ? '#FFF' : '#000'}
                trackColor={{ false: '#CCC', true: '#444' }}
            />
        </View>
    );
};

export default ThemeSwitcher;
