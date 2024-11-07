import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Themes } from '../constants/Themes';
import Header from '../components/Header';
import { StatusBar } from 'expo-status-bar';

const Profile_user = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
      {/* Header */}
      <View>
        <Header
          title="Username"
          leftIconName="arrow-back"
          leftIconRoute={"/homePage"}            
          rightIconName="settings"      
          rightIconRoute={"profile_Settings"}
        />
      </View>

      {/* Profile Information */}
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Icon name="person" size={90} color="#6116EC" />
        </View>
        <Text style={styles.aboutText}>About You</Text>
        <View style={styles.infoLine} />
        <View style={styles.infoLine} />
      </View>

      {/* Favorite Movies - Alineado en la parte inferior */}
      <View style={styles.favoriteMoviesContainer}>
        <Text style={styles.sectionTitle}>Favorite Movies</Text>
        <ScrollView 
          horizontal={true} 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.moviesContainer}>
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <TouchableOpacity key={index} style={styles.movieBox}>
              <Icon name="add" size={35} color="#6116EC" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.grayDark,
    justifyContent: 'space-between', // Espacio entre el contenido superior y la parte inferior
  },
  username: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40, // Para centrar el perfil y separarlo de arriba
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#6116EC',
  },
  aboutText: {
    color: '#FFFFFF',
    fontSize: 24, // Texto más grande
    marginVertical: 15,
  },
  infoLine: {
    width: 200, // Líneas más largas
    height: 6,
    backgroundColor: '#6116EC',
    borderRadius: 10,
    marginVertical: 5,
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
});

export default Profile_user;
