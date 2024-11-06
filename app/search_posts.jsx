import { StyleSheet, Text, View,TextInput,ScrollView } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import UserPostContent from '../components/UserPostContent'
import { Themes } from '../constants/Themes'
import Ionicons from '@expo/vector-icons/Ionicons';
import { heightPercentage, widthPercentage } from '../helpers/commons'
import InputSearch from '../components/InputSearch'
import UserPostSpoilers from '../components/UserPostSpoilers'

const Search_posts = () => {
    return (
        <View style={styles.container}>
            <Header
                title="Search Posts"
                leftIconName="arrow-back"       
                leftIconRoute={"/search"}
            />
            <InputSearch
                textSearch="search post"
            />
            
            <Text style={styles.titleTop}>Popular Posts</Text>
            <ScrollView style={styles.postContainer}>
                {/* normal post */}
                <UserPostContent
                    movieTitle="Movie title"
                    movieYear="2020"
                    ratingValue={5}
                    userName="userName"
                    postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                />
                <UserPostContent
                    movieTitle="Movie title"
                    movieYear="2020"
                    ratingValue={3}
                    userName="userName"
                    postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                />
                <UserPostContent
                    movieTitle="Movie title"
                    movieYear="2020"
                    ratingValue={1}
                    userName="userName"
                    postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                />
                {/* post with spoiler */}
                <UserPostSpoilers
                    movieTitle="Movie title"
                    movieYear="2020"
                    ratingValue={5}
                    userName="userName"
                />
                <UserPostContent
                    movieTitle="Movie title"
                    movieYear="2020"
                    ratingValue={4}
                    userName="userName"
                    postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                />
                <UserPostContent
                    movieTitle="Movie title"
                    movieYear="2020"
                    ratingValue={2}
                    userName="userName"
                    postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                />
                <UserPostSpoilers
                    movieTitle="Movie title"
                    movieYear="2020"
                    ratingValue={2}
                    userName="userName"
                />
            </ScrollView>
        
        </View>
    )
    }

export default Search_posts

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Themes.colors.screensColor,
    }, 
    titleTop:{
        color:'white',
        fontSize:30,
        fontWeight:Themes.fonts.bold,
        paddingHorizontal:30,
    },
    
    postContainer:{
        paddingVertical:15,
    }
})