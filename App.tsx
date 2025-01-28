import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './src/navigation';
import { ThemeProviderWrapper } from './src/context/ThemeContext';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProviderWrapper>
      <Navigation />
    </ThemeProviderWrapper>
  </QueryClientProvider>
);

export default App;
