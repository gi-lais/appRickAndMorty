import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CharactersScreen from '../screens/Characters';

jest.mock('../services/queries', () => ({
    useFetchCharacters: jest.fn(() => ({
        data: { results: [{ id: 1, name: 'Rick Sanchez', status: 'Alive', image: 'mock-url' }] },
        isLoading: false,
        error: null,
    })),
}));

describe('CharactersScreen', () => {
    it('deve renderizar a lista de personagens', () => {
        const { getByText } = render(<CharactersScreen />);
        expect(getByText('Rick Sanchez')).toBeTruthy();
    });

    it('deve permitir favoritar um personagem', async () => {
        const { getByTestId } = render(<CharactersScreen />);
        const favoriteButton = getByTestId('favorite-1');
        fireEvent.press(favoriteButton);

        // Verifica se o botão de favorito foi alterado
        expect(favoriteButton.props.accessibilityLabel).toContain('Favoritado');
    });
});
