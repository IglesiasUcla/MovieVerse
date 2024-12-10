import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Pressable,
  Alert,
} from "react-native";
import Header from "../components/Header";
import { Themes } from "../constants/Themes";
import { Ionicons } from "@expo/vector-icons";
import RatingFavorite from "../components/RatingFavorite";
import { useRouter } from "expo-router";
import { DiscardChangesPopup } from "../components/Popup";
import { MyUserPost } from "../helpers/movieverseApi";
import { getMovieDetails } from "../helpers/tmdbApi";

const MyPosts = () => {
  const route = useRouter();
  const [resul, setResul] = useState([]);
  const [showDiscardPopup, setShowDiscardPopup] = useState(false);
  const [movieDetails, setMovieDetails] = useState({}); // Almacena detalles de cada película

  // Función para obtener las publicaciones del usuario
  const handleMyPost = async () => {
    try {
      const result = await MyUserPost();
      setResul(result);

      // Se obtienen los detalles de la película para cada post
      result.forEach(async (post) => {
        const details = await getMovieDetails("912649");
        console.log(details);
        setMovieDetails((prevState) => ({
          ...prevState,
          [post.post_id]: details,
        }));
      });

      console.log("Resultado", movieDetails);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message || "Error desconocido");
    }
  };

  useEffect(() => {
    handleMyPost();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Themes.colors.purpleStrong}
      />
      {/* Header */}
      <Header
        leftIconName="arrow-back"
        title="My posts"
        leftIconRoute={"/homePage"}
      />

      <View style={styles.topDivider} />

      <ScrollView>
        {resul &&
          resul.map((post) => (
            <View key={post.post_id} style={styles.postContainer}>
              <Pressable
                style={styles.test}
                onPress={() => route.push("movieScreen")}
              >
                <View style={styles.titleContainer}>
                  {/* Mostramos el título y año si los detalles están disponibles */}
                  <Text style={styles.movieTitle}>
                    {movieDetails[post.post_id]?.title || "Default"}
                  </Text>
                  <Text style={styles.movieYear}>
                    {movieDetails[post.post_id]?.year || "Default"}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowDiscardPopup(true)}
                    style={styles.editButton}
                  >
                    <Ionicons name="pencil" size={20} color="#6116ec" />
                  </TouchableOpacity>
                </View>
              </Pressable>

              {/* Rating and Favorite Icons */}
              <View style={styles.ratingFavoriteContainer}>
                <RatingFavorite
                  rating={post.rating}
                  starSize={14}
                  iconSize={12}
                />
              </View>

              {/* Movie Poster and Description */}
              <Pressable onPress={() => route.push("post")}>
                <View style={styles.contentContainer}>
                  <Image
                    source={{ uri: post.posterUri }}
                    style={styles.poster}
                  />
                  <Text style={styles.description}>{post.review}</Text>
                </View>
              </Pressable>

              {/* Divider */}
              <View style={styles.divider} />
            </View>
          ))}
      </ScrollView>

      <DiscardChangesPopup
        visible={showDiscardPopup}
        onCancel={() => setShowDiscardPopup(false)}
        onDiscard={() => {
          route.push("movieReview");
        }}
        title="Edit post"
        text="Would you like to edit your post?"
        purpleButton="Yes"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.grayDark,
  },
  test: {
    alignSelf: "flex-start",
  },
  postContainer: {
    paddingHorizontal: 16,
  },
  editButton: {
    marginLeft: 6,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  movieTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  movieYear: {
    color: "#FFFFFF",
    fontSize: 18,
    marginLeft: 8,
  },
  ratingFavoriteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starContainer: {
    flexDirection: "row",
  },
  star: {
    fontSize: 14,
    marginRight: 1,
  },
  favoriteIcon: {
    marginLeft: 2,
    marginTop: 3,
  },
  contentContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  poster: {
    width: 60,
    height: 90,
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: "gray",
  },
  description: {
    color: "#AAA",
    fontSize: 14,
    flex: 1,
    marginLeft: 8,
  },
  topDivider: {
    height: 1,
    backgroundColor: Themes.colors.grayDark,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: Themes.colors.purpleDetail,
    marginVertical: 8,
  },
});

export default MyPosts;
