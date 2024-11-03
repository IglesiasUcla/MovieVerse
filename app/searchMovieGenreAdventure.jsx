import React from 'react';
import { View, StyleSheet, FlatList, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors'; // Asegúrate de tener esta constante
import { Themes } from '../constants/Themes';
import { useRouter } from 'expo-router';
import Header from '../components/Header'; // Importar el componente Header

const movies = Array.from({ length: 18 }, (_, index) => ({ id: index.toString() }));

const SearchMovieGenreAdventure = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme] || Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Header */}
      <Header 
        title="Adventure" 
        leftIconName="arrow-back" 
        leftIconRoute="/searchMovieGenre" // Ruta a la que navegar
      />

      {/* Movie Grid */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={() => (
          <View style={styles.movieContainer} />
        )}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    padding: 10,
  },
  movieContainer: {
    flex: 1,
    margin: 5,
    height: 165, // Altura de cada recuadro en la cuadrícula
    backgroundColor: Themes.colors.grayDark, // Color de fondo de los recuadros
    borderRadius: 8,
  },
});

export default SearchMovieGenreAdventure;
