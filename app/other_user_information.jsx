import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Themes } from '../constants/Themes';
import Header from '../components/Header';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useLocalSearchParams } from 'expo-router';
import { fetchOtherUser, fetchOtherTopMovies } from '../helpers/movieverseApi';
import { getMovieDetails } from '../helpers/tmdbApi';
import Button from '../components/Button';

const OtherUserInformation = () => {
  const { userId } = useLocalSearchParams(); // Lee el parámetro userId
  const [user, setUser] = useState(null);
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const userData = await fetchOtherUser(userId);
        setUser(userData);

        const userTopMovies = await fetchOtherTopMovies(userId);

        if (userTopMovies === "placeholder1" || userTopMovies === "placeholder2" || userTopMovies === "placeholder3" || userTopMovies === null) {
            return null; // Or return a default image URL or placeholder value
          }

        // Obtiene detalles de cada película

        

        const topMoviesWithDetails = await Promise.all(
          userTopMovies.map(async (movie) => {
            const movieDetails = await getMovieDetails(movie.movie_id);
            return {
              rank: movie.rank,
              ...movieDetails,
            };
          })
        );
        setTopMovies(topMoviesWithDetails);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadUserData();
    }
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Themes.colors.purpleStrong} />
      </View>
    );
  }

  if (!user) {
    return <Text style={styles.errorText}>User not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Header
        title={user.username}
        leftIconName="arrow-back"
        leftIconRoute="/homePage"
      />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            {user.profile_picture ? (
              <Image
                source={{ uri: user.profile_picture }}
                style={styles.profilePicture}
              />
            ) : (
              <FontAwesome6
                name="user-circle"
                size={132}
                color={Themes.colors.purpleStrong}
                style={styles.placeholderIcon}
              />
            )}
          </View>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.bio}>{user.description}</Text>

          </View>

            <View style={styles.button}>
          <Button
                        title="View posts" 
                        buttonStyle={styles.buttonb} 
                        onPress={() => { route.push('profile_Settings'); }} 
                        backgroundColor={Themes.colors.purpleStrong} 
                        textColor="white" 
                    /></View>

        <View style={styles.topMoviesContainer}>
          <Text style={styles.sectionTitle}>Top Movies</Text>
          <View style={styles.moviesRow}>
            {topMovies.map((movie) => (
              <View key={movie.id} style={styles.movieContainer}>
                {movie.poster_path ? (
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    }}
                    style={styles.moviePoster}
                  />
                ) : (
                  <FontAwesome6
                    name="film"
                    size={64}
                    color={Themes.colors.purpleStrong}
                    style={styles.placeholderIcon}
                  />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.grayDark,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 152 - 16 - 16 - 16,
  },
  avatarContainer: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 132,
    height: 132,
    borderRadius: 66,
    borderWidth: 1,
    borderColor: Themes.colors.purpleStrong,
  },
  moviesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute posters evenly
    flexWrap: 'wrap', // Allow wrapping to next line if needed
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
  },
  bio: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 8,
  },
  topMoviesContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  button: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonb: {
    width: 120-8,
    height: 48,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  movieContainer: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  movieRank: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 4,
  },
  moviePoster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Themes.colors.grayDark,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OtherUserInformation;
