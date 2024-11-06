import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Pressable, StatusBar } from 'react-native';
import { Themes } from '../constants/Themes';
import { widthPercentage, heightPercentage } from '../helpers/commons';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TopBar from '../components/TopBar';

const HomePage = () => {
    const route = useRouter();

    // Datos de ejemplo para el carrusel (estos vendrán de la API)
    const [movies, setMovies] = useState([
        { id: '1', title: 'Movie 1' },
        { id: '2', title: 'Movie 2' },
        { id: '3', title: 'Movie 3' },
        { id: '4', title: 'Movie 4' },
    ]);

    // Función para renderizar cada película en el carrusel {/* onPress={() => route.push(`/movie/${item.id}`) */}
    const renderMoviePoster = ({ item }) => (
        <Pressable onPress={() => route.push(`movieScreen`)} style={styles.moviePosterContainer}> 
            <View style={styles.moviePoster} />
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
            <TopBar
                title='Popular' 
                currentTab="movies" 
                onTabChange={()=>{route.push('homePage_post')}}
                onMenuPress={() => console.log('Menu pressed')} 
                onSearchPress={()=>{route.push('search')}} 
            />

            <Pressable onPress={()=>{route.push('searchMovies_mostPopular')}} style={styles.titleContainer} >
                <Text style={styles.titleText}>Popular Movies</Text>
            </Pressable>

            {/* Carrusel de Películas usando FlatList */}
            <FlatList
                style={styles.flatlist}
                horizontal
                data={movies}
                renderItem={renderMoviePoster}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carouselContent}
            />

            {/* Botón flotante */}
            <TouchableOpacity style={styles.floatingButton} onPress={() => route.push('addMovie')}>
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
    },
    titleContainer: {
        alignSelf: 'flex-start',
        top: heightPercentage(18),
        left: widthPercentage(5),
    },
    flatlist: {
        top: heightPercentage(18.5),
    },
    carouselContent: {
        alignSelf: 'flex-start',
        paddingLeft: 16,
        paddingRight: 16, // Espacio derecho para el último elemento
    },
    moviePosterContainer: {
        marginRight: 8, // Espacio entre carteles
    },
    moviePoster: {
        width: widthPercentage(40),
        height: heightPercentage(30),
        backgroundColor: 'gray',
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
