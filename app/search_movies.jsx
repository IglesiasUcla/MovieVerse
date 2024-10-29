import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Search_movies = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Search Movies</Text>
        <TouchableOpacity>
          <Icon name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Browse By Section */}
      <View style={styles.browseContainer}>
        <Text style={styles.browseTitle}>Browse By</Text>
        {['Release Date', 'Genre', 'Most Popular', 'Highest Rated'].map((item, index) => (
          <TouchableOpacity key={index} style={styles.optionContainer}>
            <Text style={styles.optionText}>{item}</Text>
            <Icon name="chevron-right" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        ))}
      </View>
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
    backgroundColor: '#6116EC', // Morado #6116EC
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
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

export default Search_movies;
