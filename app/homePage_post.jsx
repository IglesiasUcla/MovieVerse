import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, StatusBar, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Themes } from '../constants/Themes';
import TopBar from '../components/TopBar';
import { fetchRecentPosts } from '../helpers/movieverseApi';
import { getMovieDetails } from '../helpers/tmdbApi';
import RatingFavorite from '../components/RatingFavorite';
const HomePagePost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const router = useRouter();
    const loadPosts = async () => {
        if (loading || !hasMore) return; // Evitar llamadas múltiples o cuando no hay más datos
        setLoading(true);
        try {
            const { posts: newPosts } = await fetchRecentPosts(page);
            const postsWithMovieDetails = await Promise.all(
                newPosts.map(async (post) => {
                    if (!post.movie_id) {
                        console.warn(`Post ${post.post_id} tiene un movie_id nulo o inválido.`);
                        return { ...post, movie_title: 'Unknown', movie_poster: null };
                    }
                    const movieDetails = await getMovieDetails(post.movie_id);
                    return {
                        ...post,
                        movie_title: movieDetails.title,
                        movie_poster: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
                    };
                })
            );
            // Evitar duplicados con Set y mantener el orden
            setPosts((prevPosts) => {
                const uniquePosts = new Map();
                [...prevPosts, ...postsWithMovieDetails].forEach((post) =>
                    uniquePosts.set(post.post_id, post)
                );
                return Array.from(uniquePosts.values());
            });
            setHasMore(newPosts.length > 0); // Si no hay más posts, detener carga
            setPage((prevPage) => prevPage + 1); // Incrementar la página
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            setLoading(false);
        }
    };

    console.log('details:', posts)

    useEffect(() => {
        loadPosts();
    }, []);
    const renderItem = ({ item }) => (
        <View style={styles.postContainer}>
            <Image
                source={{ uri: item.movie_poster }}
                style={styles.poster}
                resizeMode="cover"
            />
            <View style={styles.postContent}>
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: item.profile_picture }}
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                    <Pressable onPress={() => router.push({ pathname: '/other_user_information', params: { userId: item.user_id } })}>
                        <Text style={styles.username}>{item.username}</Text>
                    </Pressable>
                </View>
                <Text style={styles.movieTitle}>{item.movie_title}</Text>
                
            <RatingFavorite 
                style={styles.starsContainer}
                rating={typeof item.rating === 'number' && item.rating >= 0 ? item.rating : 0}
                showFavorite={false}
                starSize={16}    // Ajusta el tamaño si es necesario
            />
            <TouchableOpacity onPress={() => router.push({ pathname: '/post', params: { postId: item.post_id } })}>
                <Text style={styles.review}>{item.review}</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
            <TopBar
                title="Recent Posts"
                currentTab="posts"
                onTabChange={() => router.push('homePage')}
                onMenuPress={() => console.log('Menu pressed')}
                onSearchPress={() => router.push('search')}
            />
            <View style={styles.body}>
                <FlatList style= {styles.listStyle}
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.post_id?.toString() || Math.random().toString()}
                    onEndReached={loadPosts}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loading && (
                        <ActivityIndicator size="large" color={Themes.colors.purpleStrong} />
                    )}
                    ListEmptyComponent={!loading && (
                        <Text style={styles.emptyText}>No posts available.</Text>
                    )}
                />
            </View>
        </View>
    );
};
export default HomePagePost;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.colors.screensColor,
    },
    body: {
        flex: 1,
        paddingHorizontal: 10,
        alignContent: 'flex-start',
    },
    postContainer: {
        flexDirection: 'row',
        borderRadius: 8,
        marginVertical: 10,
        padding: 10,
        alignItems: 'flex-start',
        height:'auto',
    },
    poster: {
        width: 120,
        height: 180,
        borderRadius: 8,
        marginRight: 10,
    },
    postContent: {
        flex: 1,
        height:'auto',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 2,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
        borderWidth: 1,
        borderColor: Themes.colors.purpleStrong,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    rating: {
        fontSize: 14,
        color: Themes.colors.textSecondary,
        marginBottom: 6,
    },
    review: {
        fontSize: 14,
        color: 'white',
        overflow: 'visible',
        height:50,
    },
    emptyText: {
        textAlign: 'center',
        color: 'white',
        marginTop: 20,
        fontSize: 18,
    },
    listStyle: {
        // flexDirection: 'column',
    }
});