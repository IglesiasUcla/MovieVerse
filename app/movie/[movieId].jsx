import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Pressable, StatusBar, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Themes } from '../../constants/Themes';
import { useRouter, useLocalSearchParams } from 'expo-router';
import RatingFavorite from '../../components/RatingFavorite';
import { Ionicons } from '@expo/vector-icons';
import { getMovieDetails, getMovieDirector } from '../../helpers/tmdbApi';
import { getPostsByMovieId } from '../../helpers/movieverseApi';

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
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true); // Estado para el loading de los posts
  const [errorPosts, setErrorPosts] = useState(null); // Estado para errores específicos de los posts


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

  useEffect(() => {
    const fetchMoviePosts = async () => {
      try {
        setLoadingPosts(true);
        const postsData = await getPostsByMovieId(movieId);
        console.log("Posts data response:", postsData); // Para depuración
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts for movie:", error);
        setErrorPosts("Failed to fetch posts. Please try again.");
      } finally {
        setLoadingPosts(false);
      }
    };
  
    fetchMoviePosts();
  }, [movieId]);

  console.log('response:', posts);
  



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
              <Text style={styles.movieDetails}>{new Date(movie.release_date).getFullYear()} • {movie.runtime} min</Text>
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
            <TouchableOpacity style={styles.rateButton} onPress={() => {
                // Pasa la película como parámetro a la pantalla de creación de reseñas
                route.push({
                  pathname: '/movieReview',
                  params: {
                    title: movie.title,
                    year: new Date(movie.release_date).getFullYear(),
                    posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    movieId: movie.id,
                  },
                });
              }} >
              <Text style={styles.rateButtonText}>Add movie to a post</Text>
            </TouchableOpacity>
          </View>

          </View>

          <View style={styles.divider} />

          {/* Posts de los usuarios */}
          <Text style={styles.postsTitle}>Posts</Text>
          {/* Manejo de errores y carga */}
          {loadingPosts ? (
            <ActivityIndicator size="large" color="#6200EE" />
          ) : errorPosts ? (
            <Text style={styles.errorText}>{errorPosts}</Text>
          ) : posts.length === 0 ? (
            <Text style={styles.noPostsText}>No posts available for this movie.</Text>
          ) : (
            posts.map((post) => (
              <Pressable key={post.post_id}
              onPress={() => route.push({ pathname: '/post', params: { postId: post.post_id } })}>
              <View style={styles.postContainer}>
                <View style={styles.test} onPress={() => route.push({ pathname: '/other_user_information', params: { userId: post.user_id } })} >
                  <Image
                    source={{ uri: post.profile_picture || 'https://via.placeholder.com/48' }}
                    style={styles.profilePicture}
                  />
                </View>
          
          

            <View style={styles.postContent}>
              
              <View style={styles.usernameContainer}>
                <Text style={styles.postUser}>{post.username}</Text>
                <View style={styles.userRating}>
                  <RatingFavorite
                    rating={post.rating}
                    showFavorite={false}
                    isFavorite={false}
                    starSize={16}    // Ajusta el tamaño si es necesario
                    iconSize={12}    // Ajusta el tamaño si es necesario
                  />
                </View>
              </View>
              <Text style={styles.postText}>{post.review}</Text>
            </View>
          </View>
          </Pressable>
            ))
        )}
          
       
     

        </View>
      </Animated.ScrollView>

      {/* Botón flotante */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => {
                // Pasa la película como parámetro a la pantalla de creación de reseñas
                route.push({
                  pathname: '/movieReview',
                  params: {
                    title: movie.title,
                    year: new Date(movie.release_date).getFullYear(),
                    posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    movieId: movie.id,
                  },
                });
              }}>
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
  errorText: {
    textAlign: 'center',
    color: Themes.colors.purpleDetail,
    marginVertical: 10,
  },
  noPostsText: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 10,
  },
  headerImageContainer: {
    height: 170,
    position: 'relative',
    backgroundColor: Themes.colors.grayLight,
  },
  test: {
    alignSelf: 'flex-start',
  },
  profilePicture: {
    width: 32,
    height: 32,
    borderRadius: 16, // Circular
    borderWidth: 1,
    borderColor: Themes.colors.purpleStrong,
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
    fontSize: 16,
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
  postContent1: {
    flexDirection: 'row',
  },
  postUser: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userRating: {
    marginLeft: 8,
  },
  postText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'condensed',
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