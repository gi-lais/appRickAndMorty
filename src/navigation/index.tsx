import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CharactersScreen from '../screens/Characters';
import EpisodesScreen from '../screens/Episodes';
import FavoritesScreen from '../screens/Favorites';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

const Navigation = () => {

    const { theme } = useThemeContext();

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: theme.backgroundPrimary,
                        borderTopWidth: 0,
                        elevation: 5,
                    },
                    tabBarActiveTintColor: theme.buttonText,
                    tabBarInactiveTintColor: theme.textSecondary,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Personagens') {
                            iconName = 'person';
                        } else if (route.name === 'Episódios') {
                            iconName = 'play-circle';
                        } else if (route.name === 'Favoritos') {
                            iconName = 'heart';
                        }

                        if (iconName === 'person' || iconName === 'play-circle' || iconName === 'heart') {
                            return <Ionicons name={iconName} size={size} color={color} />;
                        }
                    },
                })}
            >
                <Tab.Screen name="Personagens" component={CharactersScreen} />
                <Tab.Screen name="Episodios" component={EpisodesScreen} />
                <Tab.Screen name="Favoritos" component={FavoritesScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )

};

export default Navigation;
