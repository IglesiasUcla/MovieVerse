import { StyleSheet, Text, View,SafeAreaView,ScrollView, Image } from 'react-native'
import React from 'react'
import { Themes } from '../constants/Themes'
import { useRouter } from 'expo-router';
import UserPostContent from '../components/UserPostContent';
import TopBar from '../components/TopBar';
import { StatusBar } from 'react-native';

const HomePage_post = () => {
    const route= useRouter();
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
            <StatusBar style="dark" />
            <TopBar
                title='Popular' 
                currentTab="posts" 
                onTabChange={() => route.push('homePage')} 
                onMenuPress={() => console.log('Menu pressed')} 
                onSearchPress={() => route.push('search')} 
            />
            <View style={styles.body}>
                <Text style={styles.titleTop}>Popular Posts</Text>
                <ScrollView style={styles.containerPosts}>
                    {/* component test */}
                    <UserPostContent
                        movieTitle="Movie Title"
                        userName= "userName"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae, reiciendis, similique labore repellendus omnis aliquam dolorum laboriosam? Quam!"
                    />
                    <UserPostContent
                        movieTitle="Movie Title"
                        userName= "user2"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae, reiciendis, similique labore repellendus omnis aliquam dolorum laboriosam? Quam!"
                    />
                    <UserPostContent
                        movieTitle="Movie Title"
                        userName= "user3"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae, reiciendis, similique labore repellendus omnis aliquam dolorum laboriosam? Quam!"
                    />
                    <UserPostContent
                        movieTitle="Movie Title"
                        userName= "user4"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae, reiciendis, similique labore repellendus omnis aliquam dolorum laboriosam? Quam!"
                    />
                </ScrollView>
            </View>
            
        </View>
    )
}

export default HomePage_post

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Themes.colors.screensColor,
    },
    titleTop:{
        color:'white',
        fontSize:30,
        fontWeight:Themes.fonts.medium,
        marginHorizontal:20,
        paddingTop:10,
    },
    containerPosts:{
        paddingVertical:20,
    },
    
})