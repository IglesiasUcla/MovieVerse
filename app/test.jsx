import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Animated, Pressable, StatusBar, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Themes } from '../constants/Themes';
import { useRouter, useLocalSearchParams } from 'expo-router';
import RatingFavorite from '../components/RatingFavorite';
import { Ionicons } from '@expo/vector-icons';
import { getMovieDetails } from '../helpers/tmdbApi';

const MovieScreen = () => {
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const scrollY = new Animated.Value(0);
  const router = useRouter();
  const { movieId } = useLocalSearchParams(); // Uso de useLocalSearchParams para obtener movieId
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching detalles de la película
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        console.log(`Requesting movie details for ID: ${movieId}`); // Log para confirmar el ID solicitado
        const data = await getMovieDetails(movieId);
        console.log("Movie details response:", data); // Log para revisar el objeto de la API
        setMovie(data); // Almacena los datos de la película
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to fetch movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);
  
  // Verificación de errores o datos vacíos
  if (loading) {
    return <ActivityIndicator size="large" color="#6200EE" style={styles.loader} />;
  }
  
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonError}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
  
  // Condición adicional para asegurar que `movie` tiene datos válidos
  if (!movie || Object.keys(movie).length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Movie details not available.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonError}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
  
  {/*

  // Animación para mostrar más/menos sinopsis 
  const synopsisHeight = useState(new Animated.Value(60))[0]; 
  const toggleSynopsis = () => {
    Animated.timing(synopsisHeight, {
      toValue: showFullSynopsis ? 60 : 120,
      duration: 350,
      useNativeDriver: false,
    }).start();
    setShowFullSynopsis(!showFullSynopsis);
  };*/}

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Themes.colors.grayDark} />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>

      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
      >
        <Animated.View style={styles.headerImageContainer}>
          <Animated.Image
            source={{ uri: movie.poster_path }}
            style={[
              styles.headerImage,
              {
                opacity: scrollY.interpolate({
                  inputRange: [0, 200],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          />
        </Animated.View>

        <View style={styles.movieInfoContainer}>
          <View style={styles.movieDetailsRow}>
            <View style={styles.movieTextContainer}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <Text style={styles.movieDetails}>
                {movie.release_date} • {movie.runtime} min
              </Text>
            </View>
            <Image
              source={{ uri: movie.poster_path }}
              style={styles.movieThumbnail}
            />
          </View>
{/*
          <View style={styles.synopsisContainer}>
            <Animated.View style={{ height: synopsisHeight }}>
              <Text style={styles.synopsisText}>{movie.overview}</Text>
            </Animated.View>
            <TouchableOpacity onPress={toggleSynopsis}>
              <Text style={styles.moreDots}>{showFullSynopsis ? 'Show Less' : 'Show More'}</Text>
            </TouchableOpacity>
          </View>*/}

          <View style={styles.divider} />
          {/* Sección de rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Overall Rating</Text>
            <RatingFavorite rating={movie.vote_average / 2} starSize={32} />
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.grayDark,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    padding: 5,
    zIndex: 1000,
  },
  headerImageContainer: {
    height: 170,
    position: 'relative',
    backgroundColor: Themes.colors.grayLight,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  movieInfoContainer: {
    padding: 16,
  },
  movieTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  movieDetails: {
    color: 'white',
    fontSize: 14,
  },
  synopsisContainer: {
    marginTop: 16,
  },
  synopsisText: {
    color: 'white',
    fontSize: 14,
  },
  moreDots: {
    color: Themes.colors.purpleDetail,
    fontSize: 16,
    marginTop: 8,
  },
  ratingContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  ratingLabel: {
    color: 'white',
    fontSize: 18,
  },
  divider: {
    height: 1,
    backgroundColor: Themes.colors.purpleDetail,
    marginVertical: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Themes.colors.grayDark,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  backButtonError: {
    marginTop: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    padding: 5,
  },
});

export default MovieScreen;
