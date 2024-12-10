import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import { Themes } from '../constants/Themes';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { searchMovies } from '../helpers/tmdbApi'; // Agrega el helper para la búsqueda
import { updateTopMovie } from '../helpers/movieverseApi';

const SearchTopMovies = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const { rank } = useLocalSearchParams(); // Lee los parámetros correctamente
  const handleSelectMovie = async (movie) => {
    try {
      await updateTopMovie(rank, movie.id);
      router.push('/topMovies');
    } catch (error) {
      console.error('Error updating top movie:', error);
    }
  };
  


  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (search.trim()) {
        fetchMovies(search);
      } else {
        setMovies([]);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(debounceTimeout);
  }, [search]);

  const fetchMovies = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
      {/* Header */}
      <Header title="Add a Top Movie" leftIconName="arrow-back" leftIconRoute="topMovies" />

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#AAA" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Add a top Movie"
          placeholderTextColor="#AAA"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Movie List or Loading/Error */}
      <ScrollView contentContainerStyle={styles.movieList}>
        {loading ? (
          <ActivityIndicator size="large" color={Themes.colors.purpleStrong} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : movies.length === 0 && search.trim() ? (
          <Text style={styles.noResultsText}>No movies found for "{search}".</Text>
        ) : (
          movies.map((movie) => (
            <TouchableOpacity
            key={movie.id}
            style={styles.movieItem}
            onPress={() => handleSelectMovie(movie)}
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              style={styles.poster}
            />
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <Text style={styles.movieYear}>{new Date(movie.release_date).getFullYear()}</Text>
            </View>
          </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 25,
    margin: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 8,
  },
  movieList: {
    paddingHorizontal: 16,
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  poster: {
    width: 50,
    height: 75,
    borderRadius: 8,
    marginRight: 16,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieYear: {
    color: '#AAAAAA',
    fontSize: 16,
  },
  errorText: {
    color: '#FF4444',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  noResultsText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default SearchTopMovies;
