import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Themes } from '../constants/Themes';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentage, heightPercentage } from '../helpers/commons';
import { useRouter } from 'expo-router';
import { DiscardChangesPopup } from './Popup';

const SideMenu = ({ visible, onClose, onSelectOption, activeOption = 'Popular' }) => {
  const route = useRouter();
  const slideAnim = useRef(new Animated.Value(-widthPercentage(60))).current;
  const [showDiscardPopup, setShowDiscardPopup] = useState(false);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -widthPercentage(60),
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  // Función para verificar si la opción está activa
  const isActive = (option) => option === activeOption;

  return (
    <View style={styles.overlay}>
      {/* Fondo oscuro */}
      <TouchableOpacity style={styles.backgroundOverlay} onPress={onClose} activeOpacity={1} />

      {/* Menú animado */}
      <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.menuHeader}>
          <Ionicons name="person-circle-outline" size={80} color="#6200EE" />
          <Text style={styles.menuTitle}>Username</Text>
        </View>

        {/* Opciones del menú */}
        <Pressable onPress={() => { route.push(''); onSelectOption('Popular'); }} style={[styles.menuItem, isActive('Popular') && styles.activeMenuItem]}>
          <Ionicons name="flame" size={24} color={isActive('Popular') ? Themes.colors.purpleLight : 'gray'} style={[styles.icon, isActive('Popular') && styles.activeMenuIcon]} />
          <Text style={[styles.menuItemText, isActive('Popular') && styles.activeMenuItemText]}>Popular</Text>
        </Pressable>
        <Pressable onPress={() => { route.push('search'); onSelectOption('Search'); }} style={[styles.menuItem, isActive('Search') && styles.activeMenuItem]}>
          <Ionicons name="search" size={24} color={isActive('Search') ? Themes.colors.purpleLight : 'gray'} style={[styles.icon, isActive('Search') && styles.activeMenuIcon]} />
          <Text style={[styles.menuItemText, isActive('Search') && styles.activeMenuItemText]}>Search</Text>
        </Pressable>
        <Pressable onPress={() => { route.push('profile_user'); onSelectOption('Profile'); }} style={[styles.menuItem, isActive('Profile') && styles.activeMenuItem]}>
          <Ionicons name="person" size={24} color={isActive('Profile') ? Themes.colors.purpleLight : 'gray'} style={[styles.icon, isActive('Profile') && styles.activeMenuIcon]} />
          <Text style={[styles.menuItemText, isActive('Profile') && styles.activeMenuItemText]}>Profile</Text>
        </Pressable>
        <Pressable onPress={() => { route.push('myPosts'); onSelectOption('Posts'); }} style={[styles.menuItem, isActive('Posts') && styles.activeMenuItem]}>
          <Ionicons name="document-text" size={24} color={isActive('Posts') ? Themes.colors.purpleLight : 'gray'} style={[styles.icon, isActive('Posts') && styles.activeMenuIcon]} />
          <Text style={[styles.menuItemText, isActive('Posts') && styles.activeMenuItemText]}>Posts</Text>
        </Pressable>
        <Pressable onPress={() => { route.push(''); onSelectOption('Activity'); }} style={[styles.menuItem, isActive('Activity') && styles.activeMenuItem]}>
          <Ionicons name="heart" size={24} color={isActive('Activity') ? Themes.colors.purpleLight : 'gray'} style={[styles.icon, isActive('Activity') && styles.activeMenuIcon]} />
          <Text style={[styles.menuItemText, isActive('Activity') && styles.activeMenuItemText]}>Activity</Text>
        </Pressable>
        <Pressable onPress={() => setShowDiscardPopup(true)} style={[styles.menuItem, isActive('Log out') && styles.activeMenuItem]}>
          <Ionicons name="log-out" size={24} color={isActive('Log out') ? Themes.colors.purpleLight : 'gray'} style={[styles.icon, isActive('Log out') && styles.activeMenuIcon]} />
          <Text style={[styles.menuItemText, isActive('Log out') && styles.activeMenuItemText]}>Log out</Text>
        </Pressable>
      </Animated.View>

      <DiscardChangesPopup
        visible={showDiscardPopup}
        onCancel={() => setShowDiscardPopup(false)} // Cierra el popup al cancelar
        onDiscard={() => {route.push('welcome')}}
        title={'Log Out'}
        text={'Are you sure you want to Log Out?'}
        purpleButton={'Log Out'}
      />

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: widthPercentage(80),
    height: '100%',
    backgroundColor: Themes.colors.grayDark,
    padding: widthPercentage(5),
    zIndex: 1000,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightPercentage(2),
  },
  menuTitle: {
    color: 'white',
    fontSize: heightPercentage(3),
    fontWeight: Themes.fonts.extrabold,
    marginLeft: widthPercentage(2),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: heightPercentage(2),
  },
  menuItemText: {
    color: 'white',
    fontSize: heightPercentage(2.5),
    fontWeight: Themes.fonts.medium,
    marginLeft: widthPercentage(2),
  },
  icon: {
    marginRight: widthPercentage(2),
  },
  activeMenuItem: {
    backgroundColor: Themes.colors.purpleLight + '33', // Fondo ligeramente más claro
    marginHorizontal: -widthPercentage(5)
  },
  activeMenuItemText: {
    color: Themes.colors.purpleLight,
    fontWeight: 'bold',
    marginLeft: widthPercentage(2),
  },
  activeMenuIcon: {
    marginRight: widthPercentage(2),
    marginLeft: widthPercentage(5),
  },
});

export default SideMenu;
