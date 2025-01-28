import { useQuery } from '@tanstack/react-query';
import api from './api';

// Hook para buscar episódios
export const useFetchEpisodes = (filter: string) => {
    return useQuery({
        queryKey: ['episodes', filter],
        queryFn: async () => {
            const response = await api.get(`/episode?name=${filter}`);
            return response.data;
        },
    });
};

// Hook para buscar personagens
export const useFetchCharacters = (filter: string) => {
    return useQuery({
        queryKey: ['characters', filter],
        queryFn: async () => {
            const response = await api.get(`/character?name=${filter}`);
            return response.data;
        },
    });
};