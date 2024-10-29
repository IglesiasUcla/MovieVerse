import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

const Header = ({ title, leftIconName, rightIconName, leftIconRoute, rightIconRoute }) => {
  const router = useRouter();

  const handleLeftPress = () => {
    if (leftIconRoute) {
      router.push(leftIconRoute);
    }
  };

  const handleRightPress = () => {
    if (rightIconRoute) {
      router.push(rightIconRoute);
    }
  };

  return (
    <View style={styles.header}>
      {/* Icono izquierdo o espacio vacío */}
      {leftIconName && (
        <TouchableOpacity onPress={handleLeftPress}>
          <Icon name={leftIconName} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}
      {!leftIconName && <View style={styles.iconPlaceholder} />}

      {/* Título */}
      <Text style={styles.title}>{title}</Text>

      {/* Icono derecho o espacio vacío */}
      {rightIconName && (
        <TouchableOpacity onPress={handleRightPress}>
          <Icon name={rightIconName} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}
      {!rightIconName && <View style={styles.iconPlaceholder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#6116EC',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    left: '35%',
    transform: [{ translateX: -50 }],
  },
  iconPlaceholder: {
    width: 24, // Ancho igual al tamaño del icono para mantener el espacio
  },
});

export default Header;
