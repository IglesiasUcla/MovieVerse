import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Themes } from '../constants/Themes';
import { DiscardChangesPopup, DiscardChangesPopup1, PhotoSelectionPopup } from '../components/Popup';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const MovieReview = ({ navigation }) => {
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

  const handleRatingPress = (index) => {
    setRating(index + 1);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header leftIconModule="close" title="I watched"  rightIconModule="check" onLeftPress={() => setShowDiscardPopup(true)} onRightPress={() => setShowDiscardPopup1(true)} />
      
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
        <Text style={styles.movieTitle}>Movie A</Text>
        <Text style={styles.movieDate}>2019</Text>
        <Image source={{ uri: 'https://link-to-poster.com' }} style={styles.poster} />
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

      {/* Review Input (Navigation to review screen) */}
      <TouchableOpacity onPress={()=>{route.push('createPost_review')}}>
        <View style={styles.textContainerReview}>
          <Text style={styles.placeholderText}>Add review...</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Tags Input (Navigation to tags screen) */}
      <TouchableOpacity onPress={()=>{route.push('post_tags')}}>
        <View style={styles.textContainer}>
          <Text style={styles.placeholderText}>Add tags...</Text>
        </View>
      </TouchableOpacity>

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
            // Lógica para tomar foto
            setShowPhotoSelectionPopup(false);
            }}
            onSelectPhoto={() => {
            // Lógica para seleccionar foto
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
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieDate: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 8,
  },
  poster: {
    width: 60-30,
    height: 90-30,
    marginLeft: 8,
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
    marginTop: 8,
    marginBottom: 64+32,
    marginHorizontal:16,
  },
  textContainer: {
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
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
