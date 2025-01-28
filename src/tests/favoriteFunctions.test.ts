import { saveFavoriteCharacter, getFavorites, saveFavoriteEpisode } from '../storage/favorite';

describe('Função saveFavoriteCharacter', () => {
    it('deve adicionar um personagem aos favoritos', async () => {
        const character = { id: 1, name: 'Rick Sanchez', type: 'character' };
        await saveFavoriteCharacter(character);

        const favorites = await getFavorites();
        expect(favorites).toContainEqual(character);
    });

    it('não deve duplicar personagens nos favoritos', async () => {
        const character = { id: 1, name: 'Rick Sanchez', type: 'character' };
        await saveFavoriteCharacter(character);
        await saveFavoriteCharacter(character);

        const favorites = await getFavorites();
        expect(favorites.length).toBe(1);
    });
});

describe('Função saveFavoriteEpisode', () => {
    it('deve adicionar um episódio aos favoritos', async () => {
        const episode = { id: 1, name: 'Pilot', type: 'episode' };
        await saveFavoriteEpisode(episode);

        const favorites = await getFavorites();
        expect(favorites).toContainEqual(episode);
    });
});

