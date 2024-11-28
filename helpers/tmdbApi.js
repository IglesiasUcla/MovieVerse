import createApiInstance from './api';
import { TMDB_API_KEY } from '@env';

const BASE_URL = 'https://api.themoviedb.org/3';

// Instancia de la API de TMDB
const tmdbApi = createApiInstance(BASE_URL, { api_key: TMDB_API_KEY });

// Funciones para realizar peticiones específicas
export const getPopularMovies = async () => {
  const response = await tmdbApi.get('/trending/movie/week', {
    params: { language: 'en-US' },
  });
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await tmdbApi.get('/search/movie', {
    params: { query },
  });
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  try {
    console.log('Requesting movie details for ID (tmdbApi):', movieId); // Imprime el valor real
    const response = await tmdbApi.get(`/movie/${movieId}`);
    console.log('Movie details response (tmdbApi):', response.data); // Muestra la respuesta
    return response.data; // Aquí retornamos los datos correctos
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error; // Asegúrate de propagar el error si ocurre
  }
};

export const getMovieDirector = async (movieId) => {
  try {
    console.log('Requesting movie credits for ID (tmdbApi):', movieId);
    const response = await tmdbApi.get(`/movie/${movieId}/credits`);
    console.log('Movie credits response (tmdbApi):', response.data);

    // Filtrar para obtener solo el director
    const director = response.data.crew.find(
      (person) => person.job === 'Director'
    );

    if (director) {
      return director.name; // Retornar solo el nombre del director
    } else {
      console.warn('Director not found for movie ID:', movieId);
      return 'Director not available';
    }
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error; // Propagar el error
  }
};

export const getTopRatedMovies = async (page = 1) => {
  try {
    console.log(`Fetching top-rated movies for page ${page}...`);
    const response = await tmdbApi.get('/movie/top_rated', {
      params: {
        language: 'en-US',
        page, // Solicita una página específica
      },
    });

    // Limita el número de resultados a 18
    const topRatedMovies = response.data.results.slice(0, 18);
    return topRatedMovies;
  } catch (error) {
    console.error('Error fetching top-rated movies:', error);
    throw error;
  }
};

export const getMostPopularMovies = async (page = 1) => {
  try {
    console.log(`Fetching most-popular movies for page ${page}...`);
    const response = await tmdbApi.get('/trending/movie/week', {
      params: {
        language: 'en-US',
        page, // Solicita una página específica
      },
    });

    // Limita el número de resultados a 18
    const mostPopularMovies = response.data.results.slice(0, 18);
    return mostPopularMovies;
  } catch (error) {
    console.error('Error fetching most-popular movies:', error);
    throw error;
  }
};

export const getMovieGenres = async () => {
  try {
    const response = await tmdbApi.get('/genre/movie/list', {
      params: { language: 'en-US' },
    });
    return response.data.genres; // Retorna un array con los géneros
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    console.log('Requesting movie genre (tmdbApi):', genreId); // Imprime el valor real
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: genreId, // ID del género
        page, // Página para paginación
        language: 'en-US', // Idioma de los resultados
      },
    });
    console.log('Movie genre response (tmdbApi):', response.data); // Muestra la respuesta
    
    // Limita el número de resultados a 18
    const genreMovies = response.data.results.slice(0, 18);
    return genreMovies; // Retorna solo las primeras 18 películas
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error; // Propaga el error
  }
};

export const getMoviesByYear = async (year, page = 1) => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        primary_release_year: year,
        page,
      },
    });

    // Limita el número de resultados a 18
    const movieYear = response.data.results.slice(0, 18);
    return movieYear; // Retorna solo las primeras 18 películas
  } catch (error) {
    console.error('Error fetching movies by year:', error);
    throw error;
  }
};


export default tmdbApi;
