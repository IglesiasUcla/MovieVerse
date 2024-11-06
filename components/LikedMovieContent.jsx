import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentage, widthPercentage } from '../helpers/commons'
import { Themes } from '../constants/Themes'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const LikedMovieContent = ({ userName, postReview }) => {
    return (
        <View style={styles.containerPost}>
            <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                    <FontAwesome name="user-circle" size={40} color={Themes.colors.purpleStrong} />
                    <Text style={styles.username}>{userName}</Text>
                    <FontAwesome name="heart" size={30} color={Themes.colors.purpleStrong} style={styles.heartIcon} solid />
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

export default LikedMovieContent

const styles = StyleSheet.create({
    containerPost: {
        alignItems: 'flex-start',
        borderWidth: 1,
        borderBottomColor: 'gray',
        paddingTop: 10,
    },
    postHeader: {
        marginTop: 20,
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        alignItems: 'baseline',
        marginBottom: 10,
    },
    userInfo: {
        flexDirection: 'row',
        marginLeft: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingRight: 10, // Para que el corazón esté pegado al margen derecho
    },
    username: {
        color: 'white',
        fontSize: 20,
        fontWeight: Themes.fonts.medium,
        marginLeft: 20,
    },
    postInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        alignItems: 'center',
        paddingHorizontal: 30,
        marginHorizontal: 10,
    },
    postDescription: {
        color: 'white',
        fontSize: 15,
        fontWeight: Themes.fonts.minimus,
        width: '100%',
        textAlign: 'justify',
    },
    heartIcon: {
        marginLeft: 'auto', // Asegura que el corazón esté alineado a la derecha
    },
})
