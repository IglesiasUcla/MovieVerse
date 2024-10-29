import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Themes } from '../constants/Themes';

const movies = Array.from({ length: 18 }, (_, index) => ({ id: index.toString() }));

const SearchMovies_mostPopular = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#FFFFFF" onPress={() => navigation.navigate('search_movies')}/>
        </TouchableOpacity>
        <Text style={styles.title}>Most Popular</Text>
        <View style={{ width: 24 }} /> {/* Espacio para alinear el título centrado */}
      </View>

      {/* Movie Grid */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={() => (
          <View style={styles.movieContainer} />
        )}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: Themes.colors.purpleStrong, // Morado #6116EC
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  grid: {
    padding: 10,
  },
  movieContainer: {
    flex: 1,
    margin: 5,
    height: 165, // Altura de cada recuadro en la cuadrícula
    backgroundColor: Themes.colors.grayDark, // Color de fondo de los recuadros
    borderRadius: 8,
  },
});

export default SearchMovies_mostPopular;
