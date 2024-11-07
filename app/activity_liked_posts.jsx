import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Themes } from '../constants/Themes';
import Header from '../components/Header';
import LikedMovieContent from '../components/LikedMovieContent';
import { StatusBar } from 'expo-status-bar';

const Activity_liked_posts = () => {
  const [currentTab, setCurrentTab] = useState('activity_liked_posts');
  const router = useRouter();

  // Función para cambiar de pestaña y navegar a la pantalla correspondiente
  const onTabChange = (tab) => {
    setCurrentTab(tab);
    if (tab === 'activity_liked_posts') {
      router.push('/activity_liked_posts'); // Navega a la pantalla de Liked Posts
    } else if (tab === 'activity_favorite_movies') {
      router.push('/activity_favorite_movies'); // Navega a la pantalla de Favorite Movies
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <StatusBar style="dark"/>
      <Header
        title="Activity"
        leftIconName="arrow-back"
        leftIconRoute="/homePage"// Regresa a la pantalla anterior
      />

      {/* Contenedor de pestañas */}
      <View style={styles.tabContainer}>
        <Pressable
          onPress={() => onTabChange('activity_liked_posts')}
          style={[styles.tab, currentTab === 'activity_liked_posts' && styles.tabActive]}
        >
          <Text style={[styles.tabText, currentTab === 'activity_liked_posts' && styles.activeTabText]}>
            Liked Posts
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onTabChange('activity_favorite_movies')}
          style={[styles.tab, currentTab === 'activity_favorite_movies' && styles.tabActive]}
        >
          <Text style={[styles.tabText, currentTab === 'activity_favorite_movies' && styles.activeTabText]}>
            Favorite Movies
          </Text>
        </Pressable>
      </View>

      {/* Lista de comentarios para Liked Posts */}
      {currentTab === 'activity_liked_posts' && (
        <ScrollView style={styles.commentsContainer}>
          <LikedMovieContent
            userName="User1"
            postReview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat."
          />
          <LikedMovieContent
            userName="User2"
            postReview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat."
          />
          <LikedMovieContent
            userName="User3"
            postReview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat."
          />
          <LikedMovieContent
            userName="User4"
            postReview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat."
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Activity_liked_posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.screensColor,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Themes.colors.purpleStrong,
    justifyContent: 'space-around',
  },
  tab: {
    paddingVertical: 12,
  },
  tabActive: {
    borderBottomColor: Themes.colors.purpleLight,
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 18,
    color: 'white',
    fontWeight: Themes.fonts.medium,
  },
  commentsContainer: {
    paddingVertical: 10,
  },
});
