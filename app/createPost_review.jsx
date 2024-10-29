import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Themes } from '../constants/Themes';

const CreatePost_review = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#FFFFFF" onPress={() => navigation.navigate('search_movies')}/>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Review</Text>
      </View>

      {/* Review Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.reviewText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. 
          Pellentesque fringilla nisi id erat tristique elementum. Ut et facilisis mi. Quisque aliquam libero ac libero 
          fringilla blandit vel pellentesque sapien. Morbi feugiat erat a turpis fringilla, at varius ante condimentum. 
          Mauris quis ultricies diam. Etiam in hendrerit odio. Vivamus cursus lacus quis purus laoreet, eu tristique nisl 
          sollicitudin. Fusce velit magna, mollis eu mi nec, porta viverra risus. Sed a metus cursus lectus faucibus eleifend.
        </Text>
      </ScrollView>
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
    padding: 15,
    backgroundColor: Themes.colors.purpleStrong, // Morado #6116EC
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  contentContainer: {
    padding: 20,
  },
  reviewText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default CreatePost_review;
