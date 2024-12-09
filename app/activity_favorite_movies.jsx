import { StyleSheet, Text, View, Pressable, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Themes } from '../constants/Themes';
import Header from '../components/Header';
import { useRouter } from 'expo-router';
import { fetchFavoriteMovies, unmarkMovieAsFavorite } from '../helpers/movieverseApi'; 
import { getMovieDetails } from '../helpers/tmdbApi';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { DiscardChangesPopup } from '../components/Popup';

const Activity_favorite_movies = () => {
    const [currentTab, setCurrentTab] = useState('activity_favorite_movies');
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null); // Película seleccionada para eliminar
    const router = useRouter();

    // Función para cambiar de pestaña y navegar a la pantalla correspondiente
    const onTabChange = (tab) => {
        setCurrentTab(tab);
        if (tab === 'activity_liked_posts') {
            router.push('/activity_liked_posts'); // Navega a la pantalla de Liked Posts
        } else if (tab === 'activity_favorite_movies') {
            router.push('/activity_favorite_movies'); // Navega a la pantalla de Favorite Movies
        }
    };

    // Fetch de las películas favoritas
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const favoriteMovieIds = await fetchFavoriteMovies();
                console.log('favoriteMovieIds:', favoriteMovieIds); // Verifica que sea un array plano

                if (!Array.isArray(favoriteMovieIds)) {
                    console.error('Invalid data format:', favoriteMovieIds);
                    setFavoriteMovies([]); // Configura un estado vacío
                    return;
                }

                const movieDetails = await Promise.all(
                    favoriteMovieIds.map(async (movieId) => {
                        const details = await getMovieDetails(movieId);
                        return {
                            id: movieId,
                            title: details.title,
                            director: details.director || 'Unknown Director',
                            year: new Date(details.release_date).getFullYear(),
                            poster: `https://image.tmdb.org/t/p/w500${details.poster_path}`,
                        };
                    })
                );
                setFavoriteMovies(movieDetails);
            } catch (error) {
                console.error('Error fetching favorite movies:', error.message);
                setFavoriteMovies([]); // Maneja errores estableciendo el estado en vacío
            }
        };
        fetchMovies();
    }, []);

    // Función para confirmar y eliminar una película favorita
    const handleDeleteMovie = async () => {
        try {
            if (!selectedMovie) return;

            await unmarkMovieAsFavorite(selectedMovie.id); // Llama al endpoint
            setFavoriteMovies((prevMovies) =>
                prevMovies.filter((movie) => movie.id !== selectedMovie.id)
            ); // Actualiza el estado eliminando la película
            setShowConfirmPopup(false); // Cierra el popup
        } catch (error) {
            console.error('Error deleting favorite movie:', error.message);
        }
    };

    // Mostrar popup de confirmación
    const showDeletePopup = (movie) => {
        setSelectedMovie(movie); // Configura la película seleccionada
        setShowConfirmPopup(true); // Muestra el popup
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Header
                title="Activity"
                leftIconName="arrow-back"
                leftIconRoute="/homePage"
            />
            {/* Container de tabs */}
            <View style={styles.tabContainer}>
                <Pressable
                    onPress={() => onTabChange('activity_liked_posts')}
                    style={[styles.tab, currentTab === 'activity_liked_posts' && styles.tabActive]}
                >
                    <Text style={[styles.tabText, currentTab === 'activity_liked_posts' && styles.activeTabText]}>
                        Liked Posts
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => onTabChange('activity_favorite_movies')}
                    style={[styles.tab, currentTab === 'activity_favorite_movies' && styles.tabActive]}
                >
                    <Text style={[styles.tabText, currentTab === 'activity_favorite_movies' && styles.activeTabText]}>
                        Favorite Movies
                    </Text>
                </Pressable>
            </View>
            {/* ScrollView para mostrar las películas */}
            <ScrollView style={styles.favoriteContainer}>
                {favoriteMovies.map((movie) => (
                    <View key={movie.id} style={styles.movieContainer}>
                        <Image source={{ uri: movie.poster }} style={styles.poster} />
                        <View style={styles.movieDetails}>
                            <Text style={styles.movieTitle}>{movie.title}</Text>
                            <Text style={styles.movieInfo}>{movie.year}</Text>
                        </View>
                        <TouchableOpacity onPress={() => showDeletePopup(movie)}>
                            <Ionicons name="star" size={32} color={Themes.colors.purpleStrong} style={styles.starIcon} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            {/* Popup de confirmación */}
            <DiscardChangesPopup
                visible={showConfirmPopup}
                onCancel={() => setShowConfirmPopup(false)} // Cierra el popup al cancelar
                onDiscard={handleDeleteMovie} // Llama a la función para eliminar
                title="Remove Favorite Movie"
                text={`Are you sure you want to remove "${selectedMovie?.title}" from your favorites?`}
                purpleButton="Remove"
            />
        </View>
    );
};


export default Activity_favorite_movies;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.colors.screensColor,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: Themes.colors.purpleStrong,
        justifyContent: 'space-around',
    },
    tab: {
        paddingVertical: 12,
    },
    tabActive: {
        borderBottomColor: Themes.colors.purpleLight,
        borderBottomWidth: 2,
    },
    tabText: {
        fontSize: 18,
        color: 'white',
        fontWeight: Themes.fonts.medium,
    },
    favoriteContainer: {
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    movieContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    poster: {
        width: 68,
        height: 98,
        borderRadius: 4,
        marginRight: 10,
    },
    movieDetails: {
        flex: 1,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    movieInfo: {
        fontSize: 16,
        color: 'white',
    },
    starIcon: {
        marginLeft: 10,
    },
});
