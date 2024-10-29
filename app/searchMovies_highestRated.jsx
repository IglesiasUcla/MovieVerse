import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Themes } from '../constants/Themes';

const SearchMovies_highestRated = () => {
  const movies = Array.from({ length: 18 }, (_, index) => ({ id: index + 1 })); // Arreglo de ejemplo para 18 recuadros

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#FFFFFF" onPress={() => navigation.navigate('search_movies')}/>
        </TouchableOpacity>
        <Text style={styles.title}>Highest Rated</Text>
        <View style={{ width: 24 }} /> {/* Espacio para alinear el título centrado */}
      </View>

      {/* Movie Grid */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={() => (
          <View style={styles.movieContainer}>
            <View style={styles.placeholder} />
          </View>
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
    backgroundColor: Themes.colors.purpleStrong , // Morado #6116EC
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
    borderRadius: 8,
    backgroundColor: Themes.colors.grayDark,
  },
  placeholder: {
    flex: 1,
    backgroundColor: Themes.colors.grayDark, // Color gris oscuro para el fondo del placeholder
    borderRadius: 8,
  },
});

export default SearchMovies_highestRated;
