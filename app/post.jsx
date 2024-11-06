import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Themes } from '../constants/Themes';
import { Colors } from '../constants/Colors';
import Header from '../components/Header';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
                        <View style={styles.starsContainer}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Text key={index} style={[styles.star, { color: Themes.colors.purpleLight }]}>★</Text>
                            ))}
                        </View>
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
                            style={styles.likeUser} // Se agrega margen entre los iconos
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    backButton: {
        fontSize: 24,
        color: 'white',
        marginRight: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: fonts.bold,
        color: 'white',
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
    movieInfo: {
        marginTop: 8,  // Da un pequeño espacio entre el nombre de usuario y la información de la película
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
        backgroundColor: Themes.colors.grayMid, // Fondo para el recuadro de imagen de cine
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
    likeIcon: {
        fontSize: 24,
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
        flexWrap: 'wrap',  // Permite que los iconos se acomoden en varias líneas si es necesario
    },
    likeUser: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Themes.colors.grayDark,
        marginRight: 12, // Esto agrega la separación entre los iconos
        marginBottom: 8, // Añade separación vertical entre las filas de iconos
    },
    movieAndPosterContainer: {
        flexDirection: 'row',  // Coloca la información y el poster en fila horizontal
        marginTop: 16,
    },
    movieInfoContainer: {
        flex: 1,  // Hace que ocupe el espacio disponible
        marginRight: 16,  // Deja espacio entre la información y el poster
    },
    posterContainer: {
        width: 120, // Tamaño del poster
        height: 180, // Lo hacemos vertical
        borderRadius: 8,
        overflow: 'hidden',  // Asegura que la imagen no se desborde
        backgroundColor: Themes.colors.grayMid,  // Fondo gris para simular el poster
        justifyContent: 'center',
        alignItems: 'center',
    },
    posterImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ddd',  // Esto puede ser una imagen de fondo si quieres
        borderRadius: 8,
    },
});
