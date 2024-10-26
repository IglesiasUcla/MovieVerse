import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Themes } from '../constants/Themes';
import { Ionicons } from '@expo/vector-icons'; 
import { widthPercentage, heightPercentage } from '../helpers/commons';
import { useRouter } from 'expo-router';

const SideMenu = ({ visible, onClose, onSelectOption }) => {
  const route=useRouter();
  const slideAnim = useRef(new Animated.Value(-widthPercentage(60))).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -widthPercentage(60),
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null; // Asegura que el menú no esté en el árbol de componentes cuando no esté visible

  return (
    <View style={styles.overlay}>
      {/* Fondo oscuro */}
      <TouchableOpacity style={styles.backgroundOverlay} onPress={onClose} activeOpacity={1} />

      {/* Menú animado */}
      <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Username</Text>
          <Pressable onPress={onClose}>
            <Ionicons name="person-circle" size={64} color="#6116ec" />
          </Pressable>
        </View>

        {/* Opciones del menú */} 
        <Pressable onPress={() => {route.push('')}} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Popular</Text>
        </Pressable>
        <Pressable onPress={() => {route.push('')}} style={styles.menuItem}> 
          <Text style={styles.menuItemText}>Search</Text>
        </Pressable>
        <Pressable onPress={() => {route.push('')}} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Profile</Text>
        </Pressable>
        <Pressable onPress={() => {route.push('')}} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Posts</Text>
        </Pressable>
        <Pressable onPress={() => {route.push('')}} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Activity</Text>
        </Pressable>
        <Pressable onPress={() => {route.push('')}} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Log out</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: widthPercentage(60),
    height: '100%',
    backgroundColor: Themes.colors.grayDark,
    padding: widthPercentage(5),
    zIndex: 1000,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPercentage(3),
  },
  menuTitle: {
    color: 'white',
    fontSize: heightPercentage(3),
    fontWeight: Themes.fonts.extrabold,
  },
  menuItem: {
    paddingVertical: heightPercentage(2),
  },
  menuItemText: {
    color: 'white',
    fontSize: heightPercentage(2.5),
    fontWeight: Themes.fonts.medium,
  },
});

export default SideMenu;
