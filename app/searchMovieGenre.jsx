import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../components/Header';

const genres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
  'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction'
];

const SearchMovieGenre = () => {
  const router = useRouter(); 

  const handleGenrePress = (genre) => {
    console.log(`Selected genre: ${genre}`);
    router.push(`searchMovieGenre${genre}`); 
  };

  return (
    <View style={styles.container}>
      <Header
        title="Genre"
        leftIconName="arrow-back"       
        leftIconRoute={"/search_movies"} 
      />
      <FlatList
        data={genres}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.genreItem} onPress={() => handleGenrePress(item)}>
            <Text style={styles.genreText}>{item}</Text>
            <AntDesign name="rightcircle" size={20} color="white" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  genreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#887c9f',
  },
  genreText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SearchMovieGenre;
