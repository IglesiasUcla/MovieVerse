import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native'
import React from 'react'
import { Themes } from '../constants/Themes'
import { heightPercentage, widthPercentage } from '../helpers/commons'
import { Ionicons } from '@expo/vector-icons'; 

const PostComment = ({userName,postReview,onPressUser}) => {
    return (
        <View style={styles.containerPost}>
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
        </View>
    )
}

export default PostComment

const styles = StyleSheet.create({
    containerPost:{
        alignItems:'flex-start',
        borderWidth:1,
        borderBottomColor:'gray',
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
        fontSize:20,
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
        fontSize:15,
        fontWeight:Themes.fonts.minimus,
        width: '100%',
        textAlign:'justify',
        
    }
})