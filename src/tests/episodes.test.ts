import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EpisodesScreen from '../screens/Episodes';

jest.mock('../services/queries', () => ({
    useFetchEpisodes: jest.fn(() => ({
        data: { results: [{ id: 1, name: 'Pilot', episode: 'S01E01', air_date: '2013-12-02' }] },
        isLoading: false,
        error: null,
    })),
}));

describe('EpisodesScreen', () => {
    it('deve renderizar a lista de episódios', () => {
        const { getByText } = render(<EpisodesScreen />);
        expect(getByText('Pilot')).toBeTruthy();
    });

    it('deve permitir favoritar um episódio', () => {
        const { getByTestId } = render(<EpisodesScreen />);
        const favoriteButton = getByTestId('favorite-1');
        fireEvent.press(favoriteButton);

        expect(favoriteButton.props.accessibilityLabel).toContain('Favoritado');
    });
});
