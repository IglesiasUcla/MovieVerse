import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, useColorScheme, StatusBar,TouchableOpacity, Image, Text } from 'react-native';
import { Colors } from '../constants/Colors'; // Asegúrate de tener esta constante
import { Themes } from '../constants/Themes';
import { useRouter } from 'expo-router';
import Header from '../components/Header'; // Importar el componente Header
import { getTopRatedMovies } from '../helpers/tmdbApi';

const SearchMovies_highestRated = () => {
  const [movies, setMovies] = useState([]); // Estado para almacenar las películas
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const route = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme] || Colors.light;

  const loadMovies = async () => {
    if (loading || !hasMore) return; // Evitar llamadas múltiples o cuando no hay más datos

    setLoading(true);
    try {
      const topRatedMovies = await getTopRatedMovies(currentPage);

      setMovies((prevMovies) => {
        const uniqueMovies = new Map();
        [...prevMovies, ...topRatedMovies].forEach((movie) =>
          uniqueMovies.set(movie.id, movie)
        );
        return Array.from(uniqueMovies.values());
      });

      setHasMore(topRatedMovies.length > 0); // Detener la carga si no hay más datos
      setCurrentPage((prevPage) => prevPage + 1); // Incrementar la página
    } catch (error) {
      console.error('Error fetching movies by year:', error);
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    loadMovies();
  }, []);


  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => route.push(`/movie/${item.id}`)} // Navega a la pantalla de detalles de la película
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

      {/* Header */}
      <Header 
        title="Highest Rated" 
        leftIconName="arrow-back" 
        leftIconRoute="/search_movies" 
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