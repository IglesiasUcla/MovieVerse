{/*  */}
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import DateTimePicker from '@react-native-community/datetimepicker'; // Selección de fecha
import ImagePicker from 'react-native-image-picker'; // Selector de imagen

const MovieReview = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [rating, setRating] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [review, setReview] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [containsSpoilers, setContainsSpoilers] = useState(false);

  // Funciones para manejar los eventos

  return (
    <View style={styles.container}>
      
      <Header title="I watched" leftIconName="close" rightIconName="check" />

      
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>Parasite 2019</Text>
        <Image source={{ uri: 'https://link-to-poster.com' }} style={styles.poster} />
      </View>

      
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
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
        />
      )}

      
      <View style={styles.ratingContainer}>
        
        <TouchableOpacity onPress={() => setFavorite(!favorite)}>
          <Icon name="star" size={30} color={favorite ? 'purple' : 'gray'} />
        </TouchableOpacity>
      </View>

      
      <TextInput
        style={styles.reviewInput}
        placeholder="Add review..."
        placeholderTextColor="#AAA"
        value={review}
        onChangeText={setReview}
        multiline
      />

      
      <TextInput
        style={styles.tagsInput}
        placeholder="Add tags..."
        placeholderTextColor="#AAA"
        value={tags}
        onChangeText={setTags}
      />

      
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.imageUpload}>
          <Icon name="image" size={30} color="purple" />
        </View>
      </TouchableOpacity>

      
      <TouchableOpacity onPress={() => setContainsSpoilers(!containsSpoilers)} style={styles.spoilerButton}>
        <Text style={styles.spoilerText}>Post with spoilers</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({ 
  // Define aquí los estilos para los componentes
});

export default MovieReview; 
