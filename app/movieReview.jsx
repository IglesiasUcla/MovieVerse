import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Header from "../components/Header";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Themes } from "../constants/Themes";
import {
  DiscardChangesPopup,
  DiscardChangesPopup1,
  PhotoSelectionPopup,
} from "../components/Popup";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import TagsSection from "../components/TagsSection";
import {
  createPost,
  EditPostId,
  GetPostById,
  markMovieAsFavorite,
} from "../helpers/movieverseApi";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getMovieDetails } from "../helpers/tmdbApi";

const MovieReview = ({}) => {
  const [postDetails, setPostDetails] = useState({
    title: "",
    movieId: "",
    year: new Date(),
    watch_date: new Date(),
    rating: 0,
    review: "",
    spoiler: false,
    tags: [],
    image: null,
  });

  const handleInfo = async () => {
    if (postId) {
      try {
        const dataPost = await GetPostById(postId);
        const details = await getMovieDetails(dataPost.post.movie_id);
        setPostDetails({
          movieId: dataPost.post.movie_id,
          title: details.title,
          year: new Date(details.release_date),
          watch_date: new Date(dataPost.post.watch_date),
          rating: dataPost.post.rating,
          review: dataPost.post.review,
          spoiler: dataPost.post.contains_spoilers,
          tags: dataPost.post.tag.split(","),
        });
      } catch (error) {
        console.error(error);
        Alert.alert("Error", error.message || "Error desconocido");
      }
    } else {
      console.log("fregaste");
    }
  };

  useEffect(() => {
    handleInfo();
  }, []);

  console.log(postDetails.watch_date);

  const [date, setDate] = useState(new Date());
  const [favorite, setFavorite] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDiscardPopup, setShowDiscardPopup] = useState(false);
  const [showDiscardPopup1, setShowDiscardPopup1] = useState(false);
  const [showPhotoSelectionPopup, setShowPhotoSelectionPopup] = useState(false);
  const { title, year, posterUrl, movieId, postId } = useLocalSearchParams();

  const route = useRouter();

  // Función para tomar una foto
  const takePhotoFunction = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      handleInputChange("image", result.assets[0].uri);
    }
    setShowPhotoSelectionPopup(false);
  };

  // Función para seleccionar una foto de la galería
  const selectPhotoFunction = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      handleInputChange("image", result.assets[0].uri);
    }
    setShowPhotoSelectionPopup(false);
  };

  function handleRatingPress(index) {
    setPostDetails((prevDetails) => ({
      ...prevDetails, // Mantiene el resto de las propiedades intactas
      rating: index + 1, // Solo actualiza la propiedad rating
    }));
  }

  const handleInputChange = (field, value) => {
    setPostDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = (newTag) => {
    if (newTag && !postDetails.tags.includes(newTag)) {
      // Validar duplicados
      setPostDetails((prevDetails) => ({
        ...prevDetails,
        tags: [...prevDetails.tags, newTag.trim()], // Agregar nuevo tag
      }));
    }
  };

  const handleRemoveTag = (removedTag) => {
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      tags: prevDetails.tags.filter((tag) => tag !== removedTag), // Eliminar tag
    }));
  };

  const handleSavePost = async () => {
    if (!postDetails.review.trim()) {
      Alert.alert("Error", "Please write a review before publishing.");
      return;
    }
    if (!postDetails.image) {
      Alert.alert("Error", "Please upload a photo before publishing.");
      return;
    }
    if (!postDetails.tags || postDetails.tags.length === 0) {
      Alert.alert("Error", "Please add at least one tag before publishing.");
      return;
    }

    const formData = new FormData();
    formData.append("movie_id", movieId || postDetails.movieId);
    formData.append("review", postDetails.review);
    formData.append("rating", postDetails.rating);
    formData.append("tag", postDetails.tags.join(","));
    formData.append(
      "watch_Date",
      postDetails.watch_date.toISOString().toString()
    );
    formData.append("contains_spoilers", postDetails.spoiler);
    if (postDetails.image) {
      formData.append("reaction_photo", {
        uri: postDetails.image,
        type: "image/jpeg",
        name: "reaction_photo.jpg",
      });
    }
    console.log("Post Data to send:", Array.from(formData));
    if (postId) {
      try {
        // Edita el post
        const response = await EditPostId(postId, formData);
        if (response.success) {
          Alert.alert("Success", "Your post has been edited!");
          // Marcar como favorita solo si la estrella está activada
          if (favorite) {
            try {
              await markMovieAsFavorite(movieId); // Llamar al endpoint
              console.log(`Movie ${movieId} marked as favorite.`);
            } catch (favoriteError) {
              console.error("Error marking movie as favorite:", favoriteError);
              Alert.alert(
                "Warning",
                "Your post was saved, but the movie could not be marked as favorite."
              );
            }
          }
          route.push("homePage"); // Redirigir a la pantalla principal
        } else {
          throw new Error(response.message || "An unexpected error occurred.");
        }
      } catch (error) {
        console.error("Error saving post:", error.message);
        Alert.alert("Error", "Failed to save the post. Please try again.");
      }
    } else {
      try {
        // Crea el post primero
        const response = await createPost(formData);
        if (response.success) {
          Alert.alert("Success", "Your post has been published!");
          // Marcar como favorita solo si la estrella está activada
          if (favorite) {
            try {
              await markMovieAsFavorite(movieId); // Llamar al endpoint
              console.log(`Movie ${movieId} marked as favorite.`);
            } catch (favoriteError) {
              console.error("Error marking movie as favorite:", favoriteError);
              Alert.alert(
                "Warning",
                "Your post was saved, but the movie could not be marked as favorite."
              );
            }
          }
          route.push("homePage"); // Redirigir a la pantalla principal
        } else {
          throw new Error(response.message || "An unexpected error occurred.");
        }
      } catch (error) {
        console.error("Error saving post:", error);
        Alert.alert("Error", "Failed to save the post. Please try again.");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Themes.colors.purpleStrong}
      />
      {/* Header */}
      <Header
        leftIconModule="close"
        title="I watched"
        rightIconModule="check"
        onLeftPress={() => setShowDiscardPopup(true)}
        onRightPress={handleSavePost}
      />

      <DiscardChangesPopup
        visible={showDiscardPopup}
        onCancel={() => setShowDiscardPopup(false)} // Cierra el popup al cancelar
        onDiscard={() => {
          route.push("homePage");
        }}
      />

      <DiscardChangesPopup1
        visible={showDiscardPopup1}
        onDiscard={() => {
          route.push("homePage");
        }}
        title={"Success"}
        text={"Your post has been published and added to my posts"}
        purpleButton={"Okay"}
      />

      {/* Movie Info */}
      <View style={styles.movieInfo}>
        <View style={styles.movieTitleContainer}>
          <Text style={styles.movieTitle}>{postDetails.title || title}</Text>
        </View>
        <View style={styles.movieDateContainer}>
          <Text style={styles.movieDate}>
            {postDetails.year.toISOString().substring(0, 4) || year}
          </Text>
        </View>
        <View style={styles.posterContainer}>
          <Image source={{ uri: posterUrl }} style={styles.poster} />
        </View>
      </View>

      <View style={styles.divider} />

      {/* Date Picker */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateContainer}
      >
        <Text style={styles.dateText}>
          {`Date: ${postDetails.watch_date.toISOString().split("T")[0]}` ||
            date.toDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(false);
            setDate(currentDate);
            setPostDetails((prevDetails) => ({
              ...prevDetails, // Mantener las demás propiedades
              watch_date: currentDate, // Actualizar solo watch_date
            }));
          }}
          style={{ backgroundColor: Themes.colors.grayDark }}
        />
      )}

      <View style={styles.divider} />

      {/* Rating and Favorite */}
      <View style={styles.ratingContainer}>
        <View style={styles.starContainer}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleRatingPress(index)}
            >
              <Text
                style={[
                  styles.star,
                  { color: index < postDetails.rating ? "#6116ec" : "gray" }, // Cambiado a postDetails.rating
                ]}
              >
                ✦
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.exContainer}>
          <TouchableOpacity onPress={() => setFavorite(!favorite)}>
            <Icon name="star" size={32} color={favorite ? "#b39ddb" : "gray"} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ratingTextContainer}>
        <Text style={styles.ratingText}>Rate</Text>
        <Text style={styles.ratingText}>Favorite</Text>
      </View>

      <View style={styles.divider} />

      {/* Review Input */}
      <View>
        <TextInput
          style={styles.textContainerReview}
          placeholder="Write your review..."
          placeholderTextColor="#AAA"
          value={postDetails.review}
          color="#AAA"
          onChangeText={(text) => handleInputChange("review", text)}
          multiline
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.container}>
        {/* Input para agregar nuevos tags */}
        <View style={styles.textContainer}>
          <Text style={styles.ex}>Add tags separated by commas or spaces</Text>
          <TagsSection
            tags={postDetails.tags} // Esto debería ser ["1", "2", "3", "4"]
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
          />
        </View>
      </View>

      {/* Tags Input */}

      <View style={styles.divider} />

      {/* Image Upload */}
      {!postDetails.image && (
        <View style={styles.imageContainer}>
          <Text style={styles.imageTitle}>
            Show people your thoughts or reaction
          </Text>
          <TouchableOpacity onPress={() => setShowPhotoSelectionPopup(true)}>
            <View style={styles.imageUpload}>
              <Icon name="image" size={94 - 16} color="#6116ec" />
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Image Preview */}
      {postDetails.image && (
        <View style={styles.imageContainer}>
          <Text style={styles.imageTitle}>
            Show people your thoughts or reaction
          </Text>
          <TouchableOpacity
            style={styles.imagePreviewContainer}
            onPress={() => setShowPhotoSelectionPopup(true)}
          >
            <View style={styles.imageUpload}>
              <Image
                source={{ uri: postDetails.image }}
                style={styles.imagePreview}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}

      <PhotoSelectionPopup
        visible={showPhotoSelectionPopup}
        onClose={() => setShowPhotoSelectionPopup(false)}
        onTakePhoto={takePhotoFunction}
        onSelectPhoto={selectPhotoFunction}
      />

      <View style={styles.divider} />

      {/* Spoiler Button */}
      <View style={styles.imageContainer}>
        <Text style={styles.spoilerText}>Post contains spoilers</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          setPostDetails((prevDetails) => ({
            ...prevDetails, // Mantiene el resto de las propiedades intactas
            spoiler: !prevDetails.spoiler, // Cambia solo la propiedad spoiler
          }))
        }
        style={styles.spoilerButton}
      >
        <Ionicons
          name="skull"
          size={64 - 8}
          color={postDetails.spoiler ? "#b39ddb" : "gray"} // Aquí usa postDetails.spoiler para ajustar el color
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.grayDark,
  },
  movieInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginHorizontal: 16,
  },
  movieTitleContainer: {
    flexGrow: 0, // Evita que el título crezca más de lo necesario
    flexShrink: 1, // Permite reducir el tamaño si el espacio es limitado
    maxWidth: "65%", // Establece un límite máximo
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  imageTitle: {
    fontSize: 16,
    color: "#AAA",
    marginBottom: 8,
  },
  imageUpload: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
  },
  imagePreviewContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  movieTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    flexWrap: "wrap", // Permite que el texto salte de línea si es necesario
  },
  movieDate: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  movieDateContainer: {
    flexGrow: 0, // Asegura que el contenedor no se expanda
    flexShrink: 0, // Evita que se comprima
    marginLeft: 8, // Espaciado entre el título y el año
  },
  poster: {
    width: 60 - 8,
    height: 90 - 8,
    marginLeft: 8,
  },
  posterContainer: {
    marginLeft: "auto", // Empuja el contenedor del póster hacia la derecha
    justifyContent: "center",
  },
  divider: {
    height: 1,
    backgroundColor: Themes.colors.purpleDetail,
    marginVertical: 8,
  },
  dateContainer: {
    padding: 16,
  },
  dateText: {
    color: "#FFFF",
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  starContainer: {
    flexDirection: "row",
  },
  star: {
    fontSize: 30,
    marginRight: 4,
  },
  textContainerReview: {
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 11,
  },
  textContainer: {
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  ex: {
    marginTop: -8,
    marginBottom: 8,
    color: "#AAA",
  },
  placeholderText: {
    color: "#AAA",
  },
  imageUpload: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  spoilerButton: {
    paddingVertical: 16,
    alignItems: "center",
  },
  spoilerText: {
    color: "#FFF",
    fontSize: 16,
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 12,
  },
  imageTitle: {
    color: "#FFF",
    fontSize: 16,
  },
  ratingTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  ratingText: {
    color: "#FFF",
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    fontWeight: "bold",
  },
  exContainer: {
    marginTop: 4,
  },
});

export default MovieReview;
