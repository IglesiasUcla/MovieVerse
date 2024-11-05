import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentage,widthPercentage } from '../helpers/commons'
import { Themes } from '../constants/Themes'
import FontAwesome from '@expo/vector-icons/FontAwesome';


const FavoriteMovieContent = ({movieTitle,movieYear,movieAuthor}) => {
    return (
        <View style={styles.movieContainer}>
                <View style={styles.movieCover}>
                </View>
                <View style={styles.movieInfo}>
                    <View style={styles.textInfo}>
                            <Text style={styles.movieTitle}>{movieTitle} </Text>
                            <Text style={styles.movieYear}>{movieYear}</Text>
                    </View>
                    <Text style={styles.movieAuthor}>{movieAuthor}</Text>   
                </View>
                <View style={styles.movieFavorite}>
                    <FontAwesome name="star" size={50} color={Themes.colors.purpleStrong} />
                </View>
        </View>
    )
}

export default FavoriteMovieContent

const styles = StyleSheet.create({
    movieContainer:{
        flexDirection:'row',
        paddingVertical:8,
        borderBottomColor:Themes.colors.purpleDetail,
        borderBottomWidth:1,
    },
    movieCover:{
        backgroundColor:'gray',
        height: heightPercentage(20),
        width: widthPercentage(30),
        alignSelf:'center',
        marginLeft:10,
    },
    movieInfo:{
        flexDirection:'column',
        justifyContent:'center',
        marginBottom:10,
        alignItems:'flex-start',
        paddingHorizontal:15,
    },
    textInfo:{
        flexDirection:'row',
        
    },
    movieTitle:{
        color:'white',
        fontSize:20,
        fontWeight:Themes.fonts.bold,
        textAlign:'justify',
    },
    movieYear:{
        color:'white',
        fontSize:20,
        fontWeight:Themes.fonts.medium,
        textAlign:'justify',
    },
    movieAuthor:{
        color:'white',
        fontSize:20,
        fontWeight:Themes.fonts.minimus,
        // width: '40%',
        textAlign:'justify',
    },
    movieFavorite:{
        justifyContent:'center',
        alignSelf:'center',
        paddingHorizontal:20,
    },
})