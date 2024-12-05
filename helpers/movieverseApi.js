import createApiInstance from './api';
import * as SecureStore from 'expo-secure-store';

// URL base de tu backend
const BASE_URL = 'http://192.168.68.106:3000'; // Cambia según la URL de tu backend

// Instancia de la API de MovieVerse
const movieverseApi = createApiInstance(BASE_URL);

// Función para guardar el token en SecureStore
const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync('token', token);
    console.log('Token saved successfully');
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

// Función para obtener el token desde SecureStore
const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// Interceptor para añadir el token JWT en los headers de las solicitudes
movieverseApi.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Endpoint para registrar un usuario
export const registerUser = async (userData) => {
  try {
    const response = await movieverseApi.post('/register', userData);
    if (response.data.token) {
      await saveToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Register error:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Endpoint para loguear un usuario
export const loginUser = async (credentials) => {
  try {
    const response = await movieverseApi.post('/login', credentials);
    if (response.data.token) {
      await saveToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Endpoint para crear un post
export const createPost = async (formData) => {
  try {
    const response = await movieverseApi.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // Puedes agregar otros encabezados de autenticación si es necesario
      },
    });
    return response.data; // Retorna los datos del post creado
  } catch (error) {
    console.error('Error creating post:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


export default movieverseApi;