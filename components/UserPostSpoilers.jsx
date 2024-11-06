import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Themes } from '../constants/Themes'
import { heightPercentage, widthPercentage } from '../helpers/commons'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import RatingFavorite from './RatingFavorite';

const UserPostSpoilers = ({movieTitle,movieYear,userName,ratingValue}) => {
    return (
        <View style={styles.containerPost}>
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
                        <FontAwesome style={styles.favoriteContainer} name="star" size={28} color={Themes.colors.purpleStrong} />
                    </View>
                    <View style={styles.postInfo}>
                        <View style={styles.movieCover}>
                            {/* <FontAwesome6 name="image" size={90} color={Themes.colors.purpleStrong} /> */}
                        </View>
                        {/* spoiler section */}
                        <View style={styles.spoilerContainer}>
                            <View style={styles.spoilerIcon}>
                                <FontAwesome6 name="face-surprise" size={60} color={Themes.colors.purpleStrong} />
                            </View>
                            <Text style={styles.postDescription}>
                                Post with Spoiler
                            </Text>
                        </View>
                    </View>
        </View>
    )
}

export default UserPostSpoilers;

const styles = StyleSheet.create({
    containerPost:{
        borderWidth:1,
        borderBottomColor:Themes.colors.purpleDetail,
        paddingTop:5,
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
        fontSize:18,
        fontWeight:Themes.fonts.minimus,
        width: '60%',
        textAlign:'center',
    },
    starsContainer: {
        flexDirection: 'row',
        zIndex: 1000,
    },
    spoilerContainer:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:'60%',
        paddingVertical:10,
    },
    spoilerIcon:{
        marginVertical:10,
        marginBottom:20,
    },
})