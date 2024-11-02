import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/Colors';
import { Themes } from '../constants/Themes';
import { useRouter } from 'expo-router';

const Profile_user = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme] || Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Header */}
      <View style={[styles.headerContainer, { backgroundColor: Themes.colors.purpleDark }]}>
        <TouchableOpacity onPress={() => router.push('/userProfile')}>
          <Icon name="arrow-back" size={24} color={themeColors.tint} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/userProfile')}>
          <Text style={[styles.usernameText, { color: themeColors.text }]}>Username</Text>
        </TouchableOpacity>
        <View style={styles.spacer} /> {/* Espacio entre el nombre y el icono */}
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Icon name="settings" size={24} color={themeColors.tint} />
        </TouchableOpacity>
      </View>

      {/* Profile Information */}
      <View style={styles.profileContainer}>
        <View style={[styles.avatarContainer, { borderColor: Themes.colors.purpleStrong }]}>
          <Icon name="person" size={90} color={Themes.colors.purpleStrong} />
        </View>
        <Text style={[styles.aboutText, { color: themeColors.text, fontWeight: Themes.fonts.semibold }]}>About You</Text>
        <View style={[styles.infoLine, { backgroundColor: Themes.colors.purpleLight }]} />
        <View style={[styles.infoLine, { backgroundColor: Themes.colors.purpleLight }]} />
      </View>

      {/* Favorite Movies - Alineado en la parte inferior */}
      <View style={styles.favoriteMoviesContainer}>
        <Text style={[styles.sectionTitle, { color: themeColors.text, fontWeight: Themes.fonts.bold }]}>Favorite Movies</Text>
        <ScrollView 
          horizontal={true} 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.moviesContainer}>
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <TouchableOpacity key={index} style={[styles.movieBox, { backgroundColor: Themes.colors.grayMid }]}>
              <Icon name="add" size={35} color={Themes.colors.purpleStrong} />
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
    justifyContent: 'space-between', 
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Themes.colors.purpleDark, // Color morado para el encabezado
  },
  usernameText: {
    fontSize: 24,
    marginHorizontal: 10,
    fontWeight: Themes.fonts.semibold,
  },
  spacer: {
    flex: 1, // Esto permite que el espacio ocupe el resto de la fila
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40, 
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  aboutText: {
    fontSize: 24, 
    marginVertical: 15,
  },
  infoLine: {
    width: 200, 
    height: 6,
    borderRadius: 10,
    marginVertical: 5,
  },
  favoriteMoviesContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10, 
  },
  moviesContainer: {
    paddingHorizontal: 20,
  },
  movieBox: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
});

export default Profile_user;
