import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/Colors';
import { Themes } from '../constants/Themes';
import Header from '../components/Header';

const Profile_user = () => {
  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Header */}
      <View>
        <Header
          title="Username"
          leftIconName="arrow-back"
          leftIconRoute={""}            //leftIconRoute={"/interface"}
          rightIconName="settings"      //rightIconRoute={"/interface"}
          rightIconRoute={""}
        />
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
  username: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
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
