import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Themes } from '../constants/Themes';
import { Colors } from '../constants/Colors';
import Header from '../components/Header';

const { fonts } = Themes;

export default function UserPost() {
    const router = useRouter();
    const fonts = Themes.fonts;
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
                    <View style={styles.userPlaceholder} />
                    <View>
                        <Text style={[styles.movieTitle, { color: colors.text }]}>Hereditary</Text>
                        <Text style={[styles.movieYear, { color: Themes.colors.purpleDetail }]}>2018</Text>
                        <View style={styles.starsContainer}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Text key={index} style={[styles.star, { color: Themes.colors.purpleLight }]}>★</Text>
                            ))}
                        </View>
                        <Text style={[styles.date, { color: Themes.colors.purpleDetail }]}>Watched May 11, 2024</Text>
                    </View>
                </View>

                <Text style={[styles.description, { color: colors.text }]}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat.
                </Text>

                <View style={styles.cinemaImage} />

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.likeButton}>
                        <Text style={[styles.likeIcon, { color: Themes.colors.purpleStrong }]}>❤️</Text>
                        <Text style={[styles.likeCount, { color: colors.text }]}>999 Likes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tagButton}>
                        <Text style={styles.tagText}>TAG</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tagButton}>
                        <Text style={styles.tagText}>TAG</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.likesContainer}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <View key={index} style={styles.likeUser} />
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
    userPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Themes.colors.purpleDetail, // Color de fondo para el recuadro
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
        marginTop: 16,
    },
    likeUser: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: Themes.colors.purpleDetail,
        marginRight: 8,
    },
});
