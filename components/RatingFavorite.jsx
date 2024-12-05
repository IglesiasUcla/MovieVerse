import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RatingFavorite = ({ rating = 0, isFavorite = false, showFavorite = true, starSize = 14, iconSize = 12 }) => {
  // Validar y normalizar el rating
  const safeRating = Math.min(Math.max(rating, 0), 5); // Clampa el rating entre 0 y 5
  const fullStars = Math.floor(safeRating);
  const partialStar = safeRating - fullStars;

  return (
    <View style={styles.ratingFavoriteContainer}>
      <View style={styles.starContainer}>
        {/* Renderizamos las estrellas llenas */}
        {[...Array(fullStars)].map((_, index) => (
          <Text key={index} style={[styles.star, { color: '#6116ec', fontSize: starSize }]}>
            ✦
          </Text>
        ))}

        {/* Renderizamos la estrella parcial si hay fracción decimal */}
        {partialStar > 0 && (
          <View style={[styles.partialStarContainer, { width: starSize, height: starSize }]}>
            <Text style={[styles.star, { color: 'gray', fontSize: starSize, position: 'absolute' }]}>
              ✦
            </Text>
            <View style={{ width: partialStar * starSize, position: 'absolute', height: '125%' }}>
              <Text style={[styles.star, { color: '#6116ec', fontSize: starSize }]}>
                ✦
              </Text>
            </View>
          </View>
        )}

        {/* Relleno con estrellas grises si el rating es menor que 5 */}
        {[...Array(5 - Math.ceil(safeRating))].map((_, index) => (
          <Text key={fullStars + index + 1} style={[styles.star, { color: 'gray', fontSize: starSize }]}>
            ✦
          </Text>
        ))}
      </View>

      {/* Ícono de favorito, opcional */}
      {showFavorite && (
        <Icon
          name="star"
          size={iconSize}
          color={isFavorite ? '#b39ddb' : 'gray'}
          style={styles.favoriteIcon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingFavoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 1,
  },
  partialStarContainer: {
    position: 'relative', // Asegura que los hijos se posicionen correctamente
  },
  favoriteIcon: {
    marginLeft: 2,
    marginTop: 3,
  },
});

export default RatingFavorite;
