import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Themes } from '../constants/Themes';
import { Colors } from '../constants/Colors';
import Header from '../components/Header';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import RatingFavorite from '../components/RatingFavorite'; // Importa el componente RatingFavorite

const { fonts } = Themes;

export default function Post() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme]; // Selecciona colores dependiendo del modo (light o dark)

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Encabezado */}
            <Header
                title="User’s Post"
                leftIconName="arrow-back"
                leftIconRoute="/search_posts" // Regresa a la pantalla anterior
            />

            <View style={[styles.tabContainer, { backgroundColor: Themes.colors.purpleStrong }]}>
                {/* Botón de "Post" (activo, no navega) */}
                <TouchableOpacity onPress={() => router.push('/user_post')}>
                    <Text style={styles.tabActive}>Post</Text>
                </TouchableOpacity>
                
                {/* Botón de "Comments" (redirige a post_comments) */}
                <TouchableOpacity onPress={() => router.push('/post_comments')}>
                    <Text style={[styles.tab, { color: colors.icon }]}>Comments</Text>
                </TouchableOpacity>
            </View>

            {/* Contenido del post */}
            <View style={styles.postContent}>
                <View style={styles.userInfo}>
                    {/* Recuadro en lugar de imagen */}
                    <View style={styles.avatarContainer}>
                        <FontAwesome name="user-circle" size={40} color={Themes.colors.purpleStrong} />
                        {/* Nombre de usuario al lado del icono */}
                        <Text style={[styles.movieTitle, { color: colors.text, marginLeft: 8 }]}>User</Text>
                    </View>
                </View>

                {/* Contenedor de película y poster en fila horizontal */}
                <View style={styles.movieAndPosterContainer}>
                    {/* Información de la película a la izquierda */}
                    <View style={styles.movieInfoContainer}>
                        <Text style={[styles.movieTitle, { color: colors.text }]}>Hereditary</Text>
                        <Text style={[styles.movieYear, { color: Themes.colors.purpleDetail }]}>2018</Text>

                        {/* Integración del componente RatingFavorite */}
                        <RatingFavorite rating={4.6} isFavorite={true} />

                        <Text style={[styles.date, { color: Themes.colors.purpleDetail }]}>Watched May 11, 2024</Text>
                    </View>

                    {/* Recuadro del poster a la derecha */}
                    <View style={styles.posterContainer}>
                        <View style={styles.posterImage} />
                    </View>
                </View>

                <Text style={[styles.description, { color: colors.text }]}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat.
                </Text>

                <View style={styles.cinemaImage} />

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.likeButton}>
                        <FontAwesome name="heart" size={30} color={Themes.colors.purpleDetail} style={styles.heartIcon} solid />
                        <Text style={[styles.likeCount, { color: colors.text }]}>999 Likes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tagButton}>
                        <Text style={styles.tagText}>TAG</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tagButton}>
                        <Text style={styles.tagText}>TAG</Text>
                    </TouchableOpacity>
                </View>

                {/* Separación entre los iconos */}
                <View style={styles.likesContainer}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <FontAwesome
                            key={index}
                            name="user-circle"
                            size={40}
                            color={Themes.colors.purpleStrong}
                            style={styles.likeUser}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tab: {
        paddingVertical: 8,
        fontSize: 16,
    },
    tabActive: {
        color: 'white',
        paddingVertical: 8,
        fontSize: 16,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
    },
    postContent: {
        padding: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: fonts.semibold,
    },
    movieYear: {
        fontSize: 14,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    star: {
        fontSize: 16,
    },
    date: {
        fontSize: 14,
    },
    description: {
        fontSize: 14,
        marginVertical: 16,
    },
    cinemaImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        backgroundColor: Themes.colors.grayMid,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    likeCount: {
        marginLeft: 8,
    },
    tagButton: {
        backgroundColor: Themes.colors.purpleStrong,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginHorizontal: 4,
    },
    tagText: {
        color: 'white',
        fontSize: 14,
    },
    likesContainer: {
        flexDirection: 'row',
        marginTop: 22,
        flexWrap: 'wrap',
    },
    likeUser: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Themes.colors.grayDark,
        marginRight: 12,
        marginBottom: 8,
    },
    movieAndPosterContainer: {
        flexDirection: 'row',
        marginTop: 16,
    },
    movieInfoContainer: {
        flex: 1,
        marginRight: 16,
    },
    posterContainer: {
        width: 120,
        height: 180,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: Themes.colors.grayMid,
        justifyContent: 'center',
        alignItems: 'center',
    },
    posterImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ddd',
        borderRadius: 8,
    },
});


