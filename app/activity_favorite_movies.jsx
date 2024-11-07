import { StyleSheet, Text, View,Pressable, ScrollView } from 'react-native'
// import React from 'react'
import { Themes } from '../constants/Themes'
import Header from '../components/Header'
import FavoriteMovieContent from '../components/FavoriteMovieContent'
import { useRouter } from 'expo-router'
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar'

const Activity_favorite_movies = () => {
    const [currentTab, setCurrentTab] = useState('activity_favorite_movies');
    const router = useRouter();

    // Función para cambiar de pestaña y navegar a la pantalla correspondiente
    const onTabChange = (tab) => {
        setCurrentTab(tab);
        if (tab === 'activity_liked_posts') {
            router.push('/activity_liked_posts'); // Navega a la pantalla de Liked Posts
        } else if (tab === 'activity_favorite_movies') {
            router.push('/activity_favorite_movies'); // Navega a la pantalla de Favorite Movies
        }
    };
    
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Header
                title="Activity"
                leftIconName="arrow-back"       
                leftIconRoute={"/homePage"}
            />
            {/* tabs button */}
            {/* Container tabs */}
            <View style={styles.tabContainer}>
                <Pressable
                onPress={() => onTabChange('activity_liked_posts')}
                style={[styles.tab, currentTab === 'activity_liked_posts' && styles.tabActive]}
                >
                <Text style={[styles.tabText, currentTab === 'activity_liked_posts' && styles.activeTabText]}>
                    Liked Posts
                </Text>
                </Pressable>
                <Pressable
                onPress={() => onTabChange('activity_favorite_movies')}
                style={[styles.tab, currentTab === 'activity_favorite_movies' && styles.tabActive]}
                >
                <Text style={[styles.tabText, currentTab === 'activity_favorite_movies' && styles.activeTabText]}>
                    Favorite Movies
                </Text>
                </Pressable>
            </View>
            <ScrollView style={styles.favoriteContainer}>
                <FavoriteMovieContent
                movieTitle="Parasite"
                movieYear="2019"
                movieAuthor="Bong Joon-Ho"
                />
                <FavoriteMovieContent
                movieTitle="Parasite"
                movieYear="2019"
                movieAuthor="Bong Joon-Ho"
                />
                <FavoriteMovieContent
                movieTitle="Parasite"
                movieYear="2019"
                movieAuthor="Bong Joon-Ho"
                />
                <FavoriteMovieContent
                movieTitle="Parasite"
                movieYear="2019"
                movieAuthor="Bong Joon-Ho"
                />
                <FavoriteMovieContent
                movieTitle="Parasite"
                movieYear="2019"
                movieAuthor="Bong Joon-Ho"
                />
                <FavoriteMovieContent
                movieTitle="Parasite"
                movieYear="2019"
                movieAuthor="Bong Joon-Ho"
                />
            </ScrollView>
        </View>
    )
}

export default Activity_favorite_movies

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Themes.colors.screensColor,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: Themes.colors.purpleStrong,
        justifyContent: 'space-around',
    },
    tab: {
        paddingVertical: 12,
    },
    tabActive: {
        borderBottomColor: Themes.colors.purpleLight,
        borderBottomWidth: 2,
    },
    tabText: {
        fontSize: 18,
        color: 'white',
        fontWeight: Themes.fonts.medium,
    },
    
    favoriteContainer:{
        paddingHorizontal:10,
    }
})