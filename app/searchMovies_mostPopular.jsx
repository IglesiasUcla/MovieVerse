import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, useColorScheme, StatusBar,TouchableOpacity, Image, Text } from 'react-native';
import { Colors } from '../constants/Colors'; // Asegúrate de tener esta constante
import { Themes } from '../constants/Themes';
import { useRouter } from 'expo-router';
import Header from '../components/Header'; // Importar el componente Header
import { getMostPopularMovies } from '../helpers/tmdbApi';

const SearchMovies_highestRated = () => {
  const [movies, setMovies] = useState([]); // Estado para almacenar las películas
  const [currentPage, setCurrentPage] = useState(1);
  const route = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme] || Colors.light;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const mostPopularMovies = await getMostPopularMovies();
        setMovies(mostPopularMovies);
      } catch (error) {
        console.error('Error fetching most-popular movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const fetchMoviesByPage = async (page) => {
    try {
      const mostPopularMovies = await getMostPopularMovies(page);
      setMovies(mostPopularMovies);
    } catch (error) {
      console.error('Error fetching movies for page:', error);
    }
  };
  
  useEffect(() => {
    fetchMoviesByPage(currentPage); // Cargar las películas al inicio o cuando cambie la página
  }, [currentPage]);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => route.push(`${item.id}`)} // Navega a la pantalla de detalles de la película
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/original${item.poster_path}` }}
        style={styles.movieImage}
      />

    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />

      {/* Header */}
      <Header 
        title="Most Popular" 
        leftIconName="arrow-back" 
        leftIconRoute="/search_movies" 
      />

      {/* Movie Grid */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={renderMovieItem}
        contentContainerStyle={styles.grid}
      />

      <View style={styles.pagination}>
  <TouchableOpacity
    onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} // Evita ir a páginas menores a 1
    disabled={currentPage === 1} // Desactiva el botón si estás en la primera página
  >
    <Text style={styles.paginationText}>Previous</Text>
  </TouchableOpacity>

  <Text style={styles.paginationText}>Page {currentPage} of 3</Text>

  <TouchableOpacity
    onPress={() => setCurrentPage((prev) => Math.min(prev + 1, 3))} // Evita ir a páginas mayores a 3
    disabled={currentPage === 3} // Desactiva el botón si estás en la última página
  >
    <Text style={styles.paginationText}>Next</Text>
  </TouchableOpacity>
</View>

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
    margin: 4, // Reduce los márgenes entre los pósters
    height: 180, // Mantén la altura del póster
  },
  movieImage: {
    width: '100%',
    height: '100%', // Ocupa todo el contenedor
    borderRadius: 8, // Opcional: puedes reducirlo o eliminarlo para un diseño sin bordes redondeados
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: Themes.colors.grayDark,
  },
  paginationText: {
    fontSize: 16,
    color: 'white',
  },
});

export default SearchMovies_highestRated;