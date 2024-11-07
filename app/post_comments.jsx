import { StyleSheet, Text, View,ScrollView,Pressable, StatusBar} from 'react-native'
import React from 'react'
import { Themes } from '../constants/Themes'
import Header from '../components/Header'
import PostComment from '../components/PostComment'
import { useRouter } from 'expo-router'

const Post_comments = () => {
    const route = useRouter();
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
            <Header
                title="User's Post"
                leftIconName="arrow-back"       
                leftIconRoute={"search_posts"}
            />
            {/* tabs button */}
            <View style={styles.buttomContainer}>
                <View>
                    <Pressable 
                        onPress={() => route.push('post')}
                    >
                        <Text style={styles.label}>Post</Text>
                    </Pressable>
                    
                </View>
                <View style={styles.labelContent}>
                    <Pressable 
                            onPress={() => console.log('pressed') }
                    >
                            <Text style={styles.label}>Comments</Text>
                    </Pressable>
                </View>
            </View> 
            <ScrollView style={styles.commentsContainer}>
                <PostComment
                    userName="User"
                    postReview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat."
                />
                <PostComment
                    userName="User"
                    postReview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat."
                />
                <PostComment
                    userName="User"
                    postReview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat."
                />
                <PostComment
                    userName="User"
                    postReview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat."
                />
                <PostComment
                    userName="User"
                    postReview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat."
                />
                <PostComment
                    userName="User"
                    postReview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat."
                />
                <PostComment
                    userName="User"
                    postReview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat."
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