import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import React, { useState } from 'react';
import { Themes } from '../constants/Themes';
import { heightPercentage, widthPercentage } from '../helpers/commons';
import { Ionicons } from '@expo/vector-icons';
import SideMenu from './SideMenu';

const TopBar = ({ title = '', currentTab = 'movies', onTabChange = () => {}, onSearchPress = () => {} }) => {
  const [menuVisible, setMenuVisible] = useState(false); // Estado para controlar la visibilidad del menú

  const handleMenuPress = () => {
    setMenuVisible(true); // Mostrar el menú
  };

  const handleMenuClose = () => {
    setMenuVisible(false); // Cerrar el menú
  };

  const handleOptionSelect = (option) => {
    console.log('Selected option:', option);
    setMenuVisible(false); // Cerrar el menú después de seleccionar una opción
  };

  return (
    <>
      <View style={styles.container}>
        {/* Ícono del menú y título en línea */}
        <View style={styles.menuTitleContainer}>
          <Pressable onPress={handleMenuPress}>
            <Ionicons name="menu" size={28} color="white" />
          </Pressable>
          {title ? (
            <Text style={styles.titleText}>{title}</Text>
          ) : null}
        </View>

        {/* Ícono de búsqueda */}
        <Pressable onPress={onSearchPress}>
          <Ionicons name="search" size={28} color="white" />
        </Pressable>

        {/* Campo de tabs (Movies y Posts) */}
        <View style={styles.tabsContainer}>
          <Pressable onPress={() => onTabChange('movies')} style={[styles.tab, currentTab === 'movies' && styles.activeTab]}>
            <Text style={[styles.tabText, currentTab === 'movies' && styles.activeTabText]}>Movies</Text>
          </Pressable>
          <Pressable onPress={() => onTabChange('posts')} style={[styles.tab, currentTab === 'posts' && styles.activeTab]}>
            <Text style={[styles.tabText, currentTab === 'posts' && styles.activeTabText]}>Posts</Text>
          </Pressable>
        </View>
      </View>

      {/* Menú desplegable */}
      <SideMenu 
          visible={menuVisible} 
          onClose={() => setMenuVisible(false)} 
          onSelectOption={(option) => {
              console.log('Selected option:', option);
              setMenuVisible(false);
          }}
      />
    </>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthPercentage(3),
    paddingTop: heightPercentage(2), 
    paddingBottom: heightPercentage(7), 
    backgroundColor: Themes.colors.purpleStrong,
    position: 'relative',
  },
  menuTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0, 
  },
  titleText: {
    color: 'white',
    fontSize: heightPercentage(3),
    fontWeight: Themes.fonts.extrabold,
    marginLeft: widthPercentage(3),
    marginTop: 0, 
  },
  tabsContainer: {
    position: 'absolute',
    bottom: heightPercentage(1), 
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tab: {
    marginHorizontal: widthPercentage(4),
    paddingBottom: heightPercentage(0.5),
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: Themes.colors.purpleLight,
  },
  tabText: {
    color: 'white',
    fontSize: heightPercentage(2.5),
  },
  activeTabText: {
    fontWeight: 'bold',
  },
});
