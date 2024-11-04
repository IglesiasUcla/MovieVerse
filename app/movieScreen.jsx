import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Themes } from '../constants/Themes';

const MovieScreen = ({ navigation }) => {
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  const toggleSynopsis = () => {
    setShowFullSynopsis(!showFullSynopsis);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Imagen de la película como header */}
        <View style={styles.headerImageContainer}>
          <Image
            source={{ uri: 'https://image.tmdb.org/t/p/w500/path_to_movie_image.jpg' }}
            style={styles.headerImage}
          />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Información de la película */}
        <View style={styles.movieInfoContainer}>
          <Text style={styles.movieTitle}>The Pianist</Text>
          <Text style={styles.movieDirector}>Directed by <Text style={styles.bold}>Roman Polanski</Text></Text>
          <Text style={styles.movieDetails}>2018  •  150 min</Text>

          <View style={styles.synopsisContainer}>
            <Text style={styles.synopsisText}>
              {showFullSynopsis ? 
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor magna ipsum, et egestas magna dapibus ac. Morbi id laoreet nisi, ac vulputate arcu. Donec et placerat turpis, viverra condimentum lorem. Maecenas ut quam rhoncus, auctor elit et, tincidunt lectus. Aenean eu facilisis ex..." : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula..."}
            </Text>
            <TouchableOpacity onPress={toggleSynopsis}>
              <Text style={styles.moreDots}>...</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Overall Rating</Text>
            <Text style={styles.ratingScore}>4.0</Text>
            <TouchableOpacity style={styles.rateButton}>
              <Text style={styles.rateButtonText}>Rate this movie</Text>
            </TouchableOpacity>
          </View>
        
          <View>
            <View style={styles.starsContainer}>
            {[...Array(5)].map((_, index) => (
                <Text
                    key={index}
                    style={[
                        styles.star,
                        { color: index < 4 ? '#6200EE' : '#C0C0C0' }
                    ]}
                >
                    ✦
                </Text>
            ))}
            </View>

          </View>

          <View style={styles.divider} />

          {/* Posts de los usuarios */}
          <Text style={styles.postsTitle}>Posts</Text>
          <View style={styles.postContainer}>
            <AntDesign name="user" size={24} color="white" />
            <View style={styles.postContent}>
              <Text style={styles.postUser}>User’s post</Text>
              <Text style={styles.postText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</Text>
            </View>
            <AntDesign name="heart" size={20} color="#6200EE" />
          </View>
          {/* Agrega más posts según sea necesario */}
          <View style={styles.postContainer}>
            <AntDesign name="user" size={24} color="white" />
            <View style={styles.postContent}>
              <Text style={styles.postUser}>User’s post</Text>
              <Text style={styles.postText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</Text>
            </View>
            <AntDesign name="heart" size={20} color="#6200EE" />
          </View>
          <View style={styles.postContainer}>
            <AntDesign name="user" size={24} color="white" />
            <View style={styles.postContent}>
              <Text style={styles.postUser}>User’s post</Text>
              <Text style={styles.postText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</Text>
            </View>
            <AntDesign name="heart" size={20} color="#6200EE" />
          </View>
          <View style={styles.postContainer}>
            <AntDesign name="user" size={24} color="white" />
            <View style={styles.postContent}>
              <Text style={styles.postUser}>User’s post</Text>
              <Text style={styles.postText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</Text>
            </View>
            <AntDesign name="heart" size={20} color="#6200EE" />
          </View>
          <View style={styles.postContainer}>
            <AntDesign name="user" size={24} color="white" />
            <View style={styles.postContent}>
              <Text style={styles.postUser}>User’s post</Text>
              <Text style={styles.postText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</Text>
            </View>
            <AntDesign name="heart" size={20} color="#6200EE" />
          </View>
        </View>
      </ScrollView>

      {/* Botón flotante */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => console.log("Rate this movie")}>
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
    height: 200,
    position: 'relative',
    backgroundColor: Themes.colors.grayLight,
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
  },
  movieInfoContainer: {
    padding: 16,
  },
  movieTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  movieDirector: {
    color: 'white',
    fontSize: 16,
    marginVertical: 5,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  synopsisText: {
    color: 'white',
    flex: 1,
  },
  moreDots: {
    color: '#6200EE',
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },
  ratingLabel: {
    color: 'white',
    fontSize: 16,
  },
  ratingScore: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  rateButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    marginLeft: 16+16+16,
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
    marginRight: 4,
  },
});

export default MovieScreen;
