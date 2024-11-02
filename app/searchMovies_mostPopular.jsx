import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/Colors'; // Asegúrate de tener esta constante
import { Themes } from '../constants/Themes';
import { useRouter } from 'expo-router';

const movies = Array.from({ length: 18 }, (_, index) => ({ id: index.toString() }));

const SearchMovies_mostPopular = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme] || Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/search_movies')}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Alineación a la izquierda
    padding: 15,
    backgroundColor: Themes.colors.purpleStrong, // Morado #6116EC
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10, // Espacio a la izquierda del título
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
