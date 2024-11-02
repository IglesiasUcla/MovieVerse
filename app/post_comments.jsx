import { StyleSheet, Text, View,ScrollView} from 'react-native'
import React from 'react'
import { Themes } from '../constants/Themes'
import Header from '../components/Header'
import PostComment from '../components/PostComment'

const Post_comments = () => {
    return (
        <View style={styles.container}>
            <Header
                title="User's Posts"
                leftIconName="arrow-back"       
                leftIconRoute={"/welcome"}
            />
            <View style={styles.buttomContainer}>
                <View>
                    <Text style={styles.label}>Post</Text>
                </View>
                <View style={styles.labelContent}>
                    <Text style={styles.label}> Comments</Text>
                </View>
            </View>
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
            </ScrollView>
        </View>
    )
}

export default Post_comments

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Themes.colors.screensColor,
    },
    titleTop:{
        color:'white',
        fontSize:30,
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
    commentsContainer:{
        paddingVertical:10,
    }

})