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


export default tmdbApi;
