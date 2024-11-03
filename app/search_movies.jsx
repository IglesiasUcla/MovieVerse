import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/Colors';
import { Themes } from '../constants/Themes';
import { useRouter } from 'expo-router';

const SearchMovies = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme] || Colors.light;
  
  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: Themes.colors.purpleStrong }]}>
        <TouchableOpacity onPress={() => router.push('/search')}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity  style={styles.titleContainer}>
          <Text style={styles.title}>Search Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/searchMovieSearch')}>
          <Icon name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Browse By Section */}
      <View style={styles.browseContainer}>
        <Text style={styles.browseTitle}>Browse By</Text>
        
        {/* Navegación a cada pantalla específica */}
        <TouchableOpacity style={styles.optionContainer} onPress={() => router.push('/releaseData_1')}>
          <Text style={styles.optionText}>Release Date</Text>
          <Icon name="chevron-right" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionContainer} onPress={() => router.push('/searchMovieGenre')}>
          <Text style={styles.optionText}>Genre</Text>
          <Icon name="chevron-right" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionContainer} onPress={() => router.push('/searchMovies_mostPopular')}>
          <Text style={styles.optionText}>Most Popular</Text>
          <Icon name="chevron-right" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionContainer} onPress={() => router.push('/searchMovies_highestRated')}>
          <Text style={styles.optionText}>Highest Rated</Text>
          <Icon name="chevron-right" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
      </View>
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
    padding: 15,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 10, // Espacio entre el icono y el título
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left', // Alineación a la izquierda
  },
  browseContainer: {
    padding: 20,
  },
  browseTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default SearchMovies;
