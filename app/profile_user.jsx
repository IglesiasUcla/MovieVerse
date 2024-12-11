import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Themes } from '../constants/Themes';
import Header from '../components/Header';
import { StatusBar } from 'expo-status-bar';
import { getUser, createTopMovies } from '../helpers/movieverseApi';
import { useState, useEffect } from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';

const Profile_user = () => {
  const route = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [topMoviesCreated, setTopMoviesCreated] = useState(false);

  useEffect(() => {
    const createInitialTopMovies = async () => {
        if (!topMoviesCreated) {
            try {
                const topMovies = ["placeholder1", "placeholder2", "placeholder3"];
                const response = await createTopMovies(topMovies);
                if (response.message === "Top movies created successfully.") {
                    setTopMoviesCreated(true); // Evita que vuelva a ejecutarse
                }
            } catch (error) {
                console.error("Error creating top movies:", error);
            }
        }
    };

    createInitialTopMovies();
  }, [topMoviesCreated]);


  // Assuming you have a function to fetch the user data (replace with your actual implementation)
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const data = await getUser();
            setUserProfile(data.user); // Cargar datos del usuario
            setUsername(data.user.username || '');
            setBio(data.user.description || '');
            setProfilePicture(data.user.profile_picture || null); // Establecer foto de perfil
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('Failed to load user data.');
        } finally {
            setLoading(false);
        }
    };
    fetchUserData();
}, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
      {/* Header */}
      <View>
        <Header
          title={username}
          leftIconName="arrow-back"
          leftIconRoute={"/homePage"}            
          rightIconName="settings"      
          rightIconRoute={"profile_Settings"}
        />
      </View>

      {/* Profile Information */}
      <ScrollView style={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            {profilePicture ? (
              <Image
                source={{ uri: profilePicture }}
                style={styles.profilePicture}
              />
            ) : (
              <FontAwesome6 name="user-circle" size={132} color={Themes.colors.purpleStrong} style={styles.placeholderIcon} />
            )}
          </View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.bio}>{bio}</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={() => route.push('topMovies')}>
              <Text style={styles.optionButtonText}>Go to your top movies</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => route.push('myPosts')}>
              <Text style={styles.optionButtonText}>Go to your posts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => route.push('activity_liked_posts')}>
              <Text style={styles.optionButtonText}>Go to your activity</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ... other profile sections */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.grayDark,
    justifyContent: 'space-between', // Espacio entre el contenido superior y la parte inferior
  },
  contentContainer: {
    paddingHorizontal: 16, // 16px padding on both sides
  },
  profilePicture: {
    width: 132,
    height: 132,
    borderRadius: 66, // Circular
    borderWidth: 1,
    borderColor: Themes.colors.purpleStrong,
  },
  optionsContainer: {
    marginTop: 32+16,
    flexDirection: 'column', // Arrange buttons horizontally
    gap: 28,
  },
  optionButton: {
    backgroundColor: Themes.colors.grayMid,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 8, // Add a shadow effect for depth
    shadowColor: Themes.colors.purpleStrong,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  optionButtonText: {
    color: 'white',
    fontSize: 18,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 152-16-16-16, // Para centrar el perfil y separarlo de arriba
  },
  avatarContainer: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    position: 'absolute', // Place the icon on top with absolute positioning
    top: 0, // Align to the top of the container
    left: 0, // Align to the left of the container
  },
  aboutText: {
    color: '#FFFFFF',
    fontSize: 24, // Texto más grande
    marginVertical: 15,
  },
  bio: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 8,
  },
  favoriteMoviesContainer: {
    alignItems: 'center',
    marginBottom: 30, // Espacio en la parte inferior de la pantalla
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10, // Espacio debajo del título "Favorite Movies"
  },
  moviesContainer: {
    paddingHorizontal: 20,
  },
  movieBox: {
    width: 70,
    height: 70,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
  },
  descriptionText: {
    color: '#FFFFFF',
    fontSize: 16, // Adjust font size as needed
    marginVertical: 10,
  },
});

export default Profile_user;
