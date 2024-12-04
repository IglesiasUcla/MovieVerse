import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Themes } from '../constants/Themes';
import { DiscardChangesPopup, DiscardChangesPopup1, PhotoSelectionPopup } from '../components/Popup';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import TagsSection from '../components/TagsSection';
import { createPost } from '../helpers/movieverseApi';
import { Alert } from 'react-native';

const MovieReview = ({  }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [rating, setRating] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [image, setImage] = useState(null);
  const [showDiscardPopup, setShowDiscardPopup] = useState(false);
  const [showDiscardPopup1, setShowDiscardPopup1] = useState(false);
  const [showPhotoSelectionPopup, setShowPhotoSelectionPopup] = useState(false);
  const [spoiler, setSpoiler] = useState(false);
  const route = useRouter();
  const { title, year, posterUrl, movieId } = useLocalSearchParams();


  const handleRatingPress = (index) => {
    setRating(index + 1);
  };

  const [postDetails, setPostDetails] = useState({
    review: '',
    tags: [],
    image: null,
  });
  
  const handleInputChange = (field, value) => {
    setPostDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = (newTag) => {
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      tags: [...prevDetails.tags, newTag], // Agregar nuevo tag
    }));
  };

  const handleRemoveTag = (removedTag) => {
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      tags: prevDetails.tags.filter((tag) => tag !== removedTag), // Eliminar tag
    }));
  };

  const handleImageSelect = (image) => {
    handleInputChange('image', image);
  };

  console.log('Movie ID:', movieId); // Verifica si movieId es null o tiene un valor válido

  const handleSavePost = async () => {
    // Validación básica
    if (!postDetails.review.trim()) {
      Alert.alert('Error', 'Please write a review before publishing.');
      return;
    }
    if (rating === 0) {
      Alert.alert('Error', 'Please rate the movie before publishing.');
      return;
    }

    // Construir datos del post

    const postData = {
      movie_id: movieId, // movieId desde los parámetros
      review: postDetails.review,
      rating,
      favorite,
      tag: postDetails.tags, // Aseguramos que los tags estén incluidos
      watch_date: date.toISOString(), // Fecha formateada en ISO
      contains_spoilers: spoiler, // Información de spoilers
      reaction_photo: postDetails.image, // Imagen de reacción
    };

    
  
    try {
      // Llamada al endpoint
      const response = await createPost(postData);
  
      // Validar respuesta
      if (response.success) {
        Alert.alert('Success', 'Your post has been published!');
        route.push('homePage'); // Redirigir a la página principal
      } else {
        throw new Error(response.message || 'An unexpected error occurred.');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      Alert.alert('Error', 'Failed to save the post. Please try again.');
    }
  };  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
      {/* Header */}
      <Header leftIconModule="close" title="I watched"  rightIconModule="check" onLeftPress={() => setShowDiscardPopup(true)} onRightPress={handleSavePost} />
      
      <DiscardChangesPopup
        visible={showDiscardPopup}
        onCancel={() => setShowDiscardPopup(false)} // Cierra el popup al cancelar
        onDiscard={() => {route.push('homePage')}}
      />

      <DiscardChangesPopup1
        visible={showDiscardPopup1}
        onDiscard={() => {route.push('homePage')}}
        title={'Success'}
        text={'Your post has been published and added to my posts'}
        purpleButton={'Okay'}
      />
      
      {/* Movie Info */}
      <View style={styles.movieInfo}>
        <View style={styles.movieTitleContainer}>
          <Text style={styles.movieTitle}>{title}</Text>
        </View>
        <View style={styles.movieDateContainer}>
          <Text style={styles.movieDate}>{year}</Text>
        </View>
        <View style={styles.posterContainer}>
          <Image source={{ uri: posterUrl }} style={styles.poster} />
        </View>
      </View>

      <View style={styles.divider} />

      {/* Date Picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateContainer}>
        <Text style={styles.dateText}>Date: {date.toDateString()}</Text>
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
          }}
          style={{ backgroundColor: Themes.colors.grayDark }}
        />
      )}

      <View style={styles.divider} />

      {/* Rating and Favorite */}
      <View style={styles.ratingContainer}>
        <View style={styles.starContainer}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity key={index} onPress={() => handleRatingPress(index)}>
              <Text style={[styles.star, { color: index < rating ? '#6116ec' : 'gray' }]}>
                ✦
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.exContainer}>
        <TouchableOpacity onPress={() => setFavorite(!favorite)} >
          <Icon name="star" size={32} color={favorite ? '#b39ddb' : 'gray'} />
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
        placeholderTextColor='#AAA'
        value={postDetails.review}
        color= '#AAA'
        onChangeText={(text) => handleInputChange('review', text)}
        multiline
      />
      </View>


      <View style={styles.divider} />

      {/* Tags Input */}
      <View style={styles.textContainer}>
        <Text style={styles.ex}>Add tags separated by commas or spaces</Text>
      <TagsSection
        tags={postDetails.tags}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
      />
      </View>



      <View style={styles.divider} />

      {/* Image Upload */}
      <View style={styles.imageContainer}><Text style={styles.imageTitle}>Show people your thoughts or reaction</Text></View>
      <TouchableOpacity onPress={() => setShowPhotoSelectionPopup(true)}>
        <View style={styles.imageUpload}>
          <Icon name="image" size={94-16} color="#6116ec" />
            <PhotoSelectionPopup
              visible={showPhotoSelectionPopup}
              onClose={() => setShowPhotoSelectionPopup(false)}
              onTakePhoto={() => {
                const image = takePhotoFunction();
                handleImageSelect(image);
                setShowPhotoSelectionPopup(false);
              }}
              onSelectPhoto={() => {
                const image = selectPhotoFunction();
                handleImageSelect(image);
                setShowPhotoSelectionPopup(false);
              }}
            />
        </View>
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Spoiler Button */}
      <View style={styles.imageContainer}><Text style={styles.spoilerText}>Post contains spoilers</Text></View>
      <TouchableOpacity onPress={() => setSpoiler(!spoiler)} style={styles.spoilerButton}>
        <Ionicons name="skull" size={64-8} color={spoiler ? '#b39ddb' : 'gray'}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.grayDark,
  },
  movieInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginHorizontal: 16,
  },
  movieTitleContainer: {
    flexGrow: 0, // Evita que el título crezca más de lo necesario
    flexShrink: 1, // Permite reducir el tamaño si el espacio es limitado
    maxWidth: '65%', // Establece un límite máximo
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    flexWrap: 'wrap', // Permite que el texto salte de línea si es necesario
  },
  movieDate: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  movieDateContainer: {
    flexGrow: 0, // Asegura que el contenedor no se expanda
    flexShrink: 0, // Evita que se comprima
    marginLeft: 8, // Espaciado entre el título y el año
  },
  poster: {
    width: 60-8,
    height: 90-8,
    marginLeft: 8,
  },
  posterContainer: {
    marginLeft: 'auto', // Empuja el contenedor del póster hacia la derecha
    justifyContent: 'center',
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
    color: '#FFFF',
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 30,
    marginRight: 4,
  },
  textContainerReview: {
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 11,
  },
  textContainer: {
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  ex: {
    marginTop: -8,
    marginBottom: 8,
    color: '#AAA'
  },
  placeholderText: {
    color: '#AAA',
  },
  imageUpload: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  spoilerButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  spoilerText: {
    color: '#FFF',
    fontSize: 16,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  imageTitle: {
    color: '#FFF',
    fontSize: 16,
  },
  ratingTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  ratingText: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: 'bold',
  },
  exContainer: {
    marginTop: 4,
  }
});

export default MovieReview;
