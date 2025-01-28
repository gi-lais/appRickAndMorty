import React from 'react';
import { render } from '@testing-library/react-native';
import FavoritesScreen from '../screens/Favorites';

jest.mock('../storage/favorite', () => ({
    getFavorites: jest.fn(() => Promise.resolve([
        { id: 1, name: 'Rick Sanchez', type: 'character', image: 'mock-url', status: 'Alive' },
        { id: 2, name: 'Pilot', type: 'episode', air_date: '2013-12-02' },
    ])),
}));

describe('FavoritesScreen', () => {
    it('deve carregar e exibir favoritos', async () => {
        const { findByText } = render(<FavoritesScreen />);

        expect(await findByText('Rick Sanchez')).toBeTruthy();
        expect(await findByText('Pilot')).toBeTruthy();
    });
});
