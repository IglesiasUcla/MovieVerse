import React from "react";
import { StyleSheet, Text, View,ScrollView , SafeAreaView} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Header from "../components/Header";
import { Themes } from "../constants/Themes";
import InputSearch from "../components/InputSearch";
import PostComment from "../components/PostComment";


const Search_user =() => {
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar style='dark'/> 
            <View>
                <Header 
                    title="Search User"
                    leftIconName="arrow-back"    
                    leftIconRoute={"/welcome"}
                />  
                <InputSearch
                    textSearch="search user"
                />
                <ScrollView style={styles.commentsContainer}>
                    <PostComment
                        userName="userName"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                    />
                    <PostComment
                        userName="userName"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                    />
                    <PostComment
                        userName="userName"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                    />
                    <PostComment
                        userName="userName"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                    />
                    <PostComment
                        userName="userName"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                    />
                    <PostComment
                        userName="userName"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                    />
                    <PostComment
                        userName="userName"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                    />

                </ScrollView>
            </View>
                
        </SafeAreaView>
            
)}
export default Search_user

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.colors.screensColor ,
    },
    commentsContainer:{
        paddingVertical:10,
    }

})