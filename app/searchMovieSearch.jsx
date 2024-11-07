import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import { Themes } from '../constants/Themes';
import { useRouter } from 'expo-router';

const SearchMovieSearch = () => {
  const [search, setSearch] = useState('');
  const route = useRouter();

  const movies = [
    { id: 1, title: 'Movie A', year: '2019', poster: 'https://link-to-poster1.com' },
    { id: 2, title: 'Movie B', year: '1982', poster: 'https://link-to-poster2.com' },
    { id: 3, title: 'Movie C', year: '2014', poster: 'https://link-to-poster3.com' },
    { id: 4, title: 'Movie D', year: '2004', poster: 'https://link-to-poster4.com' },
    { id: 5, title: 'Movie E', year: '2020', poster: 'https://link-to-poster4.com' },
    { id: 6, title: 'Movie F', year: '1998', poster: 'https://link-to-poster4.com' },
    { id: 7, title: 'Movie G', year: '1989', poster: 'https://link-to-poster4.com' },
    { id: 8, title: 'Movie H', year: '2001', poster: 'https://link-to-poster4.com' },
    { id: 9, title: 'Movie I', year: '2016', poster: 'https://link-to-poster4.com' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
      {/* Header */}
      <Header
        title="Search a movie"
        leftIconName="arrow-back"       
        leftIconRoute={"search_movies"}
    />

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#AAA" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search a movie"
          placeholderTextColor="#AAA"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Movie List */}
      <ScrollView contentContainerStyle={styles.movieList}>
        {movies.map((movie) => (
          <TouchableOpacity key={movie.id} style={styles.movieItem} onPress={() => { route.push('movieScreen')}} >
            <Image source={{ uri: movie.poster }} style={styles.poster} />
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <Text style={styles.movieYear}>{movie.year}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 25,
    margin: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 8,
  },
  movieList: {
    paddingHorizontal: 16,
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  poster: {
    width: 50,
    height: 75,
    borderRadius: 8,
    marginRight: 16,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieYear: {
    color: '#AAAAAA',
    fontSize: 16,
  },
});

export default SearchMovieSearch;
