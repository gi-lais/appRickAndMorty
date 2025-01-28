import React from "react";
import styled from 'styled-components/native';
import { useThemeContext } from "../context/ThemeContext";


interface TitleAndSearchProps {
  title: string
  filter: string;
  setFilter: (text: string) => void;
}

const TitleAndSearch: React.FC<TitleAndSearchProps> = ({ title, filter, setFilter }) => {

  const { theme } = useThemeContext();

  return (

    <Box>
      <Title style={{ color: theme.textPrimary }}>{title}</Title>
      <SearchInput
        placeholder="Buscar..."
        value={filter}
        onChangeText={(text: string) => setFilter(text)}
        style={{ backgroundColor: theme.buttonBackground, color: theme.buttonText, padding: 10 }}
      />
    </Box>
  );
};

export default TitleAndSearch;

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

const SearchInput = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 10px;
  width: 100%;
  height: 40px;
  margin-top: 16px;
`;
