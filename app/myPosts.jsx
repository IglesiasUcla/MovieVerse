import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Pressable } from 'react-native';
import Header from '../components/Header';
import { Themes } from '../constants/Themes';
import { Ionicons } from '@expo/vector-icons';
import RatingFavorite from '../components/RatingFavorite';
import { useRouter } from 'expo-router';
import { DiscardChangesPopup, DiscardChangesPopup1, PhotoSelectionPopup } from '../components/Popup';

const MyPosts = () => {
  const route=useRouter()
  const [showDiscardPopup, setShowDiscardPopup] = useState(false);

  const posts = [
    {
      title: 'Movie A',
      year: '2018',
      posterUri: 'https://link-to-hereditary-poster.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat.',
      rating: 4,
      isFavorite: true,
    },
    {
      title: 'Movie B',
      year: '2016',
      posterUri: 'https://link-to-lalaland-poster.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat.',
      rating: 5,
      isFavorite: true,
    },
    {
      title: 'Movie C',
      year: '2019',
      posterUri: 'https://link-to-fractured-poster.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat.',
      rating: 3,
      isFavorite: false,
    },
    {
        title: 'Movie D',
        year: '2018',
        posterUri: 'https://link-to-hereditary-poster.com',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat.',
        rating: 4,
        isFavorite: true,
    },
    {
        title: 'Movie E',
        year: '2016',
        posterUri: 'https://link-to-lalaland-poster.com',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat.',
        rating: 5,
        isFavorite: true,
    },
    {
        title: 'Movie F',
        year: '2019',
        posterUri: 'https://link-to-fractured-poster.com',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat.',
        rating: 3,
        isFavorite: false,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
      {/* Header */}
      <Header
        leftIconName="arrow-back"
        title="My posts"
        leftIconRoute={"/homePage"}
      />

        <View style={styles.topDivider} />

      <ScrollView>
        {posts.map((post, index) => (
          <View key={index} style={styles.postContainer}>
            <Pressable style={styles.test} onPress={() => route.push('movieScreen')}>
            <View style={styles.titleContainer}>
              <Text style={styles.movieTitle}>{post.title}</Text>
              <Text style={styles.movieYear}>{post.year}</Text>
              <TouchableOpacity onPress={() => setShowDiscardPopup(true)} style={styles.editButton}>
                <Ionicons name="pencil" size={20} color="#6116ec" />
              </TouchableOpacity>
            </View>
            </Pressable>
            
            {/* Rating and Favorite Icons */}
            <View style={styles.ratingFavoriteContainer}>
              <RatingFavorite
                rating={post.rating}
                isFavorite={post.isFavorite}
                starSize={14} 
                iconSize={12} 
              />
            </View>

            {/* Movie Poster and Description */}
            <Pressable onPress={() => route.push('post')} >
            <View style={styles.contentContainer}>
              <Image source={{ uri: post.posterUri }} style={styles.poster} />
              <Text style={styles.description}>{post.description}</Text>
            </View>
            </Pressable>

            {/* Divider */}
            <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>
      <DiscardChangesPopup
        visible={showDiscardPopup}
        onCancel={() => setShowDiscardPopup(false)} 
        onDiscard={() => {route.push('movieReview')}}
        title='Edit post'
        text='Would you like to edit your post?'
        purpleButton='Yes'
      />
    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.grayDark,
  },
  test: {
    alignSelf: 'flex-start',
  },
  postContainer: {
    paddingHorizontal: 16,
  },
  editButton: {
    marginLeft: 6,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieYear: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 8,
  },
  ratingFavoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 14,
    marginRight: 1,
  },
  favoriteIcon: {
    marginLeft: 2,
    marginTop: 3,
  },
  contentContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  poster: {
    width: 60,
    height: 90,
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: 'gray',
  },
  description: {
    color: '#AAA',
    fontSize: 14,
    flex: 1,
    marginLeft: 8,
  },
  topDivider: {
    height: 1,
    backgroundColor: Themes.colors.grayDark,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: Themes.colors.purpleDetail,
    marginVertical: 8,
  },
});

export default MyPosts;
