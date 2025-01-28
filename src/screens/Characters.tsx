
import React, { useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, Switch } from 'react-native';
import { useFetchCharacters } from '../services/queries';
import { saveFavoriteCharacter, getFavorites } from '../storage/favorite';
import TitleAndSearch from '../components/TitleAndSearch';
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeContext } from '../context/ThemeContext';
import ThemeSwitcher from '../components/ThemeSwitcher';

const CharactersScreen = () => {
  const [filter, setFilter] = useState('');
  const { data, isLoading, error } = useFetchCharacters(filter);
  const [favorites, setFavorites] = useState<any[]>([]);
  const { theme, toggleTheme } = useThemeContext();

  const isDarkMode = theme.background === '#121212';
  const handleFavorite = async (character: any) => {
    const updatedFavorites = await saveFavoriteCharacter(character);
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

      <TitleAndSearch title="Personagens" filter={filter} setFilter={setFilter} />
      <ThemeSwitcher />

      <FlatList
        data={data?.results || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isFavorite = favorites.some(
            (fav) => fav.name === item.name && fav.type === 'character'
          );
          return (

            <CharactersCard>
              <Image source={{ uri: item.image }} style={{ width: 100, height: 80 }} />
              <View style={{ marginLeft: 8 }}>
                <CharacterName>{item.name}</CharacterName>
                <CharacterStatus>Status: {item.status}</CharacterStatus>
              </View>
              <FavoriteBtn onPress={() => handleFavorite(item)} testID={`favorite-${item.id}`}>
                <MaterialIcons name={'favorite'} size={24} color={isFavorite ? 'red' : (isDarkMode ? '#FFF' : '#BBB')} />
              </FavoriteBtn>
            </CharactersCard>

          );
        }}
      />
    </Container>
  );
};

export default CharactersScreen;

export const Container = styled.View`
    flex: 1;
    background-color: ${(props: any) => props.theme.backgroundPrimary};
    padding: 16px;
`;

export const FavoriteBtn = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const CharactersCard = styled.View`
    background-color: ${(props: any) => props.theme.backgroundSecondary};
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    flex-direction: row;
    align-items: center;
`;

export const CharacterName = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${(props: any) => props.theme.textPrimary};
    margin-bottom: 4px;
    margin-top: 8px;
`;

export const CharacterStatus = styled.Text`
    font-size: 16px;
    color: ${(props: any) => props.theme.textSecondary};
`;

export const LoadingBox = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;