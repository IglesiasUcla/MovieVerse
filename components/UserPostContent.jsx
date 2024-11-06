import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Themes } from '../constants/Themes'
import { heightPercentage, widthPercentage } from '../helpers/commons'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const UserPostContent = ({movieTitle,userName,postReview}) => {
    return (
        <View style={styles.containerPost}>
                    <View style={styles.postHeader}>
                        <Text style={styles.movieTitle}> {movieTitle}</Text>
                        <View style={styles.userInfo}>
                            <Text style={styles.username}>{userName}</Text>
                            <FontAwesome5 name="user-circle" size={30} color={Themes.colors.purpleStrong} />
                        </View>
                    </View>
                    <View style={styles.postInfo}>
                        <View style={styles.movieCover}>
                            {/* <FontAwesome6 name="image" size={90} color={Themes.colors.purpleStrong} /> */}
                        </View>
                        <Text style={styles.postDescription}>
                            {postReview}
                        </Text>
                    </View>
        </View>
    )
}

export default UserPostContent;

const styles = StyleSheet.create({
    containerPost:{
        borderWidth:1,
        borderBottomColor:Themes.colors.purpleDetail,
        paddingTop:10,
    },
    postHeader:{
        flexDirection:'row',
        marginTop:20,
        justifyContent:'space-between',
        paddingHorizontal:20,
        alignItems:'baseline',
        marginBottom:10,
    },
    movieTitle:{
        color:'white',
        fontSize:20,
        fontWeight:Themes.fonts.extrabold,
        marginLeft:5,
    },
    userInfo:{
        flexDirection:'row',
        marginLeft:50,
        justifyContent:'flex-end',
    },
    username:{
        color:'white',
        fontSize:20,
        fontWeight:Themes.fonts.medium,
        marginRight:10,
    },
    postInfo:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:10,
        alignItems:'center',
        paddingHorizontal:10,
    },
    movieCover:{
        backgroundColor:'gray',
        height: heightPercentage(20),
        width: widthPercentage(30),
        alignSelf:'center',
    },
    postDescription:{
        color:'white',
        fontSize:15,
        fontWeight:Themes.fonts.minimus,
        width: '60%',
        textAlign:'justify',
    }
})