import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/Colors';
import { Themes } from '../constants/Themes';
import { useRouter } from 'expo-router';

const CreatePost_review = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme] || Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: Themes.colors.purpleStrong }]}>
        <TouchableOpacity onPress={() => router.push('/search_movies')}>
          <Icon name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: themeColors.text }]}>Edit Review</Text>
      </View>

      {/* Review Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.reviewText, { color: themeColors.text }]}>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  contentContainer: {
    padding: 20,
  },
  reviewText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default CreatePost_review;
