import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import Header from '../components/Header';
import { Themes } from '../constants/Themes';
import { useRouter } from 'expo-router';
import { getTopMovies } from '../helpers/movieverseApi';
import { getMovieDetails } from '../helpers/tmdbApi';

const TopMovies = () => {
  const [topMovies, setTopMovies] = useState([null, null, null]); // Placeholder inicial
  const router = useRouter();

  const fetchMovieDetails = async (movieId) => {
    try {
      if (movieId === "placeholder1" || movieId === "placeholder2" || movieId === "placeholder3") {
        return null; // Or return a default image URL or placeholder value
      }
  
      const movieDetails = await getMovieDetails(movieId);
      return movieDetails.poster_path;
    } catch (error) {
      console.error(`Error fetching details for movie ID ${movieId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await getTopMovies();
        const updatedMovies = await Promise.all(
          response.topMovies.map(async (movie) => {
            const posterPath = await fetchMovieDetails(movie.movie_id);
            return { ...movie, poster_path: posterPath };
          })
        );

        const sortedMovies = [null, null, null];
        updatedMovies.forEach((movie) => {
          sortedMovies[movie.rank - 1] = movie;
        });
        setTopMovies(sortedMovies);
      } catch (error) {
        console.error('Error fetching top movies:', error);
      }
    };

    fetchTopMovies();
  }, []);

  const handleSelectMovie = (rank) => {
    router.push(`/searchTopMovies?rank=${rank}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
      <Header title="Top Movies" leftIconName="arrow-back" leftIconRoute="profile_user" />
      <View style={styles.movieContainers}>
        {topMovies.map((movie, index) => (
          <TouchableOpacity
            key={index}
            style={styles.movieContainer}
            onPress={() => handleSelectMovie(index + 1)}
          >
            {movie ? (
              movie.poster_path ? (
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                  style={styles.poster}
                />
              ) : (
                <Text style={styles.placeholderText}>Pick your top movie</Text>
              )
            ) : (
              <Text style={styles.placeholderText}>Select a movie for Rank {index + 1}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  movieContainers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  movieContainer: {
    width: '30%',
    height: 150,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  placeholderText: {
    color: '#AAA',
    textAlign: 'center',
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

export default TopMovies;
