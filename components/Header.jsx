import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

const Header = ({ title, leftIconName, rightIconName, leftIconRoute, rightIconRoute, leftIconModule, rightIconModule, onLeftPress, onRightPress }) => {
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
      {/* Icono izquierdo */}
      {leftIconModule && (
        <TouchableOpacity onPress={onLeftPress}>
          <Icon name={leftIconModule} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      {leftIconName && (
        <TouchableOpacity onPress={handleLeftPress}>
          <Icon name={leftIconName} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      {/* Título */}
      <Text style={styles.title}>{title}</Text>

      {/* Icono derecho */}
      {rightIconName && (
        <TouchableOpacity onPress={handleRightPress}>
          <Icon name={rightIconName} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      {rightIconModule && (
        <TouchableOpacity onPress={onRightPress}>
          <Icon name={rightIconModule} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}
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
    marginLeft: 8, // Ajusta el margen para que esté justo al lado del icono de la flecha
    flex: 1, // Permite que el título ocupe el espacio disponible entre los iconos
    textAlign: 'left', // Alinea el texto a la izquierda
  },
});

export default Header;
