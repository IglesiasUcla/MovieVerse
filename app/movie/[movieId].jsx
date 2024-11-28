import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Pressable, StatusBar, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Themes } from '../../constants/Themes';
import { useRouter, useLocalSearchParams } from 'expo-router';
import RatingFavorite from '../../components/RatingFavorite';
import { Ionicons } from '@expo/vector-icons';
import { getMovieDetails, getMovieDirector } from '../../helpers/tmdbApi';

const MovieScreen = () => {
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const [synopsisHeight, setSynopsisHeight] = useState(52);
  const scrollY = new Animated.Value(0);
  const route = useRouter()
  const { movieId } = useLocalSearchParams(); // Uso de useLocalSearchParams para obtener movieId
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [director, setDirector] = useState('');

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

  useEffect(() => {
    const fetchDirector = async () => {
      try {
        const directorName = await getMovieDirector(movieId); // Usa la nueva función
        setDirector(directorName);
      } catch (error) {
        console.error('Error fetching director:', error);
      }
    };
  
    fetchDirector();
  }, [movieId]);
  
  
  // Verificación de errores o datos vacíos
  if (loading) {
    return <ActivityIndicator size="large" color="#6200EE" style={styles.loader} />;
  }
  
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => route.back()} style={styles.backButtonError}>
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
        <TouchableOpacity onPress={() => route.back()} style={styles.backButtonError}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  const toggleSynopsis = () => {
    setShowFullSynopsis(!showFullSynopsis);
    setSynopsisHeight(!showFullSynopsis ? measuredHeight : 52); // Expandir o contraer
  };

  const posterUri = movie.poster_path
  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  : 'https://via.placeholder.com/500x750.png?text=No+Image';

  const backdropUri = movie.backdrop_path
  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
  : 'https://via.placeholder.com/500x750.png?text=No+Image';

  let rating = movie.vote_average / 2;
  rating = rating.toFixed(1);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Themes.colors.grayLight} />
      <TouchableOpacity style={styles.backButton} onPress={() => route.back()}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>

      <Animated.ScrollView
          onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}>
        {/* Imagen de la película como header */}
        <Animated.View style={styles.headerImageContainer}>
          <Animated.Image
            source={{ uri: backdropUri }}
            style={[
              styles.headerImage,
              {
                opacity: scrollY.interpolate({
                  inputRange: [0, 200],
                  outputRange: [1, 0],
                  extrapolate: 'clamp'
                })
              }
            ]}
          />
        </Animated.View>

        {/* Información de la película */}
        <View style={styles.movieInfoContainer}>
        <View style={styles.movieDetailsRow}>
            <View style={styles.movieTextContainer}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <Text style={styles.movieDirector}>
                Directed by 
              </Text>
              <Text style={styles.bold}>{director}</Text>
              <Text style={styles.movieDetails}>{movie.release_date} • {movie.runtime} min</Text>
            </View>
            <Image
              source={{ uri: posterUri }}
              style={styles.movieThumbnail}
            />
          </View>

        {/* Sinopsis */}
        <View>
        {/* Vista fantasma para medir la altura completa */}
          <Text
            style={[styles.synopsisText, { position: 'absolute', opacity: 0, zIndex: -1 }]} // Oculta este texto
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              if (height > 52) {
                setIsExpandable(true); // Activa el botón si es necesario
                setMeasuredHeight(height); // Guarda la altura completa
              }
            }}
          >
            {movie.overview || "No synopsis available."}
          </Text>

        {/* Texto visible con restricciones */}
          <Animated.View style={{ height: showFullSynopsis ? measuredHeight : synopsisHeight }}>
            <Text style={styles.synopsisText} numberOfLines={showFullSynopsis ? undefined : 3}>
              {movie.overview || "No synopsis available."}
            </Text>
          </Animated.View>

        {/* Botón de expansión */}
          {isExpandable && (
            <TouchableOpacity onPress={toggleSynopsis} style={styles.ex}>
              <Text style={styles.moreText}>
                {showFullSynopsis ? "Show Less" : "Show More"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

          <View style={styles.divider} />

          {/* Rating */}
          <View style={styles.overallContainer}>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Overall Rating</Text>
            <Text style={styles.ratingScore}>{rating}</Text>

            <View >
            <RatingFavorite style={styles.starsContainer}
                rating={rating}
                showFavorite={false}
                starSize={32}    // Ajusta el tamaño si es necesario
            />
            </View>

          </View>

          <View style={styles.rateButtonContainer}>
            <TouchableOpacity style={styles.rateButton} onPress={() => route.push('movieReview')} >
              <Text style={styles.rateButtonText}>Rate this movie</Text>
            </TouchableOpacity>
          </View>

          </View>

          <View style={styles.divider} />

          {/* Posts de los usuarios */}
          <Text style={styles.postsTitle}>Posts</Text>
          <Pressable onPress={() => route.push('post')}>
          <View style={styles.postContainer}>
          <Pressable style={styles.test} onPress={() => route.push('other_user_information')} >
         
            <Ionicons name="person-circle-outline" size={48} color="#6200EE" style={styles.userPic} />
            
          </Pressable>
            <View style={styles.postContent}>
              <View style={styles.usernameContainer}>
                <Text style={styles.postUser}>User’s post</Text>
                <View style={styles.userRating}>
                  <RatingFavorite
                    rating={5}
                    isFavorite={true}
                    starSize={16}    // Ajusta el tamaño si es necesario
                    iconSize={12}    // Ajusta el tamaño si es necesario
                  />
                </View>
              </View>
              <Text style={styles.postText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor magna ipsum, et egestas magna dapibus ac.</Text>
            </View>
          </View>
          </Pressable>
          {/* Agrega más posts según sea necesario */}
          <Pressable onPress={() => route.push('post')}>
          <View style={styles.postContainer}>
          <Pressable style={styles.test} onPress={() => route.push('other_user_information')} >
         
            <Ionicons name="person-circle-outline" size={48} color="#6200EE" style={styles.userPic} />
            
          </Pressable>
            <View style={styles.postContent}>
              <View style={styles.usernameContainer}>
                <Text style={styles.postUser}>User’s post</Text>
                <View style={styles.userRating}>
                  <RatingFavorite
                    rating={4.5}
                    isFavorite={true}
                    starSize={16}    // Ajusta el tamaño si es necesario
                    iconSize={12}    // Ajusta el tamaño si es necesario
                  />
                </View>
              </View>
              <Text style={styles.postText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor magna ipsum, et egestas magna dapibus ac.</Text>
            </View>
          </View>
          </Pressable>
          <Pressable onPress={() => route.push('post')}>
          <View style={styles.postContainer}>
          <Pressable style={styles.test} onPress={() => route.push('other_user_information')} >
         
            <Ionicons name="person-circle-outline" size={48} color="#6200EE" style={styles.userPic} />
            
          </Pressable>
            <View style={styles.postContent}>
              <View style={styles.usernameContainer}>
                <Text style={styles.postUser}>User’s post</Text>
                <View style={styles.userRating}>
                  <RatingFavorite
                    rating={4.3}
                    isFavorite={false}
                    starSize={16}    // Ajusta el tamaño si es necesario
                    iconSize={12}    // Ajusta el tamaño si es necesario
                  />
                </View>
              </View>
              <Text style={styles.postText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor magna ipsum, et egestas magna dapibus ac.</Text>
            </View>
          </View>
          </Pressable>
          <Pressable onPress={() => route.push('post')}>
          <View style={styles.postContainer}>
          <Pressable style={styles.test} onPress={() => route.push('other_user_information')} >
         
            <Ionicons name="person-circle-outline" size={48} color="#6200EE" style={styles.userPic} />
            
          </Pressable>
            <View style={styles.postContent}>
              <View style={styles.usernameContainer}>
                <Text style={styles.postUser}>User’s post</Text>
                <View style={styles.userRating}>
                  <RatingFavorite
                    rating={4.4}
                    isFavorite={true}
                    starSize={16}    // Ajusta el tamaño si es necesario
                    iconSize={12}    // Ajusta el tamaño si es necesario
                  />
                </View>
              </View>
              <Text style={styles.postText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor magna ipsum, et egestas magna dapibus ac.</Text>
            </View>
          </View>
          </Pressable>
          <Pressable onPress={() => route.push('post')}>
          <View style={styles.postContainer}>
          <Pressable style={styles.test} onPress={() => route.push('other_user_information')} >
         
            <Ionicons name="person-circle-outline" size={48} color="#6200EE" style={styles.userPic} />
            
          </Pressable>
            <View style={styles.postContent}>
              <View style={styles.usernameContainer}>
                <Text style={styles.postUser}>User’s post</Text>
                <View style={styles.userRating}>
                  <RatingFavorite
                    rating={4.6}
                    isFavorite={true}
                    starSize={16}    // Ajusta el tamaño si es necesario
                    iconSize={12}    // Ajusta el tamaño si es necesario
                  />
                </View>
              </View>
              <Text style={styles.postText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor magna ipsum, et egestas magna dapibus ac.</Text>
            </View>
          </View>
          </Pressable>
        </View>
      </Animated.ScrollView>

      {/* Botón flotante */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => route.push('movieReview')}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.grayDark,
  },
  headerImageContainer: {
    height: 170,
    position: 'relative',
    backgroundColor: Themes.colors.grayLight,
  },
  test: {
    alignSelf: 'flex-start',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9, // Opacidad inicial para efecto de difuminado
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
  movieInfoContainer: {
    padding: 16,
  },
  movieTitle: {
    marginTop: -16,
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  movieDirector: {
    color: 'white',
    fontSize: 16,
    marginTop: 8,
  },
  bold: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    marginBottom: 8+4,
  },
  movieDetails: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
  },
  synopsisContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start', // Asegura alineación adecuada
    overflow: 'hidden', // Esconde texto fuera de la altura inicial
    width: '100%', // O el tamaño que necesites
  },  
  synopsisText: {
    marginTop: 8,
    color: 'white',
    flex: 1,
  },
  moreDots: {
    color: '#6200EE',
    fontSize: 20,
    marginTop: -8+4,
    marginBottom: -12+4,
  },
  ratingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ratingLabel: {
    color: 'white',
    fontSize: 18,
  },
  ratingScore: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  starsContainer: {
    flexDirection: 'row',
    zIndex: 1000,
  },
  rateButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  rateButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    marginLeft: 16,
  },
  rateButtonText: {
    color: 'white',
    fontSize: 14,
  },
  postsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 0,
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#887c9f',
  },
  postContent: {
    flex: 1,
    paddingLeft: 10,
  },
  postUser: {
    color: 'white',
    fontSize: 16,
  },
  userRating: {
    marginLeft: 8,
  },
  postText: {
    color: 'white',
    fontSize: 14,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200EE',
    borderRadius: 50,
    padding: 15,
  },
  divider: {
    height: 1,
    backgroundColor: Themes.colors.purpleDetail,
    marginVertical: 8,
  },
  star: {
    fontSize: 32,
    marginRight: 6,
  },
  overallContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usernameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userPic: {
    marginTop: 0,
  },
  movieDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  movieThumbnail: {
    width: 80,
    height: 120,
    marginHorizontal: 12,
  },
  synopsisContainer: {
    marginTop: 8,
  },
  synopsisText: {
    fontSize: 14,
    color: 'white',
  },
  ex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  movieTextContainer: {
    flex: 0.95,
  },
  moreText: {
    color: Themes.colors.purpleDetail,
    fontSize: 14,
    alignItems: 'center',
  },
});

export default MovieScreen;
