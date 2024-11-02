import { StyleSheet, Text, View,TextInput,ScrollView } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import UserPostContent from '../components/UserPostContent'
import { Themes } from '../constants/Themes'
import Ionicons from '@expo/vector-icons/Ionicons';
import { heightPercentage, widthPercentage } from '../helpers/commons'

const Search_posts = () => {
    return (
        <View style={styles.container}>
            <Header
                title="Search Posts"
                leftIconName="arrow-back"       
                leftIconRoute={"/welcome"}
            />
            <View style={styles.inputContainer}>
                
                <TextInput style={styles.inputSearch}
                    placeholder='Search a post'
                    placeholderTextColor={'#4d4d4d'}
                    textAlign='center'
                    fontSize={15}
                />
                <Ionicons name="search" size={35} color="white" />
            </View>
            <Text style={styles.titleTop}>Popular Posts</Text>
            <ScrollView style={styles.postContainer}>
                <UserPostContent
                    movieTitle="Movie title"
                    userName="userName"
                    postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                />
                <UserPostContent
                    movieTitle="Movie title"
                    userName="userName"
                    postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                />
                <UserPostContent
                    movieTitle="Movie title"
                    userName="userName"
                    postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                />
                <UserPostContent
                    movieTitle="Movie title"
                    userName="userName"
                    postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                />
                <UserPostContent
                    movieTitle="Movie title"
                    userName="userName"
                    postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
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
    inputContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:10,
        paddingHorizontal:20,
    },
    inputSearch:{
        color:'white',
        alignContent:'center',
        backgroundColor:'gray',
        borderRadius:18,
        width:widthPercentage(75),
        height:heightPercentage(6),
        marginRight:20,
    },
    postContainer:{
        paddingVertical:15,
    }
})