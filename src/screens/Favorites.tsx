import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import { getFavorites } from '../storage/favorite';
import { CharacterName, CharactersCard, CharacterStatus, Container } from './Characters';
import { AirDate, EpisodeCard, EpisodeName } from './Episodes';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { useThemeContext } from '../context/ThemeContext';

const FavoritesScreen = () => {
    const [favorites, setFavorites] = useState<any[]>([]);
    const { theme } = useThemeContext();

    const loadFavorites = async () => {
        const storedFavorites = await getFavorites();
        setFavorites(storedFavorites);
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    return (
        <Container>

            <Box>
                <Title style={{ color: theme.textPrimary }}>Favoritos</Title>
            </Box>
            <ThemeSwitcher />
            <FlatList
                data={favorites}
                keyExtractor={(item, index) => `${item.type}-${index}`}
                renderItem={({ item }) => (
                    <View >
                        {item.type === 'character' && (
                            <CharactersCard>
                                <Image source={{ uri: item.image }} style={{ width: 100, height: 80 }} />
                                <View style={{ marginLeft: 8 }}>
                                    <CharacterName>{item.name}</CharacterName>
                                    <CharacterStatus>Status: {item.status}</CharacterStatus>
                                </View>

                            </CharactersCard>
                        )}
                        {item.type === 'episode' && (
                            <EpisodeCard>
                                <Ionicons name='play-circle' size={24} color='#bbb' />
                                <EpisodeName>{item.name}</EpisodeName>
                                <AirDate>Lançado em: {item.air_date}</AirDate>

                            </EpisodeCard>
                        )}
                    </View>
                )}
            />
        </Container>

    );
};

export default FavoritesScreen;

const Box = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 50px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;