import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, useColorScheme, StatusBar, ActivityIndicator, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { Themes } from '../constants/Themes';
import { Colors } from '../constants/Colors';
import Header from '../components/Header';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons'; 
import RatingFavorite from '../components/RatingFavorite';
import movieverseApi from '../helpers/movieverseApi';
import tmdbApi from '../helpers/tmdbApi';

const { fonts } = Themes;

export default function Post() {
    const { postId } = useLocalSearchParams(); // Leer el parámetro postId
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme]; // Selecciona colores dependiendo del modo (light o dark)

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                // Solicitud al backend para obtener los datos del post
                const postResponse = await movieverseApi.get(`/posts/${postId}`);
                const postDetails = postResponse.data.post;

                // Solicitud a TMDB para obtener información adicional de la película
                const movieResponse = await tmdbApi.get(`/movie/${postDetails.movie_id}`);
                const movieDetails = movieResponse.data;

                // Combinar datos del post y detalles de la película
                setPost({ ...postDetails, movie: movieDetails });

                console.log('post data:', postDetails)

            } catch (error) {
                console.error('Error fetching post data:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchPostData();
    }, [postId]);

    //console.log('user id?:',post.user_id);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={Themes.colors.purpleStrong} />
            </View>
        );
    }

    if (error || !post) {
        return (
            <View style={styles.error}>
                <Text style={{ color: Themes.colors.purpleStrong }}>
                    Error: No se pudo cargar el post. Por favor, intenta nuevamente más tarde.
                </Text>
            </View>
        );
    }

    const posterUrl = post.movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${post.movie.poster_path}`
        : 'https://via.placeholder.com/120x180?text=No+Image';

    const reactionPhotoUrl = post.reaction_photo
        ? post.reaction_photo // Si hay una imagen en reaction_photo, úsala
        : 'https://via.placeholder.com/500x300?text=No+Reaction+Image'; // Placeholder si no hay imagen

    const useridd = post.user_id;

    console.log('id?:', useridd)

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />

            {/* Encabezado */}
            <Header
                title={`${post.username}'s Post`}
                leftIconName="arrow-back"
                leftIconRoute="/search_posts" // Regresa a la pantalla anterior
            />

            <View style={[styles.tabContainer, { backgroundColor: Themes.colors.purpleStrong }]}>
                <TouchableOpacity onPress={() => router.push('/post')}>
                    <Text style={styles.tabActive}>Post</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/post_comments')}>
                    <Text style={[styles.tab, { color: colors.icon }]}>Comments</Text>
                </TouchableOpacity>
            </View>

            {/* Contenido del post */}
            <View style={styles.postContent}>
                <View style={styles.userInfo}>
                    <Pressable onPress={() => router.push({ pathname: '/other_user_information', params: { userId: useridd } })}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person-circle-outline" size={24} color={Themes.colors.purpleStrong} />
                        <Text style={[styles.movieTitle, { color: colors.text, marginLeft: 8 }]}>
                            {post.username}
                        </Text> 
                    </View>
                    </Pressable>
                </View>

                {/* Información de la película y poster */}
                <View style={styles.movieAndPosterContainer}>
                    <View style={styles.movieInfoContainer}>
                        <Text style={[styles.movieTitle, { color: colors.text }]}>{post.movie.title}</Text>
                        <Text style={[styles.movieYear, { color: Themes.colors.purpleDetail }]}>
                            {post.movie.release_date.split('-')[0]}
                        </Text>
                        <RatingFavorite rating={post.rating} showFavorite={false}/>
                        <Text style={[styles.date, { color: Themes.colors.purpleDetail }]}>
                            Watched {new Date(post.watch_date).toDateString()}
                        </Text>
                    </View>
                    <View style={styles.posterContainer}>
                        <Image source={{ uri: posterUrl }} style={styles.posterImage} />
                    </View>
                </View>

                <Text style={[styles.description, { color: colors.text }]}>{post.review}</Text>

                {/* Imagen adjunta (reaction_photo) */}
                <View style={styles.reactionPhotoContainer}>
                    <Image source={{ uri: reactionPhotoUrl }} style={styles.reactionPhoto} />
                </View>

                <View style={styles.actions}>
                    {post.tag && (
                        <ScrollView
                            style={styles.tagsContainer}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.tagsContent}>
                            {post.tag.split(',').map((tag, index) => (
                                <TouchableOpacity key={index} style={styles.tagButton}>
                                    <Text style={styles.tagText}>{tag.trim()}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                     )}  
                </View>
                {/* Botón de Like */}
                <View>
                    <TouchableOpacity style={styles.likeButton}>
                        <FontAwesome name="heart" size={30} color={Themes.colors.purpleDetail} />
                            <Text style={[styles.likeCount, { color: colors.text }]}>{post.likes} Likes</Text>
                    </TouchableOpacity>
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
    reactionPhotoContainer: {
        alignItems: 'center',
    },
    reactionPhoto: {
        width: '90%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    postContent: {
        padding: 16,
    },
    tagsContainer: {
        marginVertical: 16, // Espaciado arriba y abajo
        maxHeight: 40, // Altura limitada para mantener el diseño limpio
    },
    tagsContent: {
        flexDirection: 'row', // Coloca los elementos en fila
        alignItems: 'center', // Centra los tags verticalmente
        gap: 8, // Espaciado entre tags (requiere React Native 0.71 o superior)
        paddingHorizontal: 8, // Añade un padding interno
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
        borderRadius: 16, // Botones con bordes redondeados
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    tagText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
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
