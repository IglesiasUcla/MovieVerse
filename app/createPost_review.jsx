import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, useColorScheme, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/Colors';
import { Themes } from '../constants/Themes';
import { useRouter } from 'expo-router';

const CreatePost_review = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme] || Colors.light;
  const [reviewText, setReviewText] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
            <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: Themes.colors.purpleStrong }]}>
        <TouchableOpacity onPress={() => router.push('/movieReview')}>
          <Icon name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: themeColors.text }]}>Edit Review</Text>
      </View>

      {/* Review Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TextInput
          style={[styles.reviewText, { color: themeColors.text }]}
          multiline
          numberOfLines={6}
          placeholder="Write your review here..."
          placeholderTextColor={themeColors.placeholder}
          value={reviewText}
          onChangeText={setReviewText}
        />
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
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default CreatePost_review;
