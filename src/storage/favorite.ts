import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para obter os favoritos armazenados
export const getFavorites = async () => {
    try {
        const favorites = await AsyncStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
        return [];
    }
};

// Função para salvar ou remover um personagem favorito
export const saveFavoriteCharacter = async (favorite: any) => {
    try {

        const minimalFavorite = {
            name: favorite.name,
            status: favorite.status,
            image: favorite.image,
            type: 'character',
        };

        const favorites = await getFavorites();
        const exists = favorites.some(
            (fav: any) => fav.name === minimalFavorite.name && fav.type === 'character'
        );


        const updatedFavorites = exists
            ? favorites.filter(
                (fav: any) => !(fav.name === minimalFavorite.name && fav.type === 'character')
            )
            : [...favorites, minimalFavorite];

        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return updatedFavorites;
    } catch (error) {
        console.error('Erro ao salvar/remover personagem favorito:', error);
        return [];
    }
};

// Função para salvar ou remover um episódio favorito
export const saveFavoriteEpisode = async (favorite: any) => {
    try {

        const minimalFavorite = {
            id: favorite.id,
            name: favorite.name,
            air_date: favorite.air_date,
            type: 'episode',
        };

        const favorites = await getFavorites();
        const exists = favorites.some(
            (fav: any) => fav.id === minimalFavorite.id && fav.type === 'episode'
        );


        const updatedFavorites = exists
            ? favorites.filter(
                (fav: any) => !(fav.id === minimalFavorite.id && fav.type === 'episode')
            )
            : [...favorites, minimalFavorite];

        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return updatedFavorites;
    } catch (error) {
        console.error('Erro ao salvar/remover episódio favorito:', error);
        return [];
    }
};

// Função para limpar o AsyncStorage
export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
        console.log('Histórico do AsyncStorage limpo!');
    } catch (error) {
        console.error('Erro ao limpar o AsyncStorage:', error);
    }
};
