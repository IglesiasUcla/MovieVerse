import createApiInstance from "./api";
import * as SecureStore from "expo-secure-store";

// URL base de tu backend
const BASE_URL = "http://192.168.1.102:3000"; // Cambia según la URL de tu backend

// Instancia de la API de MovieVerse
const movieverseApi = createApiInstance(BASE_URL);

// Función para guardar el token en SecureStore
const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync("token", token);
    console.log("Token saved successfully");
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

// Función para obtener el token desde SecureStore
const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
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
    const response = await movieverseApi.post("/register", userData);
    if (response.data.token) {
      await saveToken(response.data.token);
    }
    // Guardar el user_id en SecureStore
    if (response.data.user_id) {
      await SecureStore.setItemAsync("user_id", response.data.user_id.toString());
      console.log("User ID saved successfully:", response.data.user_id);
    }
    return response.data;
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


// Endpoint para loguear un usuario
export const loginUser = async (credentials) => {
  try {
    const response = await movieverseApi.post("/login", credentials);
    if (response.data.token) {
      await saveToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Buscador de Usuarios
export async function searchUser(userTag) {
  try {
    const response = await movieverseApi.get(`/search?query=${userTag}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Post por id
export async function GetPostById(postId) {
  try {
    const response = await movieverseApi.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Delete Post
export async function DeletePost(postId) {
  try {
    const response = await movieverseApi.delete(`/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

//Edit Post
export async function EditPostId(postId, formData) {
  try {
    const response = await movieverseApi.put(`/posts/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// My Post
export async function MyUserPost() {
  try {
    const response = await movieverseApi.get("/users/me/posts");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Endpoint para crear un post
export const createPost = async (formData) => {
  try {
    const response = await movieverseApi.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Puedes agregar otros encabezados de autenticación si es necesario
      },
    });
    return response.data; // Retorna los datos del post creado
  } catch (error) {
    console.error(
      "Error creating post:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

// Endpoint para obtener los posts recientes
export const fetchRecentPosts = async (page = 1, limit = 20) => {
  try {
    const response = await movieverseApi.get("/posts/recent", {
      params: { page, limit },
    });
    return response.data; // Retorna los datos de los posts recientes
  } catch (error) {
    console.error(
      "Error fetching recent posts:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

//Endpoint para ver un post individualmente
export async function fetchPostData(postId) {
  try {
    const response = await movieverseApi.get(`/posts/${postId}`);
    return response.data.post;
  } catch (error) {
    console.error("Error fetching post data:", error);
    throw error;
  }
}

// Endpoint para buscar posts por tag
export const searchPostsByTag = async (tag, page = 1, limit = 20) => {
  try {
    // Verificar que el tag no esté vacío
    if (!tag || typeof tag !== "string") {
      throw new Error(
        'El parámetro "tag" es obligatorio y debe ser una cadena de texto.'
      );
    }

    // Realizar la solicitud al endpoint
    const response = await movieverseApi.get("/posts/search", {
      params: { tag, page, limit }, // Pasar los parámetros al backend
    });

    return response.data; // Retorna los posts encontrados
  } catch (error) {
    console.error(
      "Error buscando posts por tag:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

// Endpoint para marcar una película como favorita
export const markMovieAsFavorite = async (movieId) => {
  try {
    const response = await movieverseApi.post("/users/me/favorites", {
      movie_id: movieId,
    });
    return response.data; // Retorna la respuesta del servidor
  } catch (error) {
    console.error(
      "Error marking movie as favorite:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

// Endpoint para desmarcar una película como favorita
export const unmarkMovieAsFavorite = async (movieId) => {
  try {
    const response = await movieverseApi.delete(
      `/users/me/favorites/${movieId}`,
      {
        movie_id: movieId,
      }
    );
    return response.data; // Retorna la respuesta del servidor
  } catch (error) {
    console.error(
      "Error marking movie as favorite:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

// Endpoint para obtener las películas favoritas
export const fetchFavoriteMovies = async (page = 1, limit = 20) => {
  try {
    const response = await movieverseApi.get("/users/me/favorite-movies", {
      params: { page, limit }, // Pasar parámetros de paginación
    });
    console.log("Fetched favorite movies:", response.data);
    return response.data.data || []; // Retorna los datos paginados
  } catch (error) {
    console.error(
      "Error fetching favorite movies:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

export const getUser = async () => {
  try {
    const response = await movieverseApi.get("/users/me");
    return response.data; // Retornar la respuesta del backend
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || error.message
    );
    throw error; // Propagar el error para manejarlo en la interfaz
  }
};

export const updateUser = async (formData) => {
  try {
    const response = await movieverseApi.put("/users/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Retornar la respuesta del backend
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || error.message
    );
    throw error; // Propagar el error para manejarlo en la interfaz
  }
};

export const createTopMovies = async (topMovies) => {
  try {
    const response = await movieverseApi.post("/topMovies", {
      topMovies,
    });
    return response.data; // Retorna la respuesta del servidor
  } catch (error) {
    console.error(
      "Error creating top movies:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

export const getTopMovies = async () => {
  try {
    const response = await movieverseApi.get("/topMovies");
    return response.data; // Retornar la respuesta del backend
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || error.message
    );
    throw error; // Propagar el error para manejarlo en la interfaz
  }
};

export const updateTopMovie = async (rank, movieId) => {
  try {
    const response = await movieverseApi.put("/topMovies", {
      rank,
      movieId,
    });
    return response.data; // Retorna la respuesta del servidor
  } catch (error) {
    console.error(
      "Error updating top movie:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

export async function fetchOtherUser(userId) {
  try {
    const response = await movieverseApi.get(`/users/${userId}`);
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export async function fetchOtherTopMovies(userId) {
  try {
    const response = await movieverseApi.get(`/users/${userId}/top-movies`);
    return response.data.topMovies;
  } catch (error) {
    console.error("Error fetching user's top movies:", error);
    throw error;
  }
}

export const addLikeToPost = async (postId) => {
  try {
    const response = await movieverseApi.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error adding like:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const removeLikeFromPost = async (postId) => {
  try {
    const response = await movieverseApi.delete(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error(
      "Error removing like:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

export const getPostLikes = async (postId) => {
  try {
    console.log("Fetching likes for postId:", postId);
    const response = await movieverseApi.get(`/posts/${postId}/like`);
    console.log("Likes API response:", response.data); // Cambiar aquí a response.data
    return response.data; // Retorna todo el objeto de datos
  } catch (error) {
    console.error(
      "Error fetching likes:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

// Request para obtener los posts relacionados con una película específica
export const getPostsByMovieId = async (movieId) => {
  try {
    console.log("Fetching info for movieId:", movieId);
    const response = await movieverseApi.get(`/movies/${movieId}/posts`);
    console.log("Info API response:", response.data); // Cambiar aquí a response.data
    return response.data.posts;
  } catch (error) {
    console.error("Error fetching posts by movie ID:", error);
    throw error;
  }
};

export default movieverseApi;
