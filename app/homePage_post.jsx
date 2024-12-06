import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, StatusBar, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Themes } from '../constants/Themes';
import TopBar from '../components/TopBar';
import { fetchRecentPosts } from '../helpers/movieverseApi';
import { getMovieDetails } from '../helpers/tmdbApi';
import RatingFavorite from '../components/RatingFavorite';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
                        source={{ uri: item.user_avatar }}
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                    <Text style={styles.username}>{item.username}</Text>
                </View>
                <Text style={styles.movieTitle}>{item.movie_title}</Text>
                
            <RatingFavorite 
                style={styles.starsContainer}
                rating={typeof item.rating === 'number' && item.rating >= 0 ? item.rating : 0}
                showFavorite={false}
                starSize={16}    // Ajusta el tamaño si es necesario
            />
           {item.favorite && (
                <Icon
                    name="star"
                    size={16}
                    color="#b39ddb"
                    style={styles.favoriteIcon}
                />
            )}
            <Pressable onPress={() => router.push({ pathname: '/post', params: { postId: item.post_id } })}>
                <Text style={styles.review}>{item.review}</Text>
            </Pressable>
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
                <FlatList
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
        paddingHorizontal: 16,
    },
    postContainer: {
        flexDirection: 'row',
        borderRadius: 8,
        marginVertical: 8,
        padding: 10,
        alignItems: 'flex-start',
    },
    poster: {
        width: 80,
        height: 120,
        borderRadius: 8,
        marginRight: 10,
    },
    postContent: {
        flex: 1,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
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
    },
    emptyText: {
        textAlign: 'center',
        color: 'white',
        marginTop: 20,
        fontSize: 18,
    },
});
