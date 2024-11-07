import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import { Themes } from '../constants/Themes';
import RatingFavorite from '../components/RatingFavorite';
import { useRouter } from 'expo-router';

const UserPosts = () => {
  const route = useRouter();
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
      rating: 4.5,
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
      {/* Header */}
      <Header
        leftIconName="arrow-back"
        title="User's posts"
        leftIconRoute={"other_user_information"}
      />

        <View style={styles.topDivider} />

      <ScrollView>
        {posts.map((post, index) => (
          <View key={index} style={styles.postContainer}>
            <Pressable style={styles.titleContainer} onPress={()=>{route.push('movieScreen')}}>
              <View style={styles.titleContainer}>
                <Text style={styles.movieTitle}>{post.title}</Text>
                <Text style={styles.movieYear}>{post.year}</Text>
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
            <View style={styles.contentContainer}>
              <Pressable style={styles.poster} onPress={()=>{route.push('movieScreen')}}>
                <Image source={{ uri: post.posterUri }} />
              </Pressable>
              <Pressable style={styles.description} onPress={()=>{route.push('post')}}>
                <Text style={styles.description}>{post.description}</Text>
              </Pressable>
            </View>

            {/* Divider */}
            <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.grayDark,
  },
  postContainer: {
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    alignSelf: 'flex-start',
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
    width: 60+8,
    height: 90+8,
    marginRight: 8,
    marginLeft: 6,
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
  test: {
    alignSelf: 'flex-start',
  },
});

export default UserPosts;
