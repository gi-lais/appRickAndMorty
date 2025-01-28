import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Switch } from 'react-native';
import { useFetchEpisodes } from '../services/queries';
import { saveFavoriteEpisode, getFavorites } from '../storage/favorite';
import TitleAndSearch from '../components/TitleAndSearch';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import { LoadingBox } from './Characters';
import { useThemeContext } from '../context/ThemeContext';
import ThemeSwitcher from '../components/ThemeSwitcher';

const EpisodesScreen: React.FC = () => {
    const [filter, setFilter] = useState('');
    const { data, isLoading, error } = useFetchEpisodes(filter);
    const [favorites, setFavorites] = useState<any[]>([]);
    const { theme } = useThemeContext();

    const isDarkMode = theme.background === '#121212';

    const handleFavorite = async (episode: any) => {
        const updatedFavorites = await saveFavoriteEpisode(episode);
        setFavorites(updatedFavorites);
    };

    const loadFavorites = async () => {
        const storedFavorites = await getFavorites();
        setFavorites(storedFavorites);
    };

    React.useEffect(() => {
        loadFavorites();
    }, []);

    if (isLoading) return (<LoadingBox>
        <Text>Carregando...</Text>
    </LoadingBox>);
    if (error) return <LoadingBox>
        <Text>Erro ao carregar dados!</Text> </LoadingBox>;
    return (
        <Container>
            <TitleAndSearch title="Episódios" filter={filter} setFilter={setFilter} />
            <ThemeSwitcher />

            <FlatList
                data={data?.results || []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const isFavorite = favorites.some(
                        (fav) => fav.id === item.id && fav.type === 'episode'
                    );
                    return (
                        <EpisodeCard>
                            <Ionicons name='play-circle' size={24} color='#BBB' />
                            <EpisodeName>{item.name}</EpisodeName>
                            <EpisodeCode>{item.episode}</EpisodeCode>
                            <AirDate>Lançado em: {item.air_date}</AirDate>
                            <FavoriteBtn onPress={() => handleFavorite(item)} testID={`favorite-${item.id}`}>
                                <MaterialIcons name={'favorite'} size={24} color={isFavorite ? 'red' : (isDarkMode ? '#FFF' : '#BBB')} />
                            </FavoriteBtn>
                        </EpisodeCard>
                    );
                }}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </Container>
    );
};

export default EpisodesScreen;

export const Container = styled.View`
    flex: 1;
    background-color: ${(props: any) => props.theme.backgroundPrimary};
    padding: 16px;
`;

export const EpisodeCard = styled.View`
    background-color: ${(props: any) => props.theme.backgroundSecondary};
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
`;

export const EpisodeName = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${(props: any) => props.theme.textPrimary};
    margin-bottom: 4px;
`;

export const EpisodeCode = styled.Text`
    font-size: 16px;
    color: ${(props: any) => props.theme.textSecondary};
`;

export const AirDate = styled.Text`
    font-size: 14px;
    color: ${(props: any) => props.theme.textSecondary};
`;

export const FavoriteBtn = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
`;