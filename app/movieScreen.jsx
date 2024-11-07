import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Animated, Pressable } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Themes } from '../constants/Themes';
import { useRouter } from 'expo-router';
import RatingFavorite from '../components/RatingFavorite';
import { Ionicons } from '@expo/vector-icons';

const MovieScreen = () => {
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const scrollY = new Animated.Value(0);
  const route=useRouter()

  const synopsisHeight = useState(new Animated.Value(60))[0];

  const toggleSynopsis = () => {
    Animated.timing(synopsisHeight, {
      toValue: showFullSynopsis ? 60 : 120, // Cambia la altura
      duration: 350, // Duración de la animación
      useNativeDriver: false
    }).start();
    setShowFullSynopsis(!showFullSynopsis);
  };

  return (
    <View style={styles.container}>

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
            source={{ uri: 'https://image.tmdb.org/t/p/w500/path_to_movie_image.jpg' }}
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
              <Text style={styles.movieTitle}>The Pianist</Text>
              <Text style={styles.movieDirector}>
                Directed by <Text style={styles.bold}>Roman Polanski</Text>
              </Text>
              <Text style={styles.movieDetails}>2018 • 150 min</Text>
            </View>
            <Image
              source={{ uri: 'https://image.tmdb.org/t/p/w500/path_to_movie_image.jpg' }}
              style={styles.movieThumbnail}
            />
          </View>

          <View style={styles.synopsisContainer}>
          <Animated.View style={{ height: synopsisHeight }}>
              <Text style={styles.synopsisText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor magna ipsum, et egestas magna dapibus ac.
              Morbi id laoreet nisi, ac vulputate arcu. Donec et placerat turpis,
              viverra condimentum lorem. Maecenas ut quam rhoncus, auctor elit et, tincidunt lectus. Aenean eu facilisis ex.
              </Text>
            </Animated.View>
            <TouchableOpacity onPress={toggleSynopsis}>
              <Text style={styles.moreDots}>•••</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Rating */}
          <View style={styles.overallContainer}>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Overall Rating</Text>
            <Text style={styles.ratingScore}>4.4</Text>

            <View >
            <RatingFavorite style={styles.starsContainer}
                rating={4.4}
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
    marginTop: -24,
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  movieDirector: {
    color: 'white',
    fontSize: 16,
    marginVertical: 5,
    marginTop: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  movieDetails: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
  },
  synopsisContainer: {
    flexDirection: 'column',
    alignItems: 'center',
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
    backgroundColor: 'gray',
    marginHorizontal: 12,
  },
});

export default MovieScreen;
