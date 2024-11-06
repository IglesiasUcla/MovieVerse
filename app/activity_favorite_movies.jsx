import { StyleSheet, Text, View,Pressable, ScrollView } from 'react-native'
import React from 'react'
import { Themes } from '../constants/Themes'
import Header from '../components/Header'
import FavoriteMovieContent from '../components/FavoriteMovieContent'
import { useRouter } from 'expo-router'

const Activity_favorite_movies = () => {
    const route= useRouter();
    return (
        <View style={styles.container}>
            <Header
                title="Activity"
                leftIconName="arrow-back"       
                leftIconRoute={"/homePage"}
            />
            {/* tabs button */}
            <View style={styles.buttomContainer}>
                <View>
                    <Pressable 
                        onPress={() => { route.push('activity_liked_posts'); }}
                    >
                        <Text style={styles.label}>Liked Post</Text>
                    </Pressable>
                    
                </View>
                <View style={styles.labelContent}>
                    <Pressable 
                            // onPress={() => { route.push(''); }}
                    >
                            <Text style={styles.label}>Favorite Movies</Text>
                    </Pressable>
                </View>
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
    buttomContainer:{
        flexDirection:'row',
        backgroundColor:Themes.colors.purpleStrong,
        justifyContent:'space-around',
    },
    labelContent:{
        borderBottomColor:Themes.colors.purpleLight,
        borderBottomWidth:2,
    },
    label:{
        fontSize:20,
        color:'white',
        fontWeight:Themes.fonts.medium,
    },
    favoriteContainer:{
        paddingHorizontal:10,
    }
})