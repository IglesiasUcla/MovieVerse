import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar, Text } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Themes } from '../../constants/Themes';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '../../components/Header'; 
import { useColorScheme } from 'react-native';
import { getMoviesByYear } from '../../helpers/tmdbApi';

const MoviesByYear = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(3); // Se actualizará según la respuesta de la API
  const router = useRouter();
  const { year } = useLocalSearchParams(); // Obtener el año desde los parámetros
  const themeColors = Colors[useColorScheme()] || Colors.light;
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!year) {
      setError('Invalid year selected.');
      return;
    }
  
    const fetchMoviesYear = async () => {
      try {
        const genreMoviesYear = await getMoviesByYear(year);
        setMovies(genreMoviesYear);
      } catch (error) {
        console.error('Error fetching movies by year:', error);
        setError('Failed to fetch movies. Please try again.');
      }
    };
  
    fetchMoviesYear();
  }, [year]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>
          {error}
        </Text>
      </View>
    );
  }

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => router.push(`/movie/${item.id}`)} // Navega a los detalles de la película
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
      />
    </TouchableOpacity>
  );

  const fetchMoviesByPage = async (page) => {
    try {
      const genreMovies = await getMoviesByYear(year, page);
      setMovies(genreMovies);
    } catch (error) {
      console.error('Error fetching movies for page:', error);
    }
  };

  useEffect(() => {
    fetchMoviesByPage(currentPage);
  }, [currentPage]);  

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
      <Header 
        title={`Movies from ${year}`} 
        leftIconName="arrow-back" 
        leftIconRoute="/yearListScreen" 
      />

      {/* Lista de películas */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={renderMovieItem}
        contentContainerStyle={styles.grid}
      />

      {/* Paginación */}
      <View style={styles.pagination}>
  <TouchableOpacity
    onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1} // Desactiva el botón si estás en la primera página
  >
    <Text style={styles.paginationText}>Previous</Text>
  </TouchableOpacity>

  <Text style={styles.paginationText}>
    Page {currentPage} of {totalPages}
  </Text>

  <TouchableOpacity
    onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages} // Desactiva el botón si estás en la última página
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
    margin: 5,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  movieImage: {
    width: '100%',
    height: '100%',
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

export default MoviesByYear;
