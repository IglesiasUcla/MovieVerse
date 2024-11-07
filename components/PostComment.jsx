import { StyleSheet, Text, View, TouchableOpacity,Pressable  } from 'react-native'
import React from 'react'
import { Themes } from '../constants/Themes'
import { heightPercentage, widthPercentage } from '../helpers/commons'
import { Ionicons } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router';

const PostComment = ({userName,postReview,onPressUser}) => {
    const route= useRouter();
    return (
        <Pressable 
        style={styles.containerPost}
        onPress={() => route.push('other_user_information')}>
                    <View style={styles.postHeader}>
                        <View style={styles.userInfo}>
                        <TouchableOpacity onPress={onPressUser}>
                            <Ionicons name="person-circle-outline" size={24} color={Themes.colors.purpleStrong} />
                        </TouchableOpacity>
                            <Text style={styles.username}>{userName}</Text>
                        </View>    
                    </View>
                    <View style={styles.postInfo}>
                        <Text style={styles.postDescription}>
                            {postReview}
                        </Text>
                    </View>
        </Pressable>
    )
}

export default PostComment

const styles = StyleSheet.create({
    containerPost:{
        alignItems:'flex-start',
        borderWidth:1,
        borderBottomColor:'#887c9f',
        paddingTop:10,
    },
    postHeader:{
        marginTop:20,
        justifyContent:'flex-start',
        paddingHorizontal:10,
        alignItems:'baseline',
        marginBottom:10,
    },
    
    userInfo:{
        flexDirection:'row',
        marginLeft:10,
        justifyContent:'flex-end',
    },
    username:{
        color:'white',
        fontSize:18,
        fontWeight:Themes.fonts.medium,
        marginLeft:20,
    },
    postInfo:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:10,
        alignItems:'center',
        paddingHorizontal:30,
        marginHorizontal:10,
    },
    postDescription:{
        color:'white',
        fontSize:14,
        fontWeight:Themes.fonts.minimus,
        width: '100%',
        textAlign:'justify',
        
    }
})