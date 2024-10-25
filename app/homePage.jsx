import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Themes } from '../constants/Themes';
import { widthPercentage, heightPercentage } from '../helpers/commons';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TopBar from '../components/TopBar';
import { StatusBar } from 'react-native';

const HomePage = () => {
    const route = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
            <TopBar
                title='Popular' 
                currentTab="movies" 
                onTabChange={(tab) => console.log('Switching to:', tab)} 
                onMenuPress={() => console.log('Menu pressed')} 
                onSearchPress={() => console.log('Search pressed')} 
            />

            <Text style={styles.titleText}>Popular Movies</Text>

            {/* Carrusel de Películas (inicialmente con datos estáticos) */}
            <ScrollView horizontal style={styles.carousel}>
                {/* Aquí agregarías tus carteles estáticos o posteriormente los de la API */}
                <View style={styles.moviePoster}></View>
                <View style={styles.moviePoster}></View>
                <View style={styles.moviePoster}></View>
            </ScrollView>

            {/* Botón flotante */}
            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('CreatePost')}>
                <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.colors.grayDark,
        
    },
    titleText: {
        color: 'white',
        fontSize: heightPercentage(3),
        fontWeight: Themes.fonts.medium,
        marginLeft: widthPercentage(2),
        marginTop: 144-32,
        paddingLeft:16-10.8, 
    },
    carousel: {
        flexDirection: 'row',
        marginBottom: 16,
        marginTop: 8,
        paddingLeft:16,
        paddingRight:16,
        maxHeight: 235.2,
    },
    moviePoster: {
        width: widthPercentage(40),
        height: heightPercentage(30),
        backgroundColor: 'gray',
        marginRight: 8,
        borderRadius: 10,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: Themes.colors.purpleStrong,
        borderRadius: 50,
        padding: 16,
    },
});

export default HomePage;
