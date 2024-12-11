import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Header from "../components/Header";
import { Themes } from "../constants/Themes";
import { useRouter } from "expo-router";
import { searchPostsByTag } from "../helpers/movieverseApi";
import { getMovieDetails } from "../helpers/tmdbApi";
import RatingFavorite from "../components/RatingFavorite";

const SearchPosts = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (search.trim()) {
        fetchPosts(search);
      } else {
        setPosts([]); // Si no hay búsqueda, limpia los posts
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [search]);

  const fetchPosts = async (tag) => {
    setLoading(true);
    setError(null);
    setPosts([]);

    try {
      // Eliminar espacios al inicio y al final del tag
      const trimmedTag = tag.trim();

      const response = await searchPostsByTag(trimmedTag);

      if (response.length === 0) {
        console.log(`No posts found for tag: "${tag}".`);
        return; // Terminar sin marcarlo como error
      }

      const postsWithMovieDetails = await Promise.all(
        response.map(async (post) => {
          if (!post.movie_id) {
            console.warn(
              `Post ${post.post_id} tiene un movie_id nulo o inválido.`
            );
            return { ...post, movie_title: "Unknown", movie_poster: null };
          }
          console.log(post.movie_id);
          const movieDetails = await getMovieDetails(post.movie_id);
          return {
            ...post,
            movie_title: movieDetails.title,
            movie_poster: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
          };
        })
      );

      setPosts(postsWithMovieDetails);
    } catch (err) {
      console.error("Error fetching posts by tag:", err);
      setError(
        "No posts matching your tag requirement were found. Please try again with another tag."
      );
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  console.log("Current search:", search);
  console.log("Fetched posts:", posts);
  console.log("Error:", error);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Themes.colors.purpleStrong}
      />
      {/* Header */}
      <Header
        title="Search Posts"
        leftIconName="arrow-back"
        leftIconRoute="/search"
      />

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#AAA" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search a tag"
          placeholderTextColor="#AAA"
          value={search}
          onChangeText={setSearch}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === " ") {
              return; // Ignorar espacios
            }
          }}
        />
      </View>

      {/* Posts List or Loading/Error */}
      <ScrollView contentContainerStyle={styles.postList}>
        {loading ? (
          <ActivityIndicator size="large" color={Themes.colors.purpleStrong} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : posts.length === 0 && search.trim() ? (
          <Text style={styles.noResultsText}>
            No posts found for "{search}".
          </Text>
        ) : (
          posts.map((post) => (
            <TouchableOpacity
              key={post.post_id}
              style={styles.postContainer}
              onPress={() =>
                router.push({
                  pathname: "/post",
                  params: { postId: post.post_id },
                })
              }
            >
              <Image
                source={{
                  uri:
                    post.movie_poster || "https://via.placeholder.com/80x120",
                }}
                style={styles.poster}
              />
              <View style={styles.postContent}>
                <View style={styles.userInfo}>
                  <Image
                    source={{
                      uri: post.user_avatar || "https://via.placeholder.com/40",
                    }}
                    style={styles.avatar}
                  />
                  <Text style={styles.username}>{post.username}</Text>
                </View>
                <Text style={styles.movieTitle}>
                  {post.movie_title || "Unknown Title"}
                </Text>
                <RatingFavorite
                  style={styles.starsContainer}
                  rating={
                    typeof post.rating === "number" && post.rating >= 0
                      ? post.rating
                      : 0
                  }
                  showFavorite={false}
                  starSize={16} // Ajusta el tamaño si es necesario
                />
                {/** 
                    {post.favorite && (
                        <Icon
                            name="star"
                            size={16}
                            color="#b39ddb"
                            style={styles.favoriteIcon}
                        />
                    )}*/}
                <Text style={styles.review}>{post.review}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default SearchPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.screensColor,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 25,
    margin: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },
  postList: {
    paddingHorizontal: 16,
  },
  postContainer: {
    flexDirection: "row",
    backgroundColor: Themes.colors.cardBackground,
    borderRadius: 8,
    marginVertical: 8,
    padding: 10,
    alignItems: "flex-start",
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
  },
  postContent: {
    flex: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  review: {
    fontSize: 14,
    color: "white",
  },
  errorText: {
    textAlign: "center",
    color: Themes.colors.purpleLight,
    marginTop: 20,
  },
  noResultsText: {
    textAlign: "center",
    color: "white",
    marginTop: 20,
    fontSize: 18,
  },
});
