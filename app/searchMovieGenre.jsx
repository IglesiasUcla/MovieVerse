import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import { Themes } from '../constants/Themes';
import { getMovieGenres } from '../helpers/tmdbApi';

const SearchMovieGenre = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const fetchedGenres = await getMovieGenres();
        setGenres(fetchedGenres); // Actualiza el estado con los géneros de la API
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setLoading(false); // Detiene el indicador de carga
      }
    };

    fetchGenres();
  }, []);

  const handleGenrePress = (genre) => {
    console.log(`Selected genre test: ${genre.name}`);
    console.log(`Selected genre id: ${genre.id}`);
    // Pasa el genreId y genreName como parámetros
    router.push({
      pathname: `/genreMovieList/${genre.id}`,
      params: { genreId: genre.id, genreName: genre.name },
    });    
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
      <Header
        title="Genres"
        leftIconName="arrow-back"
        leftIconRoute="/search_movies"
      />

      {loading ? (
        <ActivityIndicator size="large" color={Themes.colors.white} style={styles.loader} />
      ) : (
        <FlatList
          data={genres}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.genreItem} onPress={() => handleGenrePress(item)}>
              <Text style={styles.genreText}>{item.name}</Text>
              <AntDesign name="rightcircle" size={20} color="white" />
            </TouchableOpacity>
          )}
        />
      )}
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchMovieGenre;
