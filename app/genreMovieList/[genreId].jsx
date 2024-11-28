import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar, Text } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Themes } from '../../constants/Themes';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '../../components/Header'; 
import { getMoviesByGenre } from '../../helpers/tmdbApi';
import { useColorScheme } from 'react-native';

const MovieGenreList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(3); // Ajusta el valor inicial según sea necesario
  const router = useRouter();
  const { genreId, genreName } = useLocalSearchParams(); // Usar los parámetros pasados
  const themeColors = Colors[useColorScheme()] || Colors.light;
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!genreId) {
      setError('Invalid genre selected.');
      return;
    }
  
    const fetchMovies = async () => {
      try {
        const genreMovies = await getMoviesByGenre(genreId);
        setMovies(genreMovies);
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
        setError('Failed to fetch movies. Please try again.');
      }
    };
  
    fetchMovies();
  }, [genreId]);
  
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
      const genreMovies = await getMoviesByGenre(genreId, page);
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
        title={genreName || "Genre"} 
        leftIconName="arrow-back" 
        leftIconRoute="/searchMovieGenre" 
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={renderMovieItem}
        contentContainerStyle={styles.grid}
      />

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

export default MovieGenreList;
