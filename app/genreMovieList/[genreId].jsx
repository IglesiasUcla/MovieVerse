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
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const { genreId, genreName } = useLocalSearchParams(); // Usar los parámetros pasados
  const themeColors = Colors[useColorScheme()] || Colors.light;
  const [error, setError] = useState(null);

  const loadMovies = async () => {
    if (loading || !hasMore) return; // Evitar llamadas múltiples o cuando no hay más datos

    setLoading(true);
    try {
      const genreMovies = await getMoviesByGenre(genreId, currentPage);

      setMovies((prevMovies) => {
        const uniqueMovies = new Map();
        [...prevMovies, ...genreMovies].forEach((movie) =>
          uniqueMovies.set(movie.id, movie)
        );
        return Array.from(uniqueMovies.values());
      });

      setHasMore(genreMovies.length > 0); // Detener la carga si no hay más datos
      setCurrentPage((prevPage) => prevPage + 1); // Incrementar la página
    } catch (error) {
      console.error('Error fetching movies by year:', error);
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (!genreId) {
      setError('Invalid genre selected.');
      return;
    }
  
    loadMovies();
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

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
      <Header 
        title={genreName || "Genre"} 
        leftIconName="arrow-back" 
        leftIconRoute="/searchMovieGenre" 
      />
      {/* Lista de películas */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={renderMovieItem}
        contentContainerStyle={styles.grid}
        onEndReached={loadMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && (
            <Text style={{ color: 'white', textAlign: 'center', marginVertical: 20 }}>
              Loading...
            </Text>
          )
        }
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
