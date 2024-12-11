import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Pressable, StatusBar, Image, BackHandler } from 'react-native';
import { Themes } from '../constants/Themes';
import { widthPercentage, heightPercentage } from '../helpers/commons';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import TopBar from '../components/TopBar';
import { getPopularMovies } from '../helpers/tmdbApi';
import { DiscardChangesPopup } from '../components/Popup';
import { createTopMovies } from '../helpers/movieverseApi';


const HomePage = () => {
    const route = useRouter();
    const [movies, setMovies] = useState([]); // Inicializamos con un arreglo vacío
    const [loading, setLoading] = useState(true); // Estado para manejar el loading
    const [showDiscardPopup, setShowDiscardPopup] = useState(false);
    const navigation = useNavigation();
    const [topMoviesCreated, setTopMoviesCreated] = useState(false);

    useEffect(() => {
        // Interceptar el botón de retroceso
        const backAction = () => {
          setShowDiscardPopup(true); // Muestra el popup
          return true; // Bloquea el retroceso mientras el popup está visible
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
        // Limpieza del evento al desmontar el componente
        return () => backHandler.remove();
      }, []);

      useEffect(() => {
        const createInitialTopMovies = async () => {
            if (!topMoviesCreated) {
                try {
                    const topMovies = ["placeholder1", "placeholder2", "placeholder3"];
                    const response = await createTopMovies(topMovies);
                    if (response.message === "Top movies created successfully.") {
                        setTopMoviesCreated(true); // Evita que vuelva a ejecutarse
                    }
                } catch (error) {
                    console.error("Error creating top movies:", error);
                }
            }
        };
    
        createInitialTopMovies();
      }, [topMoviesCreated]);
    
      const handleDiscard = () => {
        setShowDiscardPopup(false);
        router.back(); // Permite el retroceso manualmente
      };
    
      const handleCancel = () => {
        setShowDiscardPopup(false); // Cierra el popup sin retroceder
      };

  // Llamar a la API al montar el componente
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const fetchedMovies = await getPopularMovies();
        setMovies(fetchedMovies); // Actualizamos el estado con los datos reales
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false); // Desactivamos el loading
      }
    };

    fetchMovies();
  }, []);

  // Renderizar cada película en el carrusel
  const renderMoviePoster = ({ item }) => (
    <Pressable
      onPress={() => route.push(`/movie/${item.id}`)} // Aquí puedes pasar `item.id` si la ruta necesita el ID de la película
      style={styles.moviePosterContainer}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} // URL para los carteles de TMDB
        style={styles.moviePoster}
        resizeMode="cover"
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Themes.colors.purpleStrong}
      />
      <TopBar
        title="Popular"
        currentTab="movies"
        onTabChange={() => route.push("homePage_post")}
        onMenuPress={() => console.log("Menu pressed")}
        onSearchPress={() => route.push("search")}
      />

      <Pressable
        onPress={() => route.push("searchMovies_mostPopular")}
        style={styles.titleContainer}
      >
        <Text style={styles.titleText}>Popular Movies</Text>
      </Pressable>

      {/* Mostrar un mensaje de carga mientras se obtienen las películas */}
      {loading ? (
        <Text style={styles.loadingText}>Loading movies...</Text>
      ) : (
        // Carrusel de Películas usando FlatList
        <FlatList
          style={styles.flatlist}
          horizontal
          data={movies}
          renderItem={renderMoviePoster}
          keyExtractor={(item) => item.id.toString()} // Aseguramos que el key sea un string
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
        />
      )}

      {/* Botón flotante */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => route.push("addMovie")}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      <DiscardChangesPopup
        visible={showDiscardPopup}
        onCancel={() => setShowDiscardPopup(false)} // Cierra el popup al cancelar
        onDiscard={() => {navigation.reset({
            index: 0,
            routes: [{ name: 'welcome' }], // your stack screen name
        })}}
        title={'Log Out'}
        text={'Are you sure you want to Log Out?'}
        purpleButton={'Log Out'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.grayDark,
  },
  titleText: {
    color: "white",
    fontSize: heightPercentage(3),
    fontWeight: Themes.fonts.medium,
  },
  titleContainer: {
    alignSelf: "flex-start",
    top: heightPercentage(18),
    left: widthPercentage(5),
  },
  flatlist: {
    top: heightPercentage(18.5),
    flexGrow: 0,
  },
  carouselContent: {
    alignSelf: "flex-start",
    paddingLeft: 16,
    paddingRight: 16,
  },
  moviePosterContainer: {
    marginRight: 8,
  },
  moviePoster: {
    width: widthPercentage(40),
    height: heightPercentage(30),
    borderRadius: 10,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: Themes.colors.purpleStrong,
    borderRadius: 50,
    padding: 16,
  },
  loadingText: {
    color: "white",
    fontSize: heightPercentage(2),
    textAlign: "center",
    marginTop: heightPercentage(20),
  },
});

export default HomePage;
