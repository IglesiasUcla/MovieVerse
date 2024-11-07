import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Themes } from '../constants/Themes'
import { heightPercentage, widthPercentage } from '../helpers/commons'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import RatingFavorite from './RatingFavorite';
import { useRouter } from 'expo-router';

const UserPostContent = ({movieTitle,movieYear,userName,postReview,ratingValue,isFavorite = false }) => {
    const [isFavoriteVisible,setFavoriteVisible] = useState(false);
    const route = useRouter();
    return (
        <Pressable 
        style={styles.containerPost}
        onPress={()=>route.push('post')}>
                    <View style={styles.postHeader}>
                        <Text style={styles.movieTitle}> {movieTitle}</Text>
                        <Text style={styles.movieYear}>{movieYear}</Text>
                        <View style={styles.userInfo}>
                            <Text style={styles.username}>{userName}</Text>
                            <FontAwesome5 name="user-circle" size={30} color={Themes.colors.purpleStrong} />
                        </View>
                    </View>
                    <View style={styles.ratingContainer}>
                        <RatingFavorite style={styles.starsContainer}
                            rating={ratingValue}
                            showFavorite={false}
                            starSize={28}    // Ajusta el tamaño si es necesario
                        />
                        {isFavorite && (
                            <TouchableOpacity
                            onPress={() =>setFavoriteVisible(!isFavoriteVisible)}
                            >
                                <FontAwesome 
                                style={styles.favoriteContainer} 
                                name="star" size={28} 
                                color={isFavoriteVisible ? Themes.colors.purpleStrong : Themes.colors.grayMid} 
                                />
                            </TouchableOpacity>
                        )
                        }
                        
                    </View>
                    <View style={styles.postInfo}>
                        <View style={styles.movieCover}>
                            {/* <FontAwesome6 name="image" size={90} color={Themes.colors.purpleStrong} /> */}
                        </View>
                        <Text style={styles.postDescription}>
                            {postReview}
                        </Text>
                    </View>
        </Pressable>
    )
}

export default UserPostContent;

const styles = StyleSheet.create({
    containerPost:{
        borderWidth:1,
        borderBottomColor:Themes.colors.purpleDetail,
        paddingTop:10,
        paddingBottom:10,
    },
    postHeader:{
        flexDirection:'row',
        marginTop:20,
        justifyContent:'space-between',
        paddingHorizontal:20,
        alignItems:'baseline',
        marginBottom:5,
    },
    movieTitle:{
        color:'white',
        fontSize:20,
        fontWeight:Themes.fonts.extrabold,
        marginLeft:5,
    },
    movieYear:{
        color:'white',
        fontSize:20,
        fontWeight:Themes.fonts.medium,
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
    ratingContainer:{
        flexDirection:'row',
        paddingLeft:20,
        alignItems:'center',
    },
    favoriteContainer:{
        marginHorizontal:10,
        marginVertical:3,
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
    },
    starsContainer: {
        flexDirection: 'row',
        zIndex: 1000,
    },
})