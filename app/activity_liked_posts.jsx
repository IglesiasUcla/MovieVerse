import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Themes } from '../constants/Themes';
import Header from '../components/Header';
import PostComment from '../components/PostComment';

const Activity_liked_posts = () => {
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <Header
        title="Activity"
        leftIconName="arrow-back"
        leftIconRoute="/homePage"
      />

      {/* Contenedor de pestañas */}
      <View style={styles.tabContainer}>
        <View style={styles.tabActive}>
          <Text style={styles.tabText}>Liked Posts</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.tabText}>Favorite Movies</Text>
        </View>
      </View>

      {/* Lista de comentarios */}
      <ScrollView style={styles.commentsContainer}>
        <PostComment
          userName="User1"
          postReview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat."
        />
        
        <PostComment
          userName="User2"
          postReview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat."
        />
        <PostComment
          userName="User3"
          postReview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat."
        />
        <PostComment
          userName="User4"
          postReview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat."
        />
      </ScrollView>
    </View>
  );
};

export default Activity_liked_posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.screensColor,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Themes.colors.purpleStrong,
    justifyContent: 'space-around',
  },
  tab: {
    paddingVertical: 12,
  },
  tabActive: {
    borderBottomColor: Themes.colors.purpleLight,
    borderBottomWidth: 2,
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 18,
    color: 'white',
    fontWeight: Themes.fonts.medium,
  },
  commentsContainer: {
    paddingVertical: 10,
  },
});
